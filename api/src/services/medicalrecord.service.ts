import { Transaction } from "sequelize";
import MedicalRecord from "../models/MedicalRecord";

export const parientActiveMedicalRecord = async (patientId: number) => {
  const record = await MedicalRecord.findOne({
    where: {
      patientId,
      status: true,
    },
  });
  return record;
};

export const getPatientLastMedicalRecord = async (patientId: number) => {
  const record = await MedicalRecord.findOne({
    where: {
      patientId,
    },
    order: [["createdAt", "DESC"]],
  });
  return record;
};
export const createMedicalRecord = async (
  patientId: number,
  transaction?: Transaction
) => {
  const record = await MedicalRecord.create(
    {
      patientId,
    },
    { transaction }
  );
  return record;
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
