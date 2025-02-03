import sequelize from "../db";
import { Patient, PatientCreditDetail } from "../models";
import {
  createAllergyInput,
  createFamilyHistoryInput,
  createPastMedicalHistoryInput,
  createSocialHistoryInput,
  PatientQueryType,
  PatientRegistrationInput,
} from "../types/patient";
import { ApiError } from "../shared/error/ApiError";
import { Op, Transaction } from "sequelize";
import Allergy from "../models/patient/Allergy";
import FamilyHistory from "../models/patient/FamilyHistory";
import SocialHistory from "../models/patient/SocialHistory";
import PastMedicalHistory from "../models/patient/PastMedicalHistory";
import {
  addressService,
  creditCompanyService,
  emergencyContactService,
} from ".";

//#region Patient

export const groupPatientByGenderAndCount = async () => {
  return await Patient.count({
    attributes: [[sequelize.fn("count", sequelize.col("gender")), "count"]],
    group: ["gender"],
  });
};

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
    const searchConditions = [];
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm.includes(" ")) {
      const terms = trimmedSearchTerm.split(/\s+/);
      const nameConditions = terms.map((term) => ({
        [Op.or]: [
          { firstName: { [Op.like]: `%${term}%` } },
          { middleName: { [Op.like]: `%${term}%` } },
          { lastName: { [Op.like]: `%${term}%` } },
        ],
      }));
      searchConditions.push({ [Op.and]: nameConditions });
    } else {
      searchConditions.push(
        { firstName: { [Op.like]: `%${trimmedSearchTerm}%` } },
        { middleName: { [Op.like]: `%${trimmedSearchTerm}%` } },
        { lastName: { [Op.like]: `%${trimmedSearchTerm}%` } }
      );
    }
    searchConditions.push(
      { card_number: { [Op.like]: `%${searchTerm}%` } },
      { phone: { [Op.like]: `%${searchTerm}%` } },
      { gender: { [Op.like]: `${searchTerm}%` } }
      // { manual_card_id: { [Op.like]: `%${searchTerm}%` } },
    );

    whereClause[Op.or] = searchConditions;
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

export const getPatientNamesForDropdown = async (pageNumber?: string) => {
  let page = pageNumber ? parseInt(pageNumber, 10) : 1;
  if (isNaN(page)) {
    // If the result is NaN, set the page to 1 or handle it accordingly
    page = 1;
  }
  const limit = 10;
  const offset = (page - 1) * limit;
  const { rows: patients, count } = await Patient.findAndCountAll({
    attributes: ["id", "firstName", "middleName", "lastName"],
    order: [
      ["firstName", "ASC"],
      ["middleName", "ASC"],
      ["lastName", "ASC"],
    ],
    offset,
    limit,
  });
  const hasMore = count > page * limit;
  return {
    patients,
    hasMore,
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

export const searchPatientPatientByCardNumberOrNameOrPhone = async (query: {
  page?: string;
  patientId?: string;
  patientName?: string;
  phone?: string;
}) => {
  const { patientId, patientName, phone } = query;
  const page = query.page ? parseInt(query.page) : 1;
  const offset = (page - 1) * 10;
  const whereClause: any = {};
  if (patientId) {
    whereClause.card_number = { [Op.like]: `%${patientId}%` };
  }
  if (patientName) {
    const searchConditions = [];
    const trimmedSearchTerm = patientName.trim();
    if (trimmedSearchTerm.includes(" ")) {
      const terms = trimmedSearchTerm.split(/\s+/);
      const nameConditions = terms.map((term) => ({
        [Op.or]: [
          { firstName: { [Op.like]: `%${term}%` } },
          { middleName: { [Op.like]: `%${term}%` } },
          { lastName: { [Op.like]: `%${term}%` } },
        ],
      }));
      searchConditions.push({ [Op.and]: nameConditions });
    } else {
      searchConditions.push(
        { firstName: { [Op.like]: `%${trimmedSearchTerm}%` } },
        { middleName: { [Op.like]: `%${trimmedSearchTerm}%` } },
        { lastName: { [Op.like]: `%${trimmedSearchTerm}%` } }
      );
    }
    whereClause[Op.or] = searchConditions;
    // const nameParts = patientName.split(" ");
    // const nameConditions = [];

    // if (nameParts[0]) {
    //   nameConditions.push({ firstName: { [Op.like]: `%${nameParts[0]}%` } });
    // }
    // if (nameParts[1]) {
    //   nameConditions.push({ middleName: { [Op.like]: `%${nameParts[1]}%` } });
    // }
    // if (nameParts[2]) {
    //   nameConditions.push({ lastName: { [Op.like]: `%${nameParts[2]}%` } });
    // }

    // if (nameConditions.length > 0) {
    //   whereClause[Op.and] = nameConditions;
    // }
  }

  if (phone) {
    whereClause.phone = { [Op.like]: `%${phone}%` };
  }
  const { rows: patients, count } = await Patient.findAndCountAll({
    where: whereClause,
    attributes: ["id", "firstName", "middleName", "lastName"],
    order: [
      ["firstName", "ASC"],
      ["middleName", "ASC"],
      ["lastName", "ASC"],
    ],
    offset,
    limit: 10,
  });

  const hasMore = count > page * 10;
  // {
  //   [Op.or]: [
  //     { card_number: { [Op.like]: `%${searchTerm}%` } },
  //     { firstName: { [Op.like]: `%${searchTerm}%` } },
  //     { middleName: { [Op.like]: `%${searchTerm}%` } },
  //     { lastName: { [Op.like]: `%${searchTerm}%` } },
  //     { phone: { [Op.like]: `%${searchTerm}%` } },
  //   ],
  // },
  return { patients, hasMore };
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
    credit_limit,
    employeeId_doc,
    letter_doc,
  } = data;
  if (is_credit && !employeeId_doc) {
    throw new ApiError(400, "employeeId Doc", [
      { path: "employeeId_doc", message: "Employee ID required" },
    ]);
  }
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

    //
    const manualCardId = !is_new ? manual_card_id : null;
    // If the patient does not have a phone, use the emergency contact's phone as fallback.
    const resolvedPhone = phone || emergencyContact.phone || null;
    const patient = await Patient.create(
      {
        firstName,
        middleName,
        lastName,
        has_phone: !!resolvedPhone,
        phone: resolvedPhone,
        gender,
        birth_date,
        is_new,
        manual_card_id: manualCardId,
        blood_type: blood_type || null,
        card_number: patientId,
        marital_status: marital_status ? marital_status : null,
        nationality: nationality || null,
        guardian_name: guardian_name || null,
        guardian_relationship: guardian_relationship || null,
        occupation: occupation || null,
        address_id: createdAddress.id,
        emergence_contact_id: createdEmergencyContact.id,
        is_credit,
        empoyeeId_url: employeeId_doc,
      },
      { transaction }
    );
    if (is_credit) {
      const companyId = company_id!;
      const company = await creditCompanyService.getCreditCompanyById(
        companyId
      );
      const activeAgreement = await company.getActiveAgreement();
      if (!activeAgreement) {
        throw new ApiError(400, "Company doesn't have active agreement");
      }
      const hasEmployee = await company.hasEmployee(employeeId!);
      if (!hasEmployee) {
        throw new ApiError(
          400,
          `Employee does not work in ${company.name} company`
        );
      }

      // const creditLimit = credit_limit!;
      await PatientCreditDetail.create(
        {
          agreement_id: activeAgreement.id,
          credit_company_id: company.id,
          employee_id: employeeId!,
          patient_id: patient.id,
          credit_limit: credit_limit!,
          credit_balance: credit_limit!,
        },
        { transaction }
      );
    }
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
  data: Partial<PatientRegistrationInput> & {
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
  console.log(data);

  try {
    const patient = await getPatientById(patient_id);
    if (address) {
      await addressService.updateAddress(
        patient.address_id,
        address,
        transaction
      );
    }
    if (emergencyContact) {
      await emergencyContactService.updateEmergencyContact(
        patient.emergence_contact_id,
        { ...emergencyContact, parentAdderssId: patient.address_id },
        transaction
      );
    }
    await patient.update({
      firstName: firstName || patient.firstName,
      middleName: middleName || patient.middleName,
      lastName: lastName || patient.lastName,
      has_phone: has_phone || patient.has_phone,
      phone: phone || patient.phone,
      gender: gender || patient.gender,
      birth_date: birth_date || patient.birth_date,
      is_new: is_new || patient.is_new,
      manual_card_id: manual_card_id || patient.manual_card_id,
      blood_type: blood_type || patient.blood_type,
      // card_number: patientId,
      marital_status: marital_status || patient.marital_status,
      nationality: nationality || patient.nationality,
      guardian_name: guardian_name || patient.guardian_name,
      guardian_relationship:
        guardian_relationship || patient.guardian_relationship,
      occupation: occupation || patient.occupation,
      is_credit: is_credit || patient.is_credit,
    });

    await transaction.commit();
    return patient;
  } catch (error) {
    // const err = error as Error;
    await transaction.rollback();
    throw error;
  }
};

export const updatePatientCreditDetail = async (
  patient: Patient,
  data: { company_id: number; employeeId: number; credit_limit: number },
  transaction: Transaction
) => {
  const company = await creditCompanyService.getCreditCompanyById(
    data.company_id
  );
  const activeAgreement = await company.getActiveAgreement();

  if (!activeAgreement) {
    throw new ApiError(
      400,
      `Company ${company.name} does not have an active agreement`
    );
  }

  const hasEmployee = await company.hasEmployee(data.employeeId);
  if (!hasEmployee) {
    throw new ApiError(
      400,
      `Employee does not work at ${company.name} company`
    );
  }

  await PatientCreditDetail.upsert(
    {
      agreement_id: activeAgreement.id,
      credit_company_id: company.id,
      employee_id: data.employeeId,
      patient_id: patient.id,
      credit_limit: data.credit_limit,
      credit_balance: data.credit_limit,
    },
    { transaction }
  );
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

export const getPatientAllergies = async (patientId: number) => {
  const patient = await getPatientById(patientId);
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
  const socialHistories = await patient.getSocialHistories();
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
