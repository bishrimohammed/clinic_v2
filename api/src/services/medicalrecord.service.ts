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
  InvestigationOrder,
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
import OrderedTest from "../models/medicalRecords/orderedTest";
import { boolean } from "zod";
import { addBulkBillingItemsToMedicalBilling } from "./billing.service";

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
/**
 * Submit lab investigation
 * @param tests - tests
 * @param orderableId - orderable id
 * @param orderableType -  orderable type
 * @param userId
 * @param transaction
 */
export const submitLabInvestigation = async (
  testIds: number[],
  orderableId: string,
  orderableType: "MedicalRecord" | "ExternalService" = "MedicalRecord",
  userId: loggedInUserId,
  transaction?: Transaction
) => {
  // Validate input for duplicates
  if (new Set(testIds).size !== testIds.length) {
    throw new ApiError(400, "Duplicate test IDs in request");
  }

  // Fetch all tests with required lab profiles in single query
  const allTests = await ServiceItem.findAll({
    where: { id: testIds },
    include: [
      {
        model: LabTestProfile,
        as: "labTestProfile",
        required: true, // Ensures only tests with lab profiles are returned
      },
      {
        model: ServiceItem,
        as: "underPanels",
        attributes: ["id", "service_name", "price"],
      },
    ],
    transaction,
  });

  // Verify all requested tests were found
  const foundIds = new Set(allTests.map((t) => t.id));
  const missingIds = testIds.filter((id) => !foundIds.has(id));
  if (missingIds.length) {
    throw new ApiError(
      400,
      `Invalid or missing tests: ${missingIds.join(", ")}`
    );
  }

  // Categorize tests into panels and individual tests
  const panelTests = allTests.filter((t) => t.labTestProfile?.isPanel);
  const individualTests = allTests.filter((t) => !t.labTestProfile?.isPanel);

  // Create investigation order record
  const createdLabInvestigation = await InvestigationOrder.create(
    {
      orderableId,
      orderableType,
      isInternalService: orderableType === "MedicalRecord",
      orderTime: new Date(),
      orderedBy: userId,
    },
    { transaction }
  );

  // Prepare billing items and test entries
  const paymentItems: Array<{ serviceItemId: number; price: number }> = [];
  const testCreationPromises: Promise<void>[] = [];

  // Process panel tests and their sub-tests
  if (panelTests.length) {
    const underPanelIds = panelTests
      .flatMap((p) => p.underPanels || [])
      .map((up) => up.id)
      .filter((id): id is number => !!id);

    testCreationPromises.push(
      createOrderedTests(
        underPanelIds,
        createdLabInvestigation.id,
        true, // Mark as underpanel
        transaction
      ).then(() => {
        panelTests.forEach((panel) => {
          paymentItems.push({
            serviceItemId: panel.id,
            price: panel.price,
          });
        });
      })
    );
  }

  // Process individual tests
  if (individualTests.length) {
    const individualTestIds = individualTests.map((t) => t.id);

    testCreationPromises.push(
      createOrderedTests(
        individualTestIds,
        createdLabInvestigation.id,
        false, // Not underpanel
        transaction
      ).then(() => {
        individualTests.forEach((test) => {
          paymentItems.push({
            serviceItemId: test.id,
            price: test.price,
          });
        });
      })
    );
  }

  // Execute all test creation in parallel
  await Promise.all(testCreationPromises);

  // Verify billing items uniqueness
  const billingIds = paymentItems.map((p) => p.serviceItemId);
  if (new Set(billingIds).size !== billingIds.length) {
    throw new ApiError(400, "Duplicate tests in billing items");
  }

  // Create billing records
  await addBulkBillingItemsToMedicalBilling({
    billableId: orderableId,
    billableType: orderableType,
    items: paymentItems,
    userId,
    transaction,
  });

  return createdLabInvestigation;
};

/**
 * Create ordered tests
 * @param testIds
 * @param investigationOrderId
 * @param isUnderpanel
 * @param transaction
 * @returns
 */
const createOrderedTests = async (
  testIds: number[],
  investigationOrderId: string,
  isUnderpanel: boolean,
  transaction?: Transaction
) => {
  if (testIds.length === 0) return;

  await OrderedTest.bulkCreate(
    testIds.map((testId) => ({
      investigationOrderId,
      serviceItemId: testId,
      isUnderpanel,
    })),
    { transaction }
  );
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
