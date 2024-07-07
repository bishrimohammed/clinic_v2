const asyncHandler = require("express-async-handler");
// const db = require("../models");
const { Op } = require("sequelize");
const db = require("../models");

module.exports.AppointementController = {
  getAppointments: asyncHandler(async (req, res) => {
    const {} = req.query;
    let where = {};
    if (req.query.status) {
      where.status = req.query.status;
    }
    const appointments = await db.Appointment.findAll({
      where: where,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.Patient,
          as: "patient",
          attributes: ["firstName", "middleName", "lastName", "id"],
        },
        {
          model: db.User,
          as: "doctor",
          include: [
            {
              model: db.Employee,
              as: "employee",
              attributes: ["firstName", "middleName", "lastName", "id"],
            },
          ],
          attributes: ["id"],
        },
      ],
    });
    res.json(appointments);
  }),
  getAppointment: asyncHandler(async (req, res) => {
    const { id } = req.params;
    res.json({
      message: "Hello from AppointementController.getAppointment",
    });
  }),
  createAppointment: asyncHandler(async (req, res) => {
    const { patient_id, doctor_id, reason, date, time, patient_name, type } =
      req.body;
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    console.log(req.body);
    const Weekdate = new Date(date).getDay();
    // console.log(Weekdate);
    // console.log(daysOfWeek[Weekdate]);
    const doctor = await db.Schedule.findOne({
      where: {
        day_of_week: daysOfWeek[Weekdate],
        doctor_id: parseInt(doctor_id),
        // appointment_date: this.appointment_date,
        // appointment_time: this.appointment_time,
        [Op.and]: [
          {
            start_time: { [Op.lte]: time },
            end_time: { [Op.gte]: time },
          },
        ],
      },
    });

    if (!doctor) {
      res.status(400);
      throw new Error("Doctor is not available at this time");
    }
    const appointment = await db.Appointment.create(
      {
        patient_id: patient_id ? patient_id : null,
        doctor_id,
        reason,
        appointment_date: date,
        appointment_time: time,
        patient_name,
        appointment_type: type,
      },
      { userId: req.user.id }
    );
    res.status(201).json(appointment);
  }),
  updateAppointment: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { patient_id, doctor_id, reason, date, time, patient_name, type } =
      req.body;
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const Weekdate = new Date(date).getDay();
    // console.log(Weekdate);
    // console.log(daysOfWeek[Weekdate]);
    const doctor = await db.Schedule.findOne({
      where: {
        day_of_week: daysOfWeek[Weekdate],
        doctor_id: doctor_id,
        // appointment_date: this.appointment_date,
        // appointment_time: this.appointment_time,
        [Op.and]: [
          {
            start_time: { [Op.lte]: time },
            end_time: { [Op.gte]: time },
          },
        ],
      },
    });

    if (!doctor) {
      res.status(400);
      throw new Error("Doctor is not available at this time");
    }
    console.log(req.body);
    const appointment = await db.Appointment.findByPk(id);
    if (!appointment) {
      res.status(404);
      throw new Error("Appointment not found");
    }
    appointment.patient_id = patient_id ? patient_id : null;
    appointment.patient_name = patient_name;
    appointment.appointment_date = date;
    appointment.appointment_time = time;
    appointment.appointment_type = type;
    appointment.reason = reason;
    appointment.doctor_id = doctor_id;
    await appointment.save({ userId: req.user.id });
    res.json({ msg: " Appointment Updated successfully" });
  }),
  cancelAppointment: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const appointment = await db.Appointment.findByPk(id);
    if (!appointment) {
      res.status(404);
      throw new Error("Appointment not found");
    }
    // console.log(appointment);
    appointment.status = "cancelled";
    await appointment.save({ userId: req.user.id });
    res.json({ msg: "Appointment cancelled" });
  }),
  deleteAppointment: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const appointment = await db.Appointment.findByPk(id);
    if (!appointment) {
      res.status(404);
      throw new Error("Appointment not found");
    }
    await appointment.destroy({ userId: req.user.id });
    res.json({ msg: "Appointment deleted" });
  }),
};
