import sequelize from "sequelize";
import { Patient } from "../models";
import { PatientRegistrationInput } from "../types/patient";

export const createPatient = async (data: PatientRegistrationInput) => {};

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
