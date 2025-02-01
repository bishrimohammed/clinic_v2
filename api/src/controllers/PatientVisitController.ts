import { visitService } from "../services";
import { patientVisitQueryType } from "../types/visit";
import asyncHandler from "../utils/asyncHandler";

// const asyncHandler = require("express-async-handler");
const db = require("../models");
const { differenceInDays, format } = require("date-fns");
const getClinicInformation = require("../helpers/getClinicInformation");
const { Op } = require("sequelize");

export const getPatientVisits = asyncHandler(async (req, res) => {
  const query = req.query as patientVisitQueryType;
  const userId = req.user?.id!;
  const visitResults = await visitService.getVisits(query, userId);
  res.status(200).json({
    status: "success",
    data: {
      visits: visitResults.visits,
      pagination: visitResults.pagination,
    },
  });
});
export const getActivePatientVisits = asyncHandler(async (req, res) => {
  const query = req.query as patientVisitQueryType;
  const userId = req.user?.id!;

  const visitResults = await visitService.getActiveVisits(query, userId);
  res.status(200).json({
    status: "success",
    data: {
      visits: visitResults.visits,
      pagination: visitResults.pagination,
    },
  });
});
export const getPatientVisitById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const visitId = parseInt(id, 10);
  const visit = await visitService.getPatientVisitById(visitId);
  res.json({
    status: "success",
    data: {
      visit: visit,
    },
  });
});
export const getUpcomingPatientVisitByDoctorId = asyncHandler(
  async (req, res) => {
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 10;
    // let where = {};
    // let sortDirection;
    // if (req.query.status) {
    //   if (req.query.status === "false") {
    //     where.status = false;
    //   } else if (req.query.status === "true") {
    //     where.status = true;
    //   }
    // }
    // if (req.query.stage) {
    //   where.stage = req.query.stage;
    // }
    // if (req.query.visitType) {
    //   where.visit_type = req.query.visitType;
    // }
    // switch (req.query?.sortBy) {
    //   case "patient_name":
    //     if (req.query?.order === "asc") {
    //       sortDirection = [
    //         ["patient", "firstName", "ASC"],
    //         ["patient", "lastName", "ASC"],
    //         ["patient", "middleName", "ASC"],
    //       ];
    //     } else {
    //       sortDirection = [
    //         ["patient", "firstName", "DESC"],
    //         ["patient", "lastName", "DESC"],
    //         ["patient", "middleName", "DESC"],
    //       ];
    //     }
    //     break;
    //   case "visit_date":
    //     if (req.query?.order === "asc") {
    //       sortDirection = [["assignment_date", "ASC"]];
    //     } else {
    //       sortDirection = [["assignment_date", "DESC"]];
    //     }
    //     break;
    //   case "visit_type":
    //     if (req.query?.order === "asc") {
    //       sortDirection = [["visit_type", "ASC"]];
    //     } else {
    //       sortDirection = [["visit_type", "DESC"]];
    //     }
    //     break;
    //   // case "registation_date":
    //   //   if (req.query?.order === "asc") {
    //   //     sortDirection = [["createdAt", "ASC"]];
    //   //   } else {
    //   //     sortDirection = [["createdAt", "DESC"]];
    //   //   }
    //   //   break;
    //   default:
    //     sortDirection = [["visit_type", "DESC"]];
    // }
    // const { count, rows } = await db.PatientAssignment.findAndCountAll({
    //   where: {
    //     ...where,
    //     status: true,
    //     doctor_id: req.user.id,
    //     // [Op.or]: [
    //     //   {
    //     //     assignment_date: new Date().toISOString().substring(0, 10),
    //     //     visit_time: {
    //     //       [Op.gte]: format(new Date(), "HH:mm:ss"),
    //     //     },
    //     //   },
    //     //   {
    //     //     assignment_date: {
    //     //       [Op.gt]: new Date().toISOString().substring(0, 10),
    //     //     },
    //     //   },
    //     // ],
    //   },
    //   include: [
    //     {
    //       model: db.Patient,
    //       as: "patient",
    //       attributes: [
    //         "id",
    //         "firstName",
    //         "lastName",
    //         "middleName",
    //         "card_number",
    //         "birth_date",
    //         "gender",
    //         "patient_type",
    //       ],
    //     },
    //     {
    //       model: db.User,
    //       as: "doctor",
    //       include: {
    //         model: db.Employee,
    //         as: "employee",
    //         attributes: ["id", "firstName", "middleName", "lastName"],
    //       },
    //       attributes: ["id"],
    //     },
    //   ],
    //   order: sortDirection,
    //   offset: (page - 1) * limit,
    //   limit: limit,
    // });
    // const hasMore = count > page * limit;
    // res.status(200).json({
    //   visits: rows,
    //   currentPage: parseInt(page),
    //   totalPages: Math.ceil(count / limit),
    //   totalItems: count,
    //   hasMore: hasMore,
    // });
  }
);
export const getPreviousPatientVisitByDoctorId = asyncHandler(
  async (req, res) => {
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 10;
    // let where = {};
    // let sortDirection;
    // if (req.query.status) {
    //   if (req.query.status === "false") {
    //     where.status = false;
    //   } else if (req.query.status === "true") {
    //     where.status = true;
    //   }
    // }
    // if (req.query.stage) {
    //   where.stage = req.query.stage;
    // }
    // if (req.query.visitType) {
    //   where.visit_type = req.query.visitType;
    // }
    // // console.log(where);
    // switch (req.query?.sortBy) {
    //   case "patient_name":
    //     if (req.query?.order === "asc") {
    //       sortDirection = [
    //         ["patient", "firstName", "ASC"],
    //         ["patient", "lastName", "ASC"],
    //         ["patient", "middleName", "ASC"],
    //       ];
    //     } else {
    //       sortDirection = [
    //         ["patient", "firstName", "DESC"],
    //         ["patient", "lastName", "DESC"],
    //         ["patient", "middleName", "DESC"],
    //       ];
    //     }
    //     break;
    //   case "visit_date":
    //     if (req.query?.order === "asc") {
    //       sortDirection = [["assignment_date", "ASC"]];
    //     } else {
    //       sortDirection = [["assignment_date", "DESC"]];
    //     }
    //     break;
    //   case "visit_type":
    //     if (req.query?.order === "asc") {
    //       sortDirection = [["visit_type", "ASC"]];
    //     } else {
    //       sortDirection = [["visit_type", "DESC"]];
    //     }
    //     break;
    //   // case "registation_date":
    //   //   if (req.query?.order === "asc") {
    //   //     sortDirection = [["createdAt", "ASC"]];
    //   //   } else {
    //   //     sortDirection = [["createdAt", "DESC"]];
    //   //   }
    //   //   break;
    //   default:
    //     sortDirection = [["assignment_date", "DESC"]];
    // }
    // const { count, rows } = await db.PatientAssignment.findAndCountAll({
    //   where: { ...where, doctor_id: req.user.id },
    //   // order: [["createdAt", "DESC"]],
    //   include: [
    //     {
    //       model: db.Patient,
    //       as: "patient",
    //       attributes: [
    //         "id",
    //         "firstName",
    //         "lastName",
    //         "middleName",
    //         "card_number",
    //         "patient_type",
    //       ],
    //     },
    //     {
    //       model: db.User,
    //       as: "doctor",
    //       include: {
    //         model: db.Employee,
    //         as: "employee",
    //         attributes: ["id", "firstName", "middleName", "lastName"],
    //       },
    //       attributes: ["id"],
    //     },
    //   ],
    //   // order: [["assignment_date", "DESC"]],
    //   order: sortDirection,
    //   offset: (page - 1) * limit,
    //   limit: limit,
    // });
    // const hasMore = count > page * limit;
    // res.status(200).json({
    //   visits: rows,
    //   currentPage: parseInt(page),
    //   totalPages: Math.ceil(count / limit),
    //   totalItems: count,
    //   hasMore: hasMore,
    // });
  }
);
export const createPatientVisit = asyncHandler(async (req, res) => {
  const { patient_id, doctor_id, date, reason, type, mode_of_arrival } =
    req.body;
  // console.log(req.body);
  // console.log(req.user);
  const lastMedicalRecord = await db.MedicalRecord.findAll({
    where: {
      patient_id,
    },
    order: [["id", "DESC"]],
    limit: 1,
  });

  const clinic = await getClinicInformation(4);

  let stage;

  if (lastMedicalRecord.length > 0) {
    if (
      differenceInDays(new Date(lastMedicalRecord.updatedAt), new Date()) >
      clinic.card_valid_date
    ) {
      stage = "Waiting for service fee";
    } else if (
      clinic.has_triage ||
      String(type).toLowerCase() === "emergency"
    ) {
      stage = "Waiting for triage";
    } else {
      stage = "Waiting for examiner";
    }
  } else {
    stage = "Waiting for service fee";
  }
  if (String(type).toLowerCase() === "emergency") {
    stage = "Waiting for triage";
  }
  const medicalRecord = await db.MedicalRecord.create(
    {
      patient_id,
    },
    { userId: req.user?.id }
  );
  if (!medicalRecord) {
    res.status(400);
    throw new Error("medical record not created");
  }
  const patientVisit = await db.PatientAssignment.create(
    {
      patient_id,
      doctor_id,
      assignment_date: date,
      visit_time: date.substring(11, 16),
      visit_type: type,
      mode_of_arrival: type === "Emergency" ? mode_of_arrival : null,
      reason,
      medicalRecord_id: medicalRecord.id,
      stage: stage,
      created_by: req?.user?.id,
    },
    { userId: req?.user?.id }
  );

  if (
    stage === "Waiting for service fee" ||
    String(type).toLowerCase() === "emergency"
  ) {
    const medicalBilling = await db.MedicalBilling.create(
      {
        medical_record_id: medicalRecord.id,
        patient_id,
        visit_id: patientVisit.id,
      },
      { userId: req?.user?.id }
    );
    if (!medicalBilling) {
      res.status(500);
      throw new Error("unable to create MedicalBilling");
    }
    const payment = await db.Payment.create(
      {
        medical_billing_id: medicalBilling.id,
        item_id: 1,
      },
      { userId: req?.user?.id }
    );
  }
  res.status(201).json(patientVisit);
});
// updatePatientVisit= asyncHandler(async (req, res) => {}),
// deletePatientVisit; asyncHandler(async (req, res) => {}),
export const getUpcomingPatientvisits = asyncHandler(async (req, res) => {
  // const page = parseInt(req.query.page) || 1;
  // const limit = parseInt(req.query.limit) || 10;
  // let where = {};
  // let sortDirection;
  // if (req.query.status) {
  //   if (req.query.status === "false") {
  //     where.status = false;
  //   } else if (req.query.status === "true") {
  //     where.status = true;
  //   }
  // }
  // if (req.query.stage) {
  //   where.stage = req.query.stage;
  // }
  // if (req.query.visitType) {
  //   where.visit_type = req.query.visitType;
  // }
  // // const today = (where.assignment_date = {
  // //   [Op.gte]: new Date().toISOString().substring(0, 10),
  // // });
  // // where.visit_time = { [Op.gte]: format(new Date(), "HH:mm:ss") };
  // // console.log(where);
  // switch (req.query?.sortBy) {
  //   case "patient_name":
  //     if (req.query?.order === "asc") {
  //       sortDirection = [
  //         ["patient", "firstName", "ASC"],
  //         ["patient", "lastName", "ASC"],
  //         ["patient", "middleName", "ASC"],
  //       ];
  //     } else {
  //       sortDirection = [
  //         ["patient", "firstName", "DESC"],
  //         ["patient", "lastName", "DESC"],
  //         ["patient", "middleName", "DESC"],
  //       ];
  //     }
  //     break;
  //   case "visit_date":
  //     if (req.query?.order === "asc") {
  //       sortDirection = [["assignment_date", "ASC"]];
  //     } else {
  //       sortDirection = [["assignment_date", "DESC"]];
  //     }
  //     break;
  //   case "visit_type":
  //     if (req.query?.order === "asc") {
  //       sortDirection = [["visit_type", "ASC"]];
  //     } else {
  //       sortDirection = [["visit_type", "DESC"]];
  //     }
  //     break;
  //   // case "registation_date":
  //   //   if (req.query?.order === "asc") {
  //   //     sortDirection = [["createdAt", "ASC"]];
  //   //   } else {
  //   //     sortDirection = [["createdAt", "DESC"]];
  //   //   }
  //   //   break;
  //   default:
  //     sortDirection = [["visit_type", "DESC"]];
  // }
  // const { count, rows } = await db.PatientAssignment.findAndCountAll({
  //   where: {
  //     ...where,
  //     status: true,
  //     // [Op.or]: [
  //     //   {
  //     //     assignment_date: new Date().toISOString().substring(0, 10),
  //     //     visit_time: {
  //     //       [Op.gte]: format(new Date(), "HH:mm:ss"),
  //     //     },
  //     //   },
  //     //   {
  //     //     assignment_date: {
  //     //       [Op.gt]: new Date().toISOString().substring(0, 10),
  //     //     },
  //     //   },
  //     // ],
  //   },
  //   // where: where,
  //   include: [
  //     {
  //       model: db.Patient,
  //       as: "patient",
  //       attributes: [
  //         "id",
  //         "firstName",
  //         "lastName",
  //         "middleName",
  //         "card_number",
  //         "birth_date",
  //         "gender",
  //         "patient_type",
  //       ],
  //     },
  //     {
  //       model: db.User,
  //       as: "doctor",
  //       include: {
  //         model: db.Employee,
  //         as: "employee",
  //         attributes: ["id", "firstName", "middleName", "lastName"],
  //       },
  //       attributes: ["id"],
  //     },
  //   ],
  //   order: sortDirection,
  //   offset: (page - 1) * limit,
  //   limit: limit,
  // });
  // const hasMore = count > page * limit;
  // // console.log(patients);
  // res.status(200).json({
  //   visits: rows,
  //   currentPage: parseInt(page),
  //   totalPages: Math.ceil(count / limit),
  //   totalItems: count,
  //   hasMore: hasMore,
  // });
});
// getPatientVisitByDoctorId: asyncHandler(async (req, res) => {}),
export const transferPatientVisitToOtherDoctor = asyncHandler(
  async (req, res) => {
    // const { id } = req.params;
    // const visit = await db.PatientAssignment.findByPk(id);
    // const { doctor_id } = req.body;
    // if (!visit) {
    //   res.status(404);
    //   throw new Error("Patient visit not found");
    // }
    // visit.doctor_id = doctor_id;
    // visit.created_by = req.user.id;
    // await visit.save();
    // res.json(visit);
  }
);
export const cancelPatientAssignment = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  // const visit = await db.PatientAssignment.findByPk(id);
  // if (!visit) {
  //   res.status(404);
  //   throw new Error("Patient visit not found");
  // }
  // visit.status = false;
  // await visit.save({ userId: req.user.id });
  // res.json(visit);
});
export const startTraige = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const visit = await db.PatientAssignment.findByPk(id);
  if (!visit) {
    res.status(404);
    throw new Error("Patient visit not found");
  }
  visit.stage = "Performing triage";
  await visit.save({ userId: req.user?.id });
  res.json(visit);
});
export const finishTraige = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const visit = await db.PatientAssignment.findByPk(id);
  if (!visit) {
    res.status(404);
    throw new Error("Patient visit not found");
  }
  visit.stage = "Waiting for examiner";
  await visit.save({ userId: req.user?.id });
  res.json(visit);
});
export const admitVisit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const visit = await db.PatientAssignment.findByPk(id);
  if (!visit) {
    res.status(404);
    throw new Error("Patient visit not found");
  }
  await db.Patient.update(
    {
      patient_type: "inpatient",
    },
    {
      where: {
        id: visit.patient_id,
      },
      userId: req.user?.id,
    }
  );
  visit.stage = "Admitted";
  visit.isAdmitted = true;
  visit.admission_date = Date.now();
  await visit.save({ userId: req.user?.id });
  res.json(visit);
});
export const dischargeVisit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const visit = await db.PatientAssignment.findByPk(id);
  if (!visit) {
    res.status(404);
    throw new Error("Patient visit not found");
  }
  await db.Patient.update(
    {
      patient_type: "outpatient",
    },
    {
      where: {
        id: visit.patient_id,
      },
      userId: req.user?.id,
    }
  );
  visit.stage = "Discharged";
  visit.isDischarged = true;
  visit.discharge_date = Date.now();
  await visit.save({ userId: req.user?.id });
  res.json(visit);
});
