// const asyncHandler = require("express-async-handler");

import { Request } from "express";
import { appointmentService } from "../services";
import {
  appointmentQueryType,
  createAppointmentType,
} from "../types/appointment";
import asyncHandler from "../utils/asyncHandler";

// const db = require("../models");
const { Op } = require("sequelize");
const db = require("../models");

// module.exports.createappointment = (data) => {
//   const {} = data;
// };
// module.exports.AppointementController = {
export const getAppointments = asyncHandler(async (req, res) => {
  const query = req.query as appointmentQueryType;
  const appointementResults = await appointmentService.getAppointments(query);

  res.json({
    status: "success",
    message: "Appointments retrieved successfully",
    data: {
      appointments: appointementResults.appointements,
      pagination: appointementResults.pagination,
    },
  });
});
export const getAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;
});
export const getActiveAppointments = asyncHandler(async (req, res) => {
  const query = req.query as appointmentQueryType;
  const appointementResults = await appointmentService.getActiveAppointments(
    query
  );

  res.json({
    status: "success",
    message: "Appointments retrieved successfully",
    data: {
      appointments: appointementResults.appointements,
      pagination: appointementResults.pagination,
    },
  });
});
export const createAppointment = asyncHandler(
  async (req: Request & { validatedData: createAppointmentType }, res) => {
    // const { patient_id, doctor_id, reason, date, time, patient_name, type } =
    //   req.body;
    const userId = req.user?.id!;
    const appointement = appointmentService.createAppointment(
      req.validatedData,
      userId
    );
    // if (req.approvalSetting) {
    //   // console.log(req.approvalSetting);
    //   const audit = await db.AppointmentAudit.create({
    //     metaData: req.body,
    //     doctor_id: doctor_id,
    //     patient_id: patient_id,
    //     reason: reason,
    //     appointment_time: time,
    //     appointment_date: date,
    //     patient_name: patient_name,
    //     operation_type: "I",
    //     change_status: "P",
    //     changed_by: req.user?.id,
    //     changed_at: Date.now(),
    //   });
    //   const approvalrequest = await db.ApprovalRequest.create({
    //     approval_setting_id: req.approvalSetting.id,
    //     audit_tableName: "appointments_audit",
    //     audit_targetId: audit.id,
    //     current_approval_level: 1,
    //     current_approval_user: req.approvalSetting?.approvers[0]?.user_id,
    //     requested_by: req.user?.id,
    //   });
    //   res.status(201).json({
    //     message: "Appointment sent to Approvers",
    //     model: approvalrequest,
    //   });
    // } else {
    //   // res.json("no approval setting");
    //   const daysOfWeek = [
    //     "Sunday",
    //     "Monday",
    //     "Tuesday",
    //     "Wednesday",
    //     "Thursday",
    //     "Friday",
    //     "Saturday",
    //   ];
    //   // console.log(req.body);
    //   const Weekdate = new Date(date).getDay();
    //   // console.log(Weekdate);
    //   // console.log(daysOfWeek[Weekdate]);
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

    //   if (!doctor) {
    //     res.status(400);
    //     throw new Error("Doctor is not available at this time");
    //   }
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
    //     { userId: req.user?.id }
    //   );
    res.status(201).json({
      status: "success",
      message: "Appointment created successfully",
      data: {
        appointement,
      },
    });
  }
);
export const updateAppointment = asyncHandler(async (req, res) => {
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
  await appointment.save({ userId: req.user?.id });
  res.json({ msg: " Appointment Updated successfully" });
});
export const cancelAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const appointment = await db.Appointment.findByPk(id);
  if (!appointment) {
    res.status(404);
    throw new Error("Appointment not found");
  }
  // console.log(appointment);
  appointment.status = "cancelled";
  await appointment.save({ userId: req.user?.id });
  res.json({ msg: "Appointment cancelled" });
});
export const deleteAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const appointment = await db.Appointment.findByPk(id);
  if (!appointment) {
    res.status(404);
    throw new Error("Appointment not found");
  }
  await appointment.destroy({ userId: req.user?.id });
  res.json({ msg: "Appointment deleted" });
});
// };
//
