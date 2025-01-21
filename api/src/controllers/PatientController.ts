import {
  createAllergyInput,
  createFamilyHistoryInput,
  createPastMedicalHistoryInput,
  createSocialHistoryInput,
  PatientQueryType,
  PatientRegistrationInput,
} from "../types/patient";
import { patientService } from "../services";
import asyncHandler from "../utils/asyncHandler";
const db = require("../models");
import { Op } from "sequelize";

export const getAllPatients = asyncHandler(async (req, res) => {
  // console.log(req.query);
  const query = req.query as PatientQueryType;
  const patientsData = await patientService.getPatients(query);
  // const { page: qPage, limit: qLimit } = req.query as {
  //   page: string;
  //   limit: string;
  // };
  // const page = parseInt(qPage);
  // const limit = parseInt(qLimit);
  // let where: any = {};

  // let sortDirection;
  // if (req.query?.status !== "") {
  //   if (req.query.status === "true") {
  //     where.status = true;
  //   } else if (req.query.status === "false") {
  //     where.status = false;
  //   }
  // }
  // if (req.query?.is_credit) {
  //   if (req.query.is_credit === "true") {
  //     where.is_credit = true;
  //   } else if (req.query.is_credit === "false") {
  //     where.is_credit = false;
  //   }
  //   // where.is_credit = Boolean(req.query.is_credit);
  // }
  // if (req.query?.is_new) {
  //   if (req.query.is_new === "true") {
  //     where.is_new = true;
  //   } else if (req.query.is_new === "false") {
  //     where.is_new = false;
  //   }
  //   // where.is_new = Boolean(req.query.is_new);
  // }
  // if (req.query?.gender) {
  //   where.gender = req.query?.gender;
  // }
  // // sort
  // switch (req.query?.sortBy) {
  //   case "name":
  //     if (req.query?.order === "asc") {
  //       sortDirection = [
  //         ["firstName", "ASC"],
  //         ["middleName", "ASC"],
  //         ["lastName", "ASC"],
  //       ];
  //     } else {
  //       sortDirection = [
  //         ["lastName", "DESC"],
  //         ["firstName", "DESC"],
  //         ["middleName", "DESC"],
  //       ];
  //     }
  //     break;
  //   case "age":
  //     if (req.query?.order === "asc") {
  //       sortDirection = [["birth_date", "ASC"]];
  //     } else {
  //       sortDirection = [["birth_date", "DESC"]];
  //     }
  //     break;
  //   case "sex":
  //     if (req.query?.order === "asc") {
  //       sortDirection = [["gender", "ASC"]];
  //     } else {
  //       sortDirection = [["gender", "DESC"]];
  //     }
  //     break;
  //   case "registation_date":
  //     if (req.query?.order === "asc") {
  //       sortDirection = [["createdAt", "ASC"]];
  //     } else {
  //       sortDirection = [["createdAt", "DESC"]];
  //     }
  //     break;
  //   default:
  //     sortDirection = [
  //       ["firstName", "ASC"],
  //       ["middleName", "ASC"],
  //       ["lastName", "ASC"],
  //     ];
  // }
  // const { count, rows } = await db.Patient.findAndCountAll({
  //   where: where,
  //   include: [
  //     {
  //       model: db.Address,
  //       as: "address",
  //       attributes: ["id", "phone_1"],
  //     },
  //   ],
  //   attributes: [
  //     "id",
  //     "firstName",
  //     "lastName",
  //     "middleName",
  //     "gender",
  //     "birth_date",
  //     "has_phone",
  //     "phone",
  //     "status",
  //     "createdAt",
  //     "card_number",
  //   ],
  //   // order: [
  //   //   ["firstName", "ASC"],
  //   //   ["middleName", "ASC"],
  //   //   ["lastName", "ASC"],
  //   // ],
  //   order: sortDirection,
  //   offset: (page - 1) * limit,
  //   limit: limit,
  // });
  // const hasMore = count > page * limit;
  // console.log(patients);
  res.status(200).json({
    status: "success",
    message: "Patients retrieved successfully",
    data: {
      patients: patientsData.patients,
      pagination: patientsData.pagination,
    },
  });
});
export const getLastPatientId = asyncHandler(async (req, res) => {
  const lastPatient = await patientService.getLastPatientId();
  // res.status(200).json(lastPatient?.card_number);
  res.status(200).json({
    status: "success",
    message: "Patient retrieved successfully",
    data: {
      lastPatientId: lastPatient?.card_number,
    },
  });
});
export const getPatientNameList = asyncHandler(async (req, res) => {
  const { page } = req.query as {
    page: string | undefined;
  };

  // console.log("\n\nkjaduig\n\n");
  const patientResults = await patientService.getPatientNamesForDropdown(page);

  res.json({
    status: "success",
    message: "",
    data: {
      patients: patientResults.patients,
      hasMore: patientResults.hasMore,
    },
  });
});
export const getPatientOverViewData = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const patient = 1;
  //  await db.Patient.findByPk(id, {
  //   include: [
  //     {
  //       model: db.MedicalRecord,
  //       as: "medicalRecords",
  //       include: [
  //         {
  //           model: db.MedicalRecordDetail,
  //           as: "medicalRecordDetails",
  //           include: [
  //             {
  //               model: db.User,
  //               as: "doctor",
  //               include: [
  //                 {
  //                   model: db.Employee,
  //                   as: "employee",
  //                   attributes: ["id", "firstName", "lastName", "middleName"],
  //                 },
  //               ],
  //               attributes: ["id"],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  //   attributes: [
  //     "id",
  //     "firstName",
  //     "lastName",
  //     "middleName",
  //     "gender",
  //     "birth_date",
  //     "has_phone",
  //     "phone",
  //     "status",
  //     "card_number",
  //   ],
  // });
  res.json(patient);
});
export const searchPatient = asyncHandler(async (req, res) => {
  const query = req.query as {
    patientId: string | undefined;
    patientName: string | undefined;
    phone: string | undefined;
    page: string | undefined;
  };

  const patientResults =
    await patientService.searchPatientPatientByCardNumberOrNameOrPhone(query);
  // let where: any = {};
  // if (query.patientId) {
  //   where.card_number = { [Op.like]: `%${query.patientId}%` };
  // }
  // if (query.phone) {
  //   where.phone = { [Op.like]: `%${query.phone}%` };
  // }
  // if (query.patientName) {
  //   let name = query?.patientName?.split(" ");
  //   if (name.length === 1) {
  //     where.firstName = { [Op.like]: `%${name[0]}%` };
  //   } else if (name.length === 2) {
  //     where.firstName = { [Op.like]: `%${name[0]}%` };
  //     where.middleName = { [Op.like]: `%${name[1]}%` };
  //   } else if (name.length === 3) {
  //     where.firstName = { [Op.like]: `%${name[0]}%` };
  //     where.middleName = { [Op.like]: `%${name[1]}%` };
  //     where.lastName = { [Op.like]: `%${name[2]}%` };
  //   }

  //   // where.firstName = { [Op.like]: `%${req.query.patientName}%` };
  // }
  // // [Op.like]: `%doctor%`,
  // let patients;
  // if (where.card_number || where.firstName || where.phone) {
  //   patients = await db.Patient.findAll({
  //     where,
  //     limit: 10,
  //     attributes: [
  //       "id",
  //       "firstName",
  //       "middleName",
  //       "lastName",
  //       "card_number",
  //       "phone",
  //     ],
  //   });
  // } else {
  //   patients = [];
  // }

  res.status(200).json({
    status: "success",
    message: "Patients retrieved successfully",
    data: {
      patients: patientResults.patients,
      hasMore: patientResults.hasMore,
    },
  });
});
export const getPatient = asyncHandler(async (req, res) => {
  const patientId = parseInt(req.params.id);

  const patient = await patientService.getPatientById(patientId);

  res.status(200).json({
    status: "success",
    message: "Patient retrieved successfully",
    data: {
      patient: patient,
    },
  });
});
export const getPatientGeneralInforamtion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  // console.log("\n\ngetPatientGeneralInforamtion\n\n");
  const patient = await db.Patient.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: db.Allergy,
        as: "allergies",
      },
      {
        model: db.FamilyHistory,
        as: "familyHistories",
      },
      {
        model: db.SocialHistory,
        as: "socialHistories",
      },
      {
        model: db.PastMedicalHistory,
        as: "pastMedicalHistories",
      },
    ],
  });
  // console.log(patient);
  res.json(patient);
});
export const getFamilyHistory = asyncHandler(async (req, res) => {
  const patientId = parseInt(req.params.id);
  const familyHistories = await patientService.getFamilyHistories(patientId);
  // const patient = await db.Patient.findByPk(id);
  // if (!patient) {
  //   res.status(404);
  //   throw new Error("Patient not found");
  // }
  // const familyHistories = await db.FamilyHistory.findAll({
  //   where: {
  //     patient_id: patient.id,
  //   },
  // });
  res.json({
    status: "success",
    message: "Family histories retrieved successfully",
    data: {
      familyHistories,
    },
  });
});
export const getSocialHistory = asyncHandler(async (req, res) => {
  const patientId = parseInt(req.params.id);
  const socialHistories = await patientService.getSocialHistories(patientId);
  // db.Patient.findByPk(id);
  // if (!patient) {
  //   res.status(404);
  //   throw new Error("Patient not found");
  // }
  // const socialHistories = await db.SocialHistory.findAll({
  //   where: {
  //     patient_id: patient.id,
  //   },
  // });
  res.json({
    status: "success",
    message: "Social histories retrieved successfully",
    data: {
      socialHistories,
    },
  });
});
export const createPatient = asyncHandler<{
  validatedData: PatientRegistrationInput;
}>(async (req, res) => {
  // const { patient, address, emergency, company_id, employeeId } = req.body;
  // console.log(req.body);
  // return;
  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  // Collect the uploaded files (assuming single file per field)
  const uploadedFiles = {
    employeeId_doc: files?.employeeId_doc?.[0]?.path || null,
    letter_doc: files?.letter_doc?.[0]?.path || null,
  };
  const patientData = {
    ...req.validatedData,
    ...uploadedFiles,
  };
  const patient = await patientService.createPatient(patientData);
  // const patientParsed = JSON.parse(patient);
  // const addressParsed = JSON.parse(address);
  // const emergencyParsed = JSON.parse(emergency);

  // if (patientParsed.has_phone) {
  //   const patient = await db.Patient.findOne({
  //     where: {
  //       phone: patientParsed.phone,
  //       has_phone: true,
  //     },
  //   });
  //   if (patient) {
  //     res.status(400);
  //     throw new Error("Patient Phone number already exists");
  //   }
  // }
  // let addressID;

  // let newAddress;
  // let EmergencyContactAddress;
  // if (patientParsed.is_credit) {
  //   const employee = await db.CompanyEmployee.findOne({
  //     where: {
  //       id: parseInt(employeeId),
  //     },
  //   });
  //   if (!employee) {
  //     res.status(400);
  //     throw new Error("Employee not found");
  //   }
  //   addressID = employee.address_id;
  // } else {
  //   newAddress = await db.Address.create(
  //     {
  //       phone_1: patientParsed.phone,
  //       phone_2: addressParsed.phone_2 ? addressParsed.phone_2 : null,
  //       street: addressParsed.street,
  //       house_number: addressParsed.house_number
  //         ? addressParsed.house_number
  //         : null,
  //       email: addressParsed.email ? addressParsed.email : null,
  //       woreda_id: addressParsed.woreda_id,
  //     },
  //     { userId: req.user?.id }
  //   );
  //   addressID = newAddress.id;
  //   // EmergencyContactAddress = newAddress.id;
  // }

  // if (!emergencyParsed.the_same_address_as_patient) {
  //   // if (!patientParsed.is_credit) {
  //   //   await newAddress?.destroy();
  //   // }
  //   EmergencyContactAddress = await db.Address.create(
  //     {
  //       phone_1: emergencyParsed.phone,
  //       phone_2: emergencyParsed.phone_2 ? emergencyParsed.phone_2 : null,
  //       street: emergencyParsed.street,
  //       house_number: emergencyParsed.house_number
  //         ? emergencyParsed.house_number
  //         : null,
  //       email: emergencyParsed.email ? emergencyParsed.email : null,
  //       woreda_id: emergencyParsed.woreda_id,
  //     },
  //     { userId: req.user?.id }
  //   );
  // }
  // const EmergencyContact = await db.EmergencyContact.create(
  //   {
  //     firstName: emergencyParsed.firstName,
  //     lastName: emergencyParsed.lastName,
  //     middleName: emergencyParsed.middleName,
  //     phone: emergencyParsed.phone,
  //     relationship:
  //       emergencyParsed.relation !== "Other"
  //         ? emergencyParsed.relation
  //         : emergencyParsed.other_relation,
  //     address_id: emergencyParsed.the_same_address_as_patient
  //       ? addressID
  //       : EmergencyContactAddress.id,
  //   },
  //   { userId: req.user?.id }
  // );
  // if (!EmergencyContact) {
  //   await EmergencyContactAddress?.destroy({ userId: req.user?.id });
  //   await newAddress?.destroy({ userId: req.user?.id });
  //   res.status(400);
  //   throw new Error("Emergency Contact not created");
  // }
  // // console.log(addressID);

  // const newPatient = await db.Patient.create(
  //   {
  //     firstName: patientParsed.firstName,
  //     middleName: patientParsed.middleName,
  //     lastName: patientParsed.lastName,
  //     address_id: emergencyParsed.the_same_address_as_patient
  //       ? addressID
  //       : EmergencyContactAddress.id,
  //     gender: patientParsed.gender,
  //     has_phone: patientParsed.has_phone,
  //     phone: patientParsed.phone,
  //     birth_date: patientParsed.birth_date,
  //     is_credit: patientParsed.is_credit,
  //     is_new: patientParsed.is_new,
  //     blood_type: patientParsed.blood_type,
  //     nationality: patientParsed.nationality,
  //     manual_card_id: !patientParsed.is_new
  //       ? patientParsed?.manual_card_id
  //       : null,
  //     marital_status: patientParsed.marital_status,
  //     guardian_name: patientParsed.guardian_name,
  //     guardian_relationship: patientParsed.guardian_relationship,
  //     occupation: patientParsed.occupation,
  //     company_id: patientParsed.is_credit ? company_id : null,
  //     emergence_contact_id: EmergencyContact.id,
  //     empoyeeId_url: patientParsed.is_credit
  //       ? ""
  //       : // ? "uploads/" + req.files["employeeId_doc"]&& req.files["employeeId_doc"][0]?.filename
  //         null,
  //   },
  //   { userId: req.user?.id }
  // );
  // // const paddedCardNumber = getPaddedName(newPatient.id, 5, "P");
  // const PatientIdExists = await db.Patient.findOne({
  //   where: {
  //     card_number: patientParsed.patient_id,
  //   },
  // });
  // let patientId;
  // if (PatientIdExists) {
  //   patientId = getPaddedName(newPatient.id, 5, "P");
  // } else {
  //   patientId = patientParsed.patient_id;
  // }
  // newPatient.card_number = patientId;
  // await newPatient.save({ hooks: false });
  // if (!newPatient) {
  //   emergencyParsed.the_same_address_as_patient
  //     ? await newAddress.destroy()
  //     : await EmergencyContactAddress.destroy();
  //   await EmergencyContact.destroy();
  //   res.status(400);
  //   throw new Error("Failed to create patient");
  // }
  // if (patientParsed.is_credit) {
  //   const activeAgreenent = await db.CreditAgreement.findOne({
  //     where: {
  //       company_id: company_id,
  //       status: true,
  //     },
  //   });
  //   if (!activeAgreenent) {
  //     res.status(400);
  //     throw new Error("Company doesn't have active agreement");
  //   }
  //   const newCreditPatient = await db.CreditPatient.create({
  //     patient_id: newPatient.id,
  //     employee_id: employeeId,
  //     agreement_id: activeAgreenent.id,
  //   });

  // }
  res.status(201).json({
    status: "success",
    message: "Patient created successfully",
    data: {
      patient,
    },
  });
});
export const updatePatient = asyncHandler<{
  validatedData: PatientRegistrationInput;
}>(async (req, res) => {
  // console.log("\n\nupdatePatient\n\n");
  const { id } = req.params;
  // console.log(req.body);
  // return;
  // const { patient, address, emergency, company_id, employeeId } = req.body;
  // console.log(req.body);
  // return;
  const patientId = parseInt(req.params.id);
  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  // Collect the uploaded files (assuming single file per field)
  const uploadedFiles = {
    employeeId_doc: files?.employeeId_doc?.[0]?.path || null,
    letter_doc: files?.letter_doc?.[0]?.path || null,
  };
  const patientData = {
    ...req.validatedData,
    ...uploadedFiles,
  };
  const patient = await patientService.updatePatient(patientId, patientData);
  // const patientParsed = JSON.parse(patient);
  // const addressParsed = JSON.parse(address);
  // const emergencyParsed = JSON.parse(emergency);
  // const ExistingPatient = await db.Patient.findByPk(id);
  // if (!ExistingPatient) {
  //   res.status(404);
  //   throw new Error("Patient not found");
  // }

  // const ExistingEmergencyContact = await db.EmergencyContact.findByPk(
  //   emergencyParsed.id
  // );
  // if (!ExistingEmergencyContact) {
  //   res.status(404);
  //   throw new Error("Emergency contact not found");
  // }
  // // console.log(ExistingPatient?.dataValues);
  // // console.log(ExistingEmergencyContact?.dataValues);

  // if (
  //   ExistingPatient.address_id === ExistingEmergencyContact.address_id &&
  //   !emergencyParsed.the_same_address_as_patient
  // ) {
  //   // console.log("from the same address to different");

  //   //    await db.Address.destroy({
  //   //   where: {
  //   //     id: ExistingEmergencyContact.address_id,
  //   //   },
  //   // });

  //   if (patientParsed.is_credit) {
  //     const employee = await db.CompanyEmployee.findOne({
  //       where: {
  //         employee_id: employeeId,
  //       },
  //     });
  //     if (!employee) {
  //       res.status(404);
  //       throw new Error("Employee not found");
  //     }

  //     ExistingPatient.address_id = employee.address_id;
  //   } else {
  //     await db.Address.update(
  //       {
  //         phone_1: patientParsed.phone,

  //         phone_2: addressParsed.phone_2 ? addressParsed.phone_2 : null,
  //         street: addressParsed.street,
  //         house_number: addressParsed.house_number
  //           ? addressParsed.house_number
  //           : null,
  //         email: addressParsed.email ? addressParsed.email : null,
  //         woreda_id: addressParsed.woreda_id,
  //       },
  //       {
  //         where: {
  //           id: ExistingPatient.address_id,
  //         },
  //         userId: req.user?.id,
  //       }
  //     );
  //     // patientAddress = newPatientAddress.id;
  //   }

  //   const newEmergencyAddress = await db.Address.create(
  //     {
  //       phone_1: emergencyParsed.phone,
  //       phone_2: null,
  //       street: emergencyParsed.street,
  //       house_number: emergencyParsed.house_number
  //         ? emergencyParsed.house_number
  //         : null,
  //       email: emergencyParsed.email ? emergencyParsed.email : null,
  //       woreda_id: emergencyParsed.woreda_id,
  //     },
  //     { userId: req.user?.id }
  //     // {
  //     //   where: {
  //     //     id: ExistingEmergencyContact.address_id,
  //     //   },
  //     // }
  //   );
  //   ExistingEmergencyContact.address_id = newEmergencyAddress.id;
  // }
  // if (
  //   ExistingPatient.address_id !== ExistingEmergencyContact.address_id &&
  //   emergencyParsed.the_same_address_as_patient
  // ) {
  //   console.log("from different address to the same");
  //   let EmergencyAddressId = ExistingEmergencyContact.address_id;
  //   ExistingEmergencyContact.address_id = ExistingPatient.address_id;
  //   await ExistingEmergencyContact.save();

  //   await db.Address.update(
  //     {
  //       phone_1: patientParsed.phone,
  //       phone_2: addressParsed.phone_2 ? addressParsed.phone_2 : null,
  //       street: addressParsed.street,
  //       house_number: addressParsed.house_number
  //         ? addressParsed.house_number
  //         : null,
  //       email: addressParsed.email ? addressParsed.email : null,
  //       woreda_id: addressParsed.woreda_id,
  //     },
  //     {
  //       where: {
  //         id: ExistingPatient.address_id,
  //       },
  //       individualHooks: true,
  //       userId: req.user?.id,
  //     }
  //   );
  //   await db.Address.destroy({
  //     where: {
  //       id: EmergencyAddressId,
  //     },
  //     individualHooks: true,
  //     userId: req.user?.id,
  //   });
  // }
  // // console.log(typeof patientParsed.is_credit);
  // if (
  //   ExistingEmergencyContact.address_id === ExistingPatient.address_id &&
  //   emergencyParsed.the_same_address_as_patient
  // ) {
  //   // console.log("from the same address to the same");
  //   await db.Address.update(
  //     {
  //       phone_1: patientParsed.phone,
  //       phone_2: null,
  //       street: patientParsed.street,
  //       house_number: patientParsed.house_number
  //         ? patientParsed.house_number
  //         : null,
  //       email: patientParsed.email ? patientParsed.email : null,
  //       woreda_id: patientParsed.woreda_id,
  //     },
  //     {
  //       where: {
  //         id: ExistingPatient.address_id,
  //       },
  //       individualHooks: true,
  //       userId: req.user?.id,
  //     }
  //   );
  // }
  // if (
  //   ExistingEmergencyContact.address_id !== ExistingPatient.address_id &&
  //   !emergencyParsed.the_same_address_as_patient
  // ) {
  //   // console.log("from different address to different");
  //   await db.Address.update(
  //     {
  //       phone_1: patientParsed.phone,

  //       phone_2: null,
  //       street: patientParsed.street,
  //       house_number: patientParsed.house_number
  //         ? patientParsed.house_number
  //         : null,
  //       email: patientParsed.email ? patientParsed.email : null,
  //       woreda_id: patientParsed.woreda_id,
  //     },
  //     {
  //       where: {
  //         id: ExistingPatient.address_id,
  //       },
  //       individualHooks: true,
  //       userId: req.user?.id,
  //     }
  //   );
  //   await db.Address.update(
  //     {
  //       phone_1: emergencyParsed.phone,
  //       phone_2: null,
  //       street: emergencyParsed.street,
  //       house_number: emergencyParsed.house_number
  //         ? emergencyParsed.house_number
  //         : null,
  //       email: emergencyParsed.email ? emergencyParsed.email : null,
  //       woreda_id: emergencyParsed.woreda_id,
  //     },
  //     {
  //       where: {
  //         id: ExistingEmergencyContact.address_id,
  //       },
  //       individualHooks: true,
  //       userId: req.user?.id,
  //     }
  //   );
  // }

  // ExistingEmergencyContact.firstName = emergencyParsed.firstName;
  // ExistingEmergencyContact.middleName = emergencyParsed.middleName;
  // ExistingEmergencyContact.lastName = emergencyParsed.lastName;
  // ExistingEmergencyContact.phone = emergencyParsed.phone;
  // ExistingEmergencyContact.relationship =
  //   emergencyParsed.relation !== "Other"
  //     ? emergencyParsed.relation
  //     : emergencyParsed.other_relation;

  // await ExistingEmergencyContact.save({ userId: req.user?.id });

  // ExistingPatient.firstName = patientParsed.firstName;
  // ExistingPatient.middleName = patientParsed.middleName;
  // ExistingPatient.lastName = patientParsed.lastName;
  // ExistingPatient.gender = patientParsed.gender;
  // ExistingPatient.has_phone = patientParsed.has_phone;
  // ExistingPatient.phone = patientParsed.phone;

  // ExistingPatient.birth_date = patientParsed.birth_date;
  // ExistingPatient.is_credit = patientParsed.is_credit;
  // ExistingPatient.is_new = patientParsed.is_new;
  // ExistingPatient.manual_card_id = !patientParsed.is_new
  //   ? patientParsed.manual_card_id
  //   : "";
  // ExistingPatient.marital_status = patientParsed.marital_status;
  // ExistingPatient.guardian_name = patientParsed.guardian_name;
  // ExistingPatient.guardian_relationship = patientParsed.guardian_relationship;
  // ExistingPatient.blood_type = patientParsed.blood_type;
  // ExistingPatient.nationality = patientParsed.nationality;
  // ExistingPatient.occupation = patientParsed.occupation;
  // // ExistingPatient.empoyeeId_url = req.files["empoyeeId_doc"]
  // //   ? "uploads/" + req.files["empoyeeId_doc"][0].filename
  // // : ExistingPatient.empoyeeId_url;
  // ExistingPatient.company_id = patientParsed.is_credit ? company_id : null;

  // await ExistingPatient.save({ userId: req.user?.id });

  res.status(200).json({
    status: "success",
    message: "Patient updated successfully",
    data: {
      patient,
    },
  });
});
export const updateHivStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  // console.log(status);
  // return;
  const patient = await db.Patient.findByPk(req.params.id);
  if (!patient) {
    res.status(400);
    throw new Error("Patient doesn't exist");
  }

  patient.has_HIV = status;
  await patient.save({ userId: req.user?.id });
  res.json({ message: "Patient HIV status updated successfully" });
});
export const updateDisablity = asyncHandler(async (req, res) => {
  const { disability } = req.body;
  // console.log(status);
  // return;

  const patient = await db.Patient.findByPk(req.params.id);
  if (!patient) {
    res.status(400);
    throw new Error("Patient doesn't exist");
  }
  patient.disability = disability;
  await patient.save({ userId: req.user?.id });
  res.json({ message: "Patient disablity updated successfully" });
});
export const activatePatient = asyncHandler(async (req, res) => {
  const patientId = parseInt(req.params.id);
  const patient = await patientService.activatePatient(patientId);

  res.json({
    status: "success",
    message: "Patient activated successfully",
    data: {
      patient,
    },
  });
});
export const deactivatePatient = asyncHandler(async (req, res) => {
  const patientId = parseInt(req.params.id);
  const patient = await patientService.deactivatePatient(patientId);

  res.json({
    status: "success",
    message: "Patient deactivated successfully",
    data: {
      patient,
    },
  });
});
// deletePatient: expressAsyncHandler(async (req, res) => {});
export const addPatientAllergy = asyncHandler<{
  validatedData: createAllergyInput;
}>(async (req, res) => {
  // const { severity, allergy_type, reaction_details } = req.body;
  const patientId = parseInt(req.params.id);
  const userId = req.user?.id!;
  const allergy = await patientService.createAllergy(
    patientId,
    req.validatedData,
    userId
  );
  // const patient = await db.Patient.findByPk(req.params.id);
  // if (!patient) {
  //   res.status(400);
  //   throw new Error("Patient doesn't exist");
  // }
  // await db.Allergy.create(
  //   {
  //     patient_id: patient.id,
  //     severity: severity,
  //     allergy_type: allergy_type,
  //     reaction_details: reaction_details,
  //     created_by: req.user?.id,
  //   },
  //   { userId: req.user?.id }
  // );
  res.status(201).json({
    status: "success",
    message: "Patient allergies added successfully",
    data: {
      allergy,
    },
  });
});
export const addPatientFamilyHistory = asyncHandler<{
  validatedData: createFamilyHistoryInput;
}>(async (req, res) => {
  // const { medical_condition, relationship } = req.body;
  const patientId = parseInt(req.params.id);
  const userId = req.user?.id!;
  const familyHistory = await patientService.createFamilyHistory(
    patientId,
    req.validatedData,
    userId
  );
  // const patient = await db.Patient.findByPk(req.params.id);
  // if (!patient) {
  //   res.status(400);
  //   throw new Error("Patient doesn't exist");
  // }
  // await db.FamilyHistory.create(
  //   {
  //     patient_id: patient.id,
  //     medical_condition: medical_condition,
  //     relationship: relationship,
  //     created_by: req.user?.id,
  //   },
  //   { userId: req.user?.id }
  // );
  // patient.family_history = req.body.family_history;
  // await patient.save();
  res.status(201).json({
    status: "success",
    message: "Patient family history added successfully",
    data: {
      familyHistory,
    },
  });
});
export const updateFamilyhistory = asyncHandler(async (req, res) => {
  // const { medical_condition, relationship } = req.body;
  // const { id } = req.params;
  const familyHistoryId = parseInt(req.params.id);
  const userId = req.user?.id!;
  const familyHistory = await patientService.updateFamilyHistory(
    familyHistoryId,
    req.validatedData
  );
  //  await db.FamilyHistory.findByPk(req.params.id);
  // if (!familyHistory) {
  //   res.status(400);
  //   throw new Error("Family History doesn't exist");
  // }
  // await familyHistory.update(
  //   {
  //     medical_condition: medical_condition,
  //     relationship: relationship,
  //   },
  //   { userId: req.user?.id }
  // );
  // patient.family_history = req.body.family_history;
  // await patient.save();
  res.status(200).json({
    status: "success",
    message: "Patient family history updated successfully",
    data: {
      familyHistory,
    },
  });
});
export const deleteFamilyHistory = asyncHandler(async (req, res) => {
  const familyHistoryId = parseInt(req.params.id);
  await patientService.deleteFamilyHistory(familyHistoryId);
  // const familyHistory = await db.FamilyHistory.findByPk(req.params.id);
  // if (!familyHistory) {
  //   res.status(400);
  //   throw new Error("Family History doesn't exist");
  // }
  // await familyHistory.destroy({ userId: req.user?.id });
  // patient.family_history = req.body.family_history;
  // await patient.save();
  res.status(202).json({
    status: "success",
    message: "Patient family history deleted successfully",
    data: null,
  });
});

export const addPatientSocialHistory = asyncHandler<{
  validatedData: createSocialHistoryInput;
}>(async (req, res) => {
  // const { tobacco_use, alcohol_use } = req.body;
  const patientId = parseInt(req.params.id);
  const userId = req.user?.id!;
  const socialHistory = await patientService.createsocialHistory(
    patientId,
    req.validatedData,
    userId
  );
  // db.Patient.findByPk(req.params.id);
  // console.log(req.body);
  // return;
  // if (!patient) {
  //   res.status(400);
  //   throw new Error("Patient doesn't exist");
  // }
  // await db.SocialHistory.create(
  //   {
  //     patient_id: patient.id,
  //     tobacco_use: tobacco_use,
  //     alcohol_use: alcohol_use,
  //     created_by: req.user?.id,
  //   },
  //   { userId: req.user?.id }
  // );
  // patient.social_history = req.body.social_history;
  // await patient.save();
  res.status(201).json({
    status: "success",
    message: "Patient social history added successfully",
    data: {
      socialHistory,
    },
  });
});
export const updateSocialHistory = asyncHandler(async (req, res) => {
  // const { tobacco_use, alcohol_use } = req.body;
  // const { id } = req.params;
  const socialHistoryId = parseInt(req.params.id);
  const socialHistory = await patientService.updatesocialHistory(
    socialHistoryId,
    req.validatedData
  );
  // const socialHistory = await db.SocialHistory.findByPk(req.params.id);
  // if (!socialHistory) {
  //   res.status(400);
  //   throw new Error("Social History doesn't exist");
  // }
  // await socialHistory.update(
  //   {
  //     tobacco_use: tobacco_use,
  //     alcohol_use: alcohol_use,
  //   },
  //   { userId: req.user?.id }
  // );
  // patient.social_history = req.body.social_history;
  // await patient.save();
  res.status(200).json({
    status: "success",
    message: "Patient social history updated successfully",
    data: {
      socialHistory,
    },
  });
});
export const deleteSocialHistory = asyncHandler(async (req, res) => {
  const socialHistoryId = parseInt(req.params.id);
  await patientService.deletesocialHistory(socialHistoryId);
  // db.SocialHistory.findByPk(req.params.id);
  // if (!socialHistory) {
  //   res.status(400);
  //   throw new Error("Social History doesn't exist");
  // }
  // await socialHistory.destroy({ userId: req.user?.id });
  // patient.social_history = req.body.social_history;
  // await patient.save();
  res.status(200).json({
    status: "success",
    message: "Patient social history deleted successfully",
    data: null,
  });
});

export const addPatientPastMedicalHistory = asyncHandler<{
  validatedData: createPastMedicalHistoryInput;
}>(async (req, res) => {
  // const { medical_condition, treatment } = req.body;
  const patientId = parseInt(req.params.id);
  const userId = req.user?.id!;
  const pastMedicalHistory = await patientService.createPastMedicalHistory(
    patientId,
    req.validatedData,
    userId
  );
  // const patient = await db.Patient.findByPk(req.params.id);
  // if (!patient) {
  //   res.status(400);
  //   throw new Error("Patient doesn't exist");
  // }
  // await db.PastMedicalHistory.create({
  //   patient_id: patient.id,
  //   medical_condition,
  //   treatment,
  //   created_by: req.user?.id,
  // });
  res.status(201).json({
    status: "success",
    message: "Patient past medical history added successfully",
    data: {
      pastMedicalHistory,
    },
  });
});
