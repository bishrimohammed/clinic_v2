import { Transaction } from "sequelize";
import MedicalRecord from "../models/MedicalRecord";
import {
  addMedicalRecordSymptomsType,
  addVitalSignType,
  addVPhysicalExaminationType,
} from "../types/medical-record";
import { loggedInUserId } from "../types/shared";
import { ApiError } from "../shared/error/ApiError";
import {
  LabTestProfile,
  MedicalRecordDetail,
  PatientVisit,
  PhysicalExamination,
  PhysicalExaminationField,
  PhysicalExaminationResult,
  ServiceItem,
  User,
  VitalSign,
  VitalSignField,
  VitalSignResult,
} from "../models";
import sequelize from "../db";
import { checkPatientMedicalRecordAssignedDoctorToVisit } from "./visit.service";
import { hasDuplicate } from "../utils/helpers";

/**
 * Get patient active medical record
 * @param patientId - patient id
 * @returns {MedicalRecord | null}
 */
export const parientActiveMedicalRecord = async (
  patientId: number
): Promise<MedicalRecord | null> => {
  const record = await MedicalRecord.findOne({
    where: {
      patientId,
      status: true,
    },
  });
  return record;
};
/**
 * Get patient last medical record
 * @param patientId - patient id
 * @returns {Promise<MedicalRecord| null>}
 */
export const getPatientLastMedicalRecord = async (
  patientId: number
): Promise<MedicalRecord | null> => {
  const record = await MedicalRecord.findOne({
    where: {
      patientId,
    },
    order: [["createdAt", "DESC"]],
  });
  return record;
};
/**
 * Get medical record by id
 * @param medicalRecordId - medical record id
 * @returns
 */
export const getMedicalRecordById = async (medicalRecordId: string) => {
  const medicalRecord = await MedicalRecord.findByPk(medicalRecordId);
  if (!medicalRecord) {
    throw new ApiError(404, "medical record not found");
  }
  return medicalRecord;
};
/**
 * Create medical record
 * @param patientId - patient id
 * @param transaction -
 * @returns {Promise<MedicalRecord>}
 */
export const createMedicalRecord = async (
  patientId: number,
  transaction?: Transaction
): Promise<MedicalRecord> => {
  const record = await MedicalRecord.create(
    {
      patientId,
    },
    { transaction }
  );
  return record;
};

//#region Medical Record Symptoms
/**
 * Get  medical record detail by id
 * @param id - medical record detail id
 * @returns {Promise<MedicalRecordDetail>}
 */
export const getMedicalRecordDetailById = async (
  id: string
): Promise<MedicalRecordDetail> => {
  const medicalRecordDetail = await MedicalRecordDetail.findByPk(id);
  if (!medicalRecordDetail) {
    throw new ApiError(404, "Medical Record Detail not found");
  }
  return medicalRecordDetail;
};

/**
 * Add medical record symptoms
 * @param medicalRecordId -
 * @param data - Medical record symptoms data
 * @param userId - logged in doctor id
 */
export const addMedicalRecordSymptoms = async (
  medicalRecordId: string,
  data: addMedicalRecordSymptomsType,
  userId: loggedInUserId
) => {
  const { HPI, chiefComplaint } = data;
  const visit = await checkPatientMedicalRecordAssignedDoctorToVisit(
    medicalRecordId,
    userId
  );
  if (!visit) {
    throw new ApiError(400, "This medical record is not assigned to you");
  }

  const existingmedicalRecordDetail = await MedicalRecordDetail.findOne({
    where: {
      medicalRecordId,
      doctorId: userId,
    },
  });

  const stringifiedChiefComplaint = JSON.stringify(chiefComplaint);
  // if exist update it
  if (existingmedicalRecordDetail) {
    await existingmedicalRecordDetail.update({
      chiefComplaint:
        stringifiedChiefComplaint || existingmedicalRecordDetail.chiefComplaint,
      HPI: HPI || existingmedicalRecordDetail.HPI,
    });
    return existingmedicalRecordDetail;
  }

  const medicalRecordDetail = await MedicalRecordDetail.create({
    medicalRecordId,
    doctorId: userId,
    chiefComplaint: stringifiedChiefComplaint,
    HPI,
  });
  return medicalRecordDetail;
};
/**
 *
 * @param medicalRecordDetailId - medical record detail id
 * @param data - Medical record detail symptoms data
 * @param userId -  logged in doctor id
 * @returns {Promise<MedicalRecordDetail>}
 */
export const updateMedicalRecordSymptoms = async (
  medicalRecordDetailId: string,
  data: addMedicalRecordSymptomsType,
  userId: loggedInUserId
): Promise<MedicalRecordDetail> => {
  const { HPI, chiefComplaint } = data;

  const medicalRecordDetail = await getMedicalRecordDetailById(
    medicalRecordDetailId
  );
  if (userId !== medicalRecordDetail.doctorId) {
    throw new ApiError(
      400,
      "This medical record detail is created by another doctor"
    );
  }
  const stringifiedChiefComplaint = JSON.stringify(chiefComplaint);

  await medicalRecordDetail.update({
    chiefComplaint:
      stringifiedChiefComplaint || medicalRecordDetail.chiefComplaint,
    HPI: HPI || medicalRecordDetail.HPI,
  });
  return medicalRecordDetail;
};
/**
 *
 * @param medicalRecordId - medical record id
 * @param data - Medical record detail plan data
 * @param userId - logged in doctor id
 * @param transaction - transaction
 * @returns {Promise<MedicalRecordDetail>}
 */
export const addPlanAndAssessment = async (
  medicalRecordId: string,
  data: { plan: string; assessment: string },
  userId: loggedInUserId,
  transaction?: Transaction
): Promise<MedicalRecordDetail> => {
  const {
    // diagnosis,
    // treatmentPlan,
    // followUpPlan,
    // medication,
    // allergies,
    // immunizations,
    // labTests,
    // radiologyTests,
    // imagingTests,
    // procedures,
    // notes,
    // status,
    assessment,
    plan,
  } = data;
  // const visit = await checkPatientMedicalRecordAssignedDoctorToVisit(
  //   medicalRecordId,
  //   userId
  // );
  // if (!visit) {
  //   throw new ApiError(400, "This medical record is not assigned to you");
  // }
  const medicalRecordDetail = await MedicalRecordDetail.findOne({
    where: {
      medicalRecordId,
      doctorId: userId,
    },
  });
  if (!medicalRecordDetail) {
    throw new ApiError(404, "Medical Record Detail not found");
  }
  await medicalRecordDetail.update(
    {
      assessment,
      plan,
    },
    { transaction }
  );
  return medicalRecordDetail;
};
//#endregion

//#region Vital Signs
/**
 * Get vital signs by medical record id
 * @param medicalRecordId - medical record id
 * @returns {Promise<VitalSign[]>}
 */
export const getVitalSigns = async (
  medicalRecordId: string
): Promise<VitalSign[]> => {
  // const medicalRecord = await getMedicalRecordById(medicalRecordId);
  // const visit = await PatientVisit.findOne({
  //   where: {
  //     medicalRecordId: medicalRecordId,
  //     doctorId: userId,
  //   },
  // });
  // if (!visit) {
  //   throw new ApiError(400, "This medical record is not assigned to you");
  // }
  const vitalSigns = await VitalSign.findAll({
    where: {
      medicalRecordId,
    },
    include: [
      {
        model: VitalSignResult,
        as: "vitalResults",
        include: [
          {
            model: VitalSignField,
            as: "vitalSignField",
            attributes: ["id", "name"],
          },
        ],
      },
    ],
  });
  return vitalSigns;
};
/**
 * Add vital signs
 * @param medicalRecordId - medical record id
 * @param vitalSigns - vital signs
 * @param userId - logged in user id
 * @param transaction - transaction
 * @returns
 */
export const addVitalSigns = async (
  medicalRecordId: string,
  vitalSigns: addVitalSignType,
  userId: loggedInUserId,
  transaction?: Transaction
) => {
  // const medicalRecord = await getMedicalRecordById(medicalRecordId);
  // const visit = await PatientVisit.findOne({
  //   where:{medicalRecordId:medicalRecordId, doctorId:userId}
  // })
  // const transaction = await sequelize.transaction();
  // try {
  const vitalSignFieldIds = vitalSigns.map(
    (vitalSign) => vitalSign.vitalSignFieldId
  );
  const hasDuplicateVitalSignFieldId = hasDuplicate(vitalSignFieldIds);
  if (hasDuplicateVitalSignFieldId) {
    throw new ApiError(400, "Duplicate vital sign field id");
  }
  const createdVitalSigns = await VitalSign.create(
    {
      medicalRecordId,
      examinerId: userId,
    },
    { transaction }
  );

  const transformVitalSigns = vitalSigns.map((vitalSign) => ({
    result: vitalSign.value || "n",
    vitalSignFieldId: vitalSign.vitalSignFieldId,
    vitalId: createdVitalSigns.id,
  }));
  await VitalSignResult.bulkCreate(transformVitalSigns, { transaction });
  await createdVitalSigns.getVitalResults();
  // await transaction.commit();
  return createdVitalSigns;
  // } catch (error) {
  //   await transaction.rollback();
  //   throw error;
  // }
};

//#endregion

//#region Physical Examination
/**
 * Get physical examinations by medical record id
 * @param medicalRecordId - medical record id
 * @returns {Promise<PhysicalExamination[]>}
 */
export const getPhysicalExaminations = async (
  medicalRecordId: string
): Promise<PhysicalExamination[]> => {
  const physicalExaminations = await PhysicalExamination.findAll({
    where: {
      medicalRecordId,
    },
    include: [
      {
        model: PhysicalExaminationResult,
        as: "examinationResults",
        include: [
          {
            model: PhysicalExaminationField,
            as: "examinationField",
            attributes: ["id", "name"],
          },
        ],
      },
      {
        model: User,
        as: "examiner",
        attributes: ["id", "name"],
      },
    ],
  });
  return physicalExaminations;
};

export const addPhysicalExaminations = async (
  medicalRecordId: string,
  physicalExaminations: addVPhysicalExaminationType,
  userId: loggedInUserId,
  transaction?: Transaction
) => {
  //
  const physicalExaminationFieldIds = physicalExaminations.map(
    (examination) => examination.examinationFieldId
  );
  const hasDuplicatePhysicalExaminationFieldId = hasDuplicate(
    physicalExaminationFieldIds
  );
  if (hasDuplicatePhysicalExaminationFieldId) {
    throw new ApiError(400, "Duplicate physical examination field id");
  }

  const createdPhysicalExamination = await PhysicalExamination.create(
    {
      medicalRecordId,
      examinerId: userId,
    },
    { transaction }
  );

  const transformedPhysicalExaminations = physicalExaminations.map(
    (examination) => ({
      physicalExaminationId: createdPhysicalExamination.id,
      result: examination.result || "bh",
      examinationFieldId: examination.examinationFieldId,
    })
  );
  const examinationResults = await PhysicalExaminationResult.bulkCreate(
    transformedPhysicalExaminations,
    { transaction }
  );
  return examinationResults;
};

//#endregion
//#region  Lab Investigation
export const submitLabInvestigation = async (
  tests: string[],
  userId: loggedInUserId,
  transaction?: Transaction
) => {
  // const serviceItems = await ServiceItem.findAll({
  //   where: {
  //     id: tests,
  //   },
  //   include: [
  //     {
  //       model: LabTestProfile,
  //       as: "labTestProfile",
  //     },
  //   ],
  // });
  // const hasItemsNotLabtest = serviceItems.some((item) => !item?.labTestProfile);
  // if (hasItemsNotLabtest) {
  //   throw new ApiError(400, "");
  // }
};

//#endregion
// export const createMedicalRecord = async (
//   data: createMedicalRecordType,
//   userId: number
// ) => {
//   const {
//     patientId,
//     chiefComplaint,
//     historyOfPresentIllness,
//     pastMedicalHistory,
//     familyHistory,
//     socialHistory,
//     physicalExamination,
//     diagnosis,
//     treatmentPlan,
//     followUpPlan,
//     medication,
//     allergies,
//     immunizations,
//     labTests,
//     radiologyTests,
//     imagingTests,
//     procedures,
//     notes,
//     status,
//   } = data;
// }
