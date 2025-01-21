import sequelize from "../db";
import { Patient } from "../models";
import {
  createAllergyInput,
  createFamilyHistoryInput,
  createPastMedicalHistoryInput,
  createSocialHistoryInput,
  PatientQueryType,
  PatientRegistrationInput,
} from "../types/patient";
import { ApiError } from "../shared/error/ApiError";
import { Op } from "sequelize";
import Allergy from "../models/patient/Allergy";
import FamilyHistory from "../models/patient/FamilyHistory";
import SocialHistory from "../models/patient/SocialHistory";
import PastMedicalHistory from "../models/patient/PastMedicalHistory";
import { addressService, emergencyContactService } from ".";

export const groupPatientByGenderAndCount = async () => {
  return await Patient.count({
    attributes: [[sequelize.fn("count", sequelize.col("gender")), "count"]],
    group: ["gender"],
  });
};

//#region Patient

export const getPatients = async (query: PatientQueryType) => {
  const {
    searchTerm,
    sortBy,
    gender,
    isPaymentWayCredit,
    isRegistrationTypeNew,
  } = query;
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  const whereClause: any = {};
  const orderClause: any = [];
  if (searchTerm) {
    whereClause[Op.or] = [
      { firstName: { [Op.like]: `%${searchTerm}%` } },
      { middleName: { [Op.like]: `%${searchTerm}%` } },
      { lastName: { [Op.like]: `%${searchTerm}%` } },
      { card_number: { [Op.like]: `%${searchTerm}%` } },
      { phone: { [Op.like]: `%${searchTerm}%` } },
      { gender: { [Op.like]: `${searchTerm}%` } },
      { manual_card_id: { [Op.like]: `%${searchTerm}%` } },
    ];
  }
  if (gender) {
    whereClause.gender = gender;
  }
  if (isPaymentWayCredit) {
    whereClause.is_credit = isPaymentWayCredit === "true";
  }
  if (isRegistrationTypeNew) {
    whereClause.is_new = isRegistrationTypeNew === "true";
  }
  switch (sortBy) {
    case "name_asc":
      orderClause.push(
        ["firstName", "ASC"],
        ["middleName", "ASC"],
        ["lastName", "ASC"]
      );
      break;
    case "name_desc":
      orderClause.push(
        ["firstName", "DESC"],
        ["middleName", "DESC"],
        ["lastName", "DESC"]
      );
      break;
    case "age_asc":
      orderClause.push(["birth_date", "ASC"]);
      break;
    case "age_desc":
      orderClause.push(["birth_date", "DESC"]);
      break;
    case "sex_asc":
      orderClause.push(["gender", "ASC"]);
      break;
    case "sex_desc":
      orderClause.push(["gender", "DESC"]);
      break;
    case "registration_date_asc":
      orderClause.push(["createdAt", "ASC"]);
      break;

    case "registration_date_desc":
      orderClause.push(["createdAt", "DESC"]);
      break;
    default: {
      orderClause.push(
        ["firstName", "ASC"],
        ["middleName", "ASC"],
        ["lastName", "ASC"]
      );
    }
  }
  const offset = (page - 1) * limit;
  const { rows: patients, count } = await Patient.findAndCountAll({
    where: whereClause,
    order: orderClause,
    offset,
    limit,
  });
  const hasMore = count > page * limit;
  return {
    patients,
    pagination: {
      currentPage: page,
      totalResults: count,
      totalPages: Math.ceil(count / limit),
      hasMore,
    },
  };
};

export const getPatientById = async (id: number) => {
  const patient = await Patient.findByPk(id);
  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }
  return patient;
};

export const getLastPatientId = async () => {
  const patient = await Patient.findOne({
    order: [["id", "DESC"]],
  });

  return patient;
};
export const createPatient = async (
  data: PatientRegistrationInput & {
    employeeId_doc: string | null;
    letter_doc: string | null;
  }
) => {
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
    emergencyContact,
    is_credit,
    company_id,
    employeeId,
    employeeId_doc,
    letter_doc,
  } = data;

  const transaction = await sequelize.transaction();
  try {
    const createdAddress = await addressService.createAddress(
      address,
      transaction
    );
    // if(emergencyContact.)
    const createdEmergencyContact =
      await emergencyContactService.createEmergencyContact(
        { ...emergencyContact, parentAdderssId: createdAddress.id },
        // createdAddress.id,
        transaction
      );

    const patient = await Patient.create({
      firstName,
      middleName,
      lastName,
      has_phone,
      phone,
      gender,
      birth_date,
      is_new,
      manual_card_id: manual_card_id,
      blood_type: blood_type,
      card_number: patientId,
      marital_status: marital_status ? marital_status : null,
      nationality,
      guardian_name,
      guardian_relationship,
      occupation,
      address_id: createdAddress.id,
      emergence_contact_id: createdEmergencyContact.id,
      is_credit,
    });
    // if(is_credit){
    //   const companyId = parseInt(company_id!)
    //   const company =await creditCompanyService.getCreditCompanyById(companyId);
    //   const activeAgreement = await company.getActiveAgreement();
    //   if(!activeAgreement){
    //     throw new ApiError(400,"Company doesn't have active agreement")
    //   }

    // }
    await transaction.commit();
    return patient;
  } catch (error) {
    // const err = error as Error;
    await transaction.rollback();
    throw error;
  }
};

export const updatePatient = async (
  patient_id: number,
  data: PatientRegistrationInput & {
    employeeId_doc: string | null;
    letter_doc: string | null;
  }
) => {
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
    emergencyContact,
    is_credit,
    company_id,
    employeeId,
    employeeId_doc,
    letter_doc,
  } = data;
  const transaction = await sequelize.transaction();
  try {
    const patient = await getPatientById(patient_id);
    const createdAddress = await addressService.updateAddress(
      patient.address_id,
      address,
      transaction
    );
    // if(emergencyContact.)
    const createdEmergencyContact =
      await emergencyContactService.updateEmergencyContact(
        patient.emergence_contact_id,
        { ...emergencyContact, parentAdderssId: createdAddress.id },

        transaction
      );

    await patient.update({
      firstName,
      middleName,
      lastName,
      has_phone,
      phone,
      gender,
      birth_date,
      is_new,
      manual_card_id: manual_card_id,
      blood_type: blood_type,
      card_number: patientId,
      marital_status: marital_status ? marital_status : null,
      nationality,
      guardian_name,
      guardian_relationship,
      occupation,
      address_id: createdAddress.id,
      emergence_contact_id: createdEmergencyContact.id,
      is_credit,
    });
    // if(is_credit){
    //   const companyId = parseInt(company_id!)
    //   const company =await creditCompanyService.getCreditCompanyById(companyId);
    //   const activeAgreement = await company.getActiveAgreement();
    //   if(!activeAgreement){
    //     throw new ApiError(400,"Company doesn't have active agreement")
    //   }

    // }
    await transaction.commit();
    return patient;
  } catch (error) {
    // const err = error as Error;
    await transaction.rollback();
    throw error;
  }
};

export const deactivatePatient = async (id: number) => {
  const patient = await getPatientById(id);
  await patient.update({
    status: false,
  });
  return patient;
};

export const activatePatient = async (id: number) => {
  const patient = await getPatientById(id);
  await patient.update({
    status: true,
  });
  return patient;
};

export const makeInPatient = async (id: number) => {
  const patient = await getPatientById(id);
  await patient.update({
    patient_type: "inpatient",
  });
  return patient;
};

export const makeOutPatient = async (id: number) => {
  const patient = await getPatientById(id);
  await patient.update({
    patient_type: "outpatient",
  });
  return patient;
};

//#endregion
//#region Allery
export const getAllergies = async (id: number) => {
  const patient = await getPatientById(id);
  const allergies = await patient.getAllergies();
  return allergies;
};
export const getAllergYById = async (allergyId: number) => {
  const allergy = await Allergy.findByPk(allergyId);
  if (!allergy) {
    throw new ApiError(404, "Allergy not found");
  }
  return allergy;
};

export const createAllergy = async (
  patientId: number,
  data: createAllergyInput,
  created_by: number
) => {
  const { allergy_type, severity, reaction_details } = data;
  const patient = await getPatientById(patientId);
  const allergy = patient.createAllergy({
    allergy_type,
    severity,
    reaction_details,
    created_by: created_by,
  });
  return allergy;
};

export const updateAllergy = async (
  alleryId: number,
  data: createAllergyInput,
  created_by: number
) => {
  const { allergy_type, severity, reaction_details } = data;
  const allergy = await getAllergYById(alleryId);
  await allergy.update({
    allergy_type,
    reaction_details,
    severity,
  });
  return allergy;
};
export const deleteAllergy = async (alleryId: number) => {
  const allergy = await getAllergYById(alleryId);
  await allergy.destroy();
  return allergy;
};
//#endregion

//#region family History

export const getFamilyHistories = async (patientId: number) => {
  const patient = await getPatientById(patientId);
  const FamilyHistories = await patient.getFamilyHistories();
  return FamilyHistories;
};
export const getFamilyHistoryById = async (familyHistoryId: number) => {
  const familyHistory = await FamilyHistory.findByPk(familyHistoryId);
  if (!familyHistory) {
    throw new ApiError(404, "Family history not found");
  }
  return familyHistory;
};

export const createFamilyHistory = async (
  patientId: number,
  data: createFamilyHistoryInput,
  created_by: number
) => {
  const { medical_condition, relationship } = data;
  const patient = await getPatientById(patientId);
  const familyHistory = await patient.createFamilyHistory({
    medical_condition,
    relationship,
    created_by: created_by,
  });
  return familyHistory;
};

export const updateFamilyHistory = async (
  alleryId: number,
  data: createFamilyHistoryInput
) => {
  const { medical_condition, relationship } = data;
  const familyHistory = await getFamilyHistoryById(alleryId);
  await familyHistory.update({
    medical_condition,
    relationship,
  });
  return familyHistory;
};
export const deleteFamilyHistory = async (alleryId: number) => {
  const familyHistory = await getFamilyHistoryById(alleryId);
  await familyHistory.destroy();
  return familyHistory;
};

//#endregion

//#region Social History
export const getSocialHistories = async (patientId: number) => {
  const patient = await getPatientById(patientId);
  const socialHistories = await patient.getFamilyHistories();
  return socialHistories;
};
export const getSocialHistoryById = async (socialHistoryId: number) => {
  const socialHistory = await SocialHistory.findByPk(socialHistoryId);
  if (!socialHistory) {
    throw new ApiError(404, "Social history not found");
  }
  return socialHistory;
};

export const createsocialHistory = async (
  patientId: number,
  data: createSocialHistoryInput,
  created_by: number
) => {
  const { alcohol_consumption, drug_use, smoking_status } = data;
  const patient = await getPatientById(patientId);
  const socialHistory = await patient.createSocialHistory({
    created_by: created_by,
    // medical_condition: "",
    // relationship: "",
    alcohol_use: alcohol_consumption,
    tobacco_use: smoking_status,
  });
  return socialHistory;
};

export const updatesocialHistory = async (
  socialHistoryId: number,
  data: createSocialHistoryInput
) => {
  const { alcohol_consumption, smoking_status } = data;
  const socialHistory = await getSocialHistoryById(socialHistoryId);
  await socialHistory.update({
    alcohol_use: alcohol_consumption,
    tobacco_use: smoking_status,
  });
  return socialHistory;
};
export const deletesocialHistory = async (socialHistoryId: number) => {
  const socialHistory = await getSocialHistoryById(socialHistoryId);
  await socialHistory.destroy();
  return socialHistory;
};
//#endregion

//#region Past Medical History
export const getPastMedicalHistories = async (patientId: number) => {
  const patient = await getPatientById(patientId);
  const pastMedicalHistories = await patient.getPastMedicalHistories();
  return pastMedicalHistories;
};
export const getPastMedicalHistoryById = async (
  pastMedicalHistoryId: number
) => {
  const pastMedicalHistory = await PastMedicalHistory.findByPk(
    pastMedicalHistoryId
  );
  if (!pastMedicalHistory) {
    throw new ApiError(404, "Past medical history  not found");
  }
  return pastMedicalHistory;
};

export const createPastMedicalHistory = async (
  patientId: number,
  data: createPastMedicalHistoryInput,
  created_by: number
) => {
  const { medical_condition, treatment } = data;
  const patient = await getPatientById(patientId);
  const pastMedicalHistory = await patient.createPastMedicalHistory({
    medical_condition,
    treatment,
    created_by: created_by,
  });
  return pastMedicalHistory;
};

export const updatePastMedicalHistory = async (
  pastMedicalHistoryId: number,
  data: createPastMedicalHistoryInput
) => {
  const { medical_condition, treatment } = data;
  const pastMedicalHistory = await getPastMedicalHistoryById(
    pastMedicalHistoryId
  );
  await pastMedicalHistory.update({
    medical_condition,
    treatment,
  });
  return pastMedicalHistory;
};
export const deletePastMedicalHistory = async (
  pastMedicalHistoryId: number
) => {
  const pastMedicalHistory = await getPastMedicalHistoryById(
    pastMedicalHistoryId
  );
  await pastMedicalHistory.destroy();
  return pastMedicalHistory;
};
//#endregion
