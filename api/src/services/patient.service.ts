import sequelize from "sequelize";
import { Patient } from "../models";
import { PatientRegistrationInput } from "../types/patient";
import { ApiError } from "../shared/error/ApiError";

export const getPatientById = async (id: number) => {
  const patient = await Patient.findByPk(id);
  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }
  return patient;
};

export const createPatient = async (data: PatientRegistrationInput) => {
  const {
    patientId,
    registrationDate,
    firstName,
    middleName,
    lastName,
    gender,
    birth_date,
    has_phone,
    phone,
    is_new,
    manual_card_id,
    blood_type,
    guardian_name,
    guardian_relationship,
    marital_status,
    nationality,
    occupation,
    address,
    emergency,
    is_credit,
    company_id,
    employeeId,
    employeeId_doc,
    letter_doc,
  } = data;
};

export const updatePatient = async (data: PatientRegistrationInput) => {
  const {
    patientId,
    registrationDate,
    firstName,
    middleName,
    lastName,
    gender,
    birth_date,
    has_phone,
    phone,
    is_new,
    manual_card_id,
    blood_type,
    guardian_name,
    guardian_relationship,
    marital_status,
    nationality,
    occupation,
    address,
    emergency,
    is_credit,
    company_id,
    employeeId,
    employeeId_doc,
    letter_doc,
  } = data;
};

/**
 *
 *
 */

export const groupPatientByGenderAndCount = async () => {
  return await Patient.count({
    attributes: [[sequelize.fn("count", sequelize.col("gender")), "count"]],
    group: ["gender"],
  });
};
