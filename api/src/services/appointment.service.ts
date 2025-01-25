import { Op } from "sequelize";
import { Appointment } from "../models";
import { appointmentQueryType } from "../types/appointment";

export const getAppointments = async (query: appointmentQueryType) => {
  const { searchTerm, sortBy, status } = query;

  const page = parseInt(query.page, 10) || 1;

  const limit = parseInt(query.limit, 10) || 10;

  const offset = (page - 1) * limit;

  const whereClause: any = {};

  const orderClause: any = [];

  if (status) {
    whereClause.status = status;
  }

  if (searchTerm) {
    whereClause[Op.or] = [
      { patient_name: { [Op.like]: `%${searchTerm}%` } },
      { appointment_type: { [Op.like]: `%${searchTerm}%` } },
      { status: { [Op.like]: `%${searchTerm}%` } },
    ];
  }

  switch (sortBy) {
    case "name_asc":
      orderClause.push(["patient_name", "ASC"]);
      break;
    case "name_desc":
      orderClause.push(["patient_name", "DESC"]);
      break;
    case "appointment_date_asc":
      orderClause.push(["appointment_date", "ASC"]);
      break;
    case "appointment_date_desc":
      orderClause.push(["appointment_date", "DESC"]);
      break;
    default:
      orderClause.push(["appointment_date", "ASC"]);
      break;
  }

  const { rows: appointements, count } = await Appointment.findAndCountAll({
    where: whereClause,
    order: orderClause,
    offset,
    limit,
  });

  const hasMore = count > page * limit;

  return { appointements, hasMore };
};

// const createAppointment = async (data, userId) => {
//   //   console.log("jdfgjdrhf");
//   const { patient_id, doctor_id, reason, date, time, patient_name, type } =
//     data;

//   const daysOfWeek = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];

//   const Weekdate = new Date(date).getDay();

//   const doctor = await db.Schedule.findOne({
//     where: {
//       day_of_week: daysOfWeek[Weekdate],
//       doctor_id: parseInt(doctor_id),
//       // appointment_date: this.appointment_date,
//       // appointment_time: this.appointment_time,
//       [Op.and]: [
//         {
//           start_time: { [Op.lte]: time },
//           end_time: { [Op.gte]: time },
//         },
//       ],
//     },
//   });

//   // if (!doctor) {
//   //   res.status(400);
//   //   throw new Error("Doctor is not available at this time");
//   // }
//   const appointment = await db.Appointment.create(
//     {
//       patient_id: patient_id ? patient_id : null,
//       doctor_id,
//       reason,
//       appointment_date: date,
//       appointment_time: time,
//       patient_name,
//       appointment_type: type,
//     },
//     { userId }
//   );

//   return appointment;
//   //   await db.Appointment.create()
// };
// const updateAppointment = async (id, data) => {
//   //   console.log(id);
//   //   console.log(data);
// };

// module.exports = {
//   createAppointment,
//   updateAppointment,
// };
