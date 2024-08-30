const { Op } = require("sequelize");
const db = require("../models");

const createAppointment = async (data, userId) => {
  //   console.log("jdfgjdrhf");
  const { patient_id, doctor_id, reason, date, time, patient_name, type } =
    data;
  //   console.log(data);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // console.log(req.body);
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
    { userId }
  );

  return appointment;
  //   await db.Appointment.create()
};
const updateAppointment = async (id, data) => {
  //   console.log(id);
  //   console.log(data);
};

module.exports = {
  createAppointment,
  updateAppointment,
};
