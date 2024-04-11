const asyncHandler = require("express-async-handler");
const db = require("../models");
const { Op } = require("sequelize");
const { startOfDay, endOfDay } = require("date-fns");
module.exports = PatientAssignmaentController = {
  getPatientAssignmentById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    db.PatientAssignment.findByPk({ _id: id }).then((patient) => {
      res.status(200).json(patient);
    });
  }),
  getAllPatientAssignments: asyncHandler(async (req, res) => {
    db.PatientAssignment.findAll({
      include: [
        {
          model: db.Patient,
          as: "patient",
          attributes: ["middleName", "firstName"],
          include: [
            {
              model: db.Address,
              as: "address",
              attributes: ["phone_1"],
            },
          ],
        },
        {
          model: db.VisitType,
          as: "visitType",
          attributes: ["name"],
        },
        {
          model: db.User,
          as: "doctor",
          attributes: ["firstName", "lastName"],
        },
      ],
    }).then((patient) => {
      res.status(200).json(patient);
    });
  }),
  createPatientAssignment: asyncHandler(async (req, res) => {
    const { doctor_id, patient_id, visit_type_id, reason, assignment_date } =
      req.body;
    // console.log(req.body);
    const startofdate = startOfDay(assignment_date);
    const endofdate = endOfDay(new Date(assignment_date));
    console.log(assignment_date);

    const alreadyAssigned = await db.PatientAssignment.findOne({
      where: {
        doctor_id: doctor_id,
        patient_id: patient_id,
        assignment_date: {
          [Op.gt]: startofdate,
          [Op.lt]: endofdate,
        },
      },
    });
    // console.log(alreadyAssigned);
    if (alreadyAssigned) {
      res.status(500);
      throw new Error("Already assignment with this doctor");
    }
    const medical_record = await db.MedicalRecord.create({
      patient_id: patient_id,
      status: true,
      // created_by: req.user.id,
    });
    const p_assign = await db.PatientAssignment.create({
      doctor_id,
      patient_id,
      reason,
      visitType_id: visit_type_id,
      assignment_date: new Date(assignment_date),
      medicalRecord_id: medical_record.id,
      created_by: req.user.id,
    });
    // console.log(p_assign);
    res.status(201).json(p_assign);
  }),
  deletePatientAssignment: asyncHandler(async (req, res) => {
    const { id } = req.params;
    Patientassignmaent.findByIdAndDelete({ _id: id }).then((patient) => {
      res.status(200).json(patient);
    });
  }),
  updatePatientAssignment: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { doctor_id, patient_id, reason } = req.body;
    Patientassignmaent.findByIdAndUpdate(
      { _id: id },
      {
        doctor_id,
        patient_id,
        reason,
      }
    ).then((patient) => {
      res.status(200).json(patient);
    });
  }),
};
