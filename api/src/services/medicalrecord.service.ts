import { Transaction } from "sequelize";
import MedicalRecord from "../models/MedicalRecord";
import {
  addMedicalRecordSymptomsType,
  addVitalSignType,
} from "../types/medical-record";
import { loggedInUserId } from "../types/shared";
import { ApiError } from "../shared/error/ApiError";
import { PatientVisit, VitalSign, VitalSignResult } from "../models";
import sequelize from "../db";
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
 *
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
  const createdVitalSigns = await VitalSign.create(
    {
      medicalRecordId,
      examinerId: userId,
    },
    { transaction }
  );

  const transformVitalSigns = vitalSigns.map((vitalSign) => ({
    result: vitalSign.value || "",
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
};
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
