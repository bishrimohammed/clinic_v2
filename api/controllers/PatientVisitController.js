const asyncHandler = require("express-async-handler");
const db = require("../models");
const { differenceInDays, format } = require("date-fns");
const getClinicInformation = require("../helpers/getClinicInformation");
const { Op } = require("sequelize");

module.exports = PatientVisitController = {
  getPatientVisits: asyncHandler(async (req, res) => {
    let where = {};
    if (req.query.status) {
      if (req.query.status === "false") {
        where.status = false;
      } else if (req.query.status === "true") {
        where.status = true;
      }
    }
    if (req.query.stage) {
      where.stage = req.query.stage;
    }
    if (req.query.visitType) {
      where.visit_type = req.query.visitType;
    }
    console.log(where);
    const visits = await db.PatientAssignment.findAll({
      where: where,
      include: [
        {
          model: db.Patient,
          as: "patient",
          attributes: ["id", "firstName", "lastName", "middleName"],
        },
        {
          model: db.User,
          as: "doctor",
          include: {
            model: db.Employee,
            as: "employee",
            attributes: ["id", "firstName", "middleName", "lastName"],
          },
          attributes: ["id"],
        },
      ],
    });
    res.json(visits);
  }),
  getPatientVisit: asyncHandler(async (req, res) => {}),
  createPatientVisit: asyncHandler(async (req, res) => {
    const { patient_id, doctor_id, date, reason, type } = req.body;
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
      } else if (clinic.has_triage) {
        stage = "Waiting for triage";
      } else {
        stage = "Waiting for examiner";
      }
    } else {
      stage = "Waiting for service fee";
    }
    const medicalRecord = await db.MedicalRecord.create({
      patient_id,
    });
    if (!medicalRecord) {
      res.status(400);
      throw new Error("medical record not created");
    }
    const patientVisit = await db.PatientAssignment.create({
      patient_id,
      doctor_id,
      assignment_date: date,
      visit_time: new Date(date).toISOString().substring(11, 16),
      visit_type: type,
      reason,
      medicalRecord_id: medicalRecord.id,
      stage: stage,
      created_by: req?.user?.id,
    });
    res.status(201).json(patientVisit);
  }),
  updatePatientVisit: asyncHandler(async (req, res) => {}),
  deletePatientVisit: asyncHandler(async (req, res) => {}),
  getUpcomingPatientVisits: asyncHandler(async (req, res) => {
    let where = {};
    if (req.query.status) {
      if (req.query.status === "false") {
        where.status = false;
      } else if (req.query.status === "true") {
        where.status = true;
      }
    }
    if (req.query.stage) {
      where.stage = req.query.stage;
    }
    if (req.query.visitType) {
      where.visit_type = req.query.visitType;
    }
    // const today = (where.assignment_date = {
    //   [Op.gte]: new Date().toISOString().substring(0, 10),
    // });
    // where.visit_time = { [Op.gte]: format(new Date(), "HH:mm:ss") };
    // console.log(where);
    const visits = await db.PatientAssignment.findAll({
      where: {
        ...where,
        [Op.or]: [
          {
            assignment_date: new Date().toISOString().substring(0, 10),
            visit_time: {
              [Op.gte]: format(new Date(), "HH:mm:ss"),
            },
          },
          {
            assignment_date: {
              [Op.gt]: new Date().toISOString().substring(0, 10),
            },
          },
        ],
      },
      // where: where,
      include: [
        {
          model: db.Patient,
          as: "patient",
          attributes: [
            "id",
            "firstName",
            "lastName",
            "middleName",
            "card_number",
            "birth_date",
            "gender",
          ],
        },
        {
          model: db.User,
          as: "doctor",
          include: {
            model: db.Employee,
            as: "employee",
            attributes: ["id", "firstName", "middleName", "lastName"],
          },
          attributes: ["id"],
        },
      ],
    });
    res.json(visits);
  }),
  getPatientVisitByDoctorId: asyncHandler(async (req, res) => {}),
  transferPatientVisitToOtherDoctor: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const visit = await db.PatientAssignment.findByPk(id);
    const { doctor_id } = req.body;
    if (!visit) {
      res.status(404);
      throw new Error("Patient visit not found");
    }
    visit.doctor_id = doctor_id;
    visit.created_by = req.user.id;
    await visit.save();
    res.json(visit);
  }),
  cancelPatientAssignment: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const visit = await db.PatientAssignment.findByPk(id);
    if (!visit) {
      res.status(404);
      throw new Error("Patient visit not found");
    }
    visit.status = false;
    await visit.save();
    res.json(visit);
  }),
  startTraige: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const visit = await db.PatientAssignment.findByPk(id);
    if (!visit) {
      res.status(404);
      throw new Error("Patient visit not found");
    }
    visit.stage = "Performing triage";
    await visit.save();
    res.json(visit);
  }),
  finishTraige: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const visit = await db.PatientAssignment.findByPk(id);
    if (!visit) {
      res.status(404);
      throw new Error("Patient visit not found");
    }
    visit.stage = "Waiting for examiner";
    await visit.save();
    res.json(visit);
  }),
};
