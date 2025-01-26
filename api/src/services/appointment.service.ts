import { Op } from "sequelize";
import { Appointment } from "../models";
import {
  appointmentQueryType,
  createAppointmentType,
  updateAppointmentType,
} from "../types/appointment";
import { ApiError } from "../shared/error/ApiError";
import { patientService, userService } from ".";

import { combineAndFormatDateTime } from "../utils/helpers";

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

  return {
    appointements,
    pagination: {
      currentPage: page,
      totalResults: count,
      totalPages: Math.ceil(count / limit),
      hasMore,
    },
  };
};

export const getActiveAppointments = async (query: appointmentQueryType) => {
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
    ];
  }

  whereClause[Op.or] = [{ status: "scheduled" }, , { status: "Confirmed" }];

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

  return {
    appointements,
    pagination: {
      currentPage: page,
      totalResults: count,
      totalPages: Math.ceil(count / limit),
      hasMore,
    },
  };
};
export const getAppointmentById = async (id: number) => {
  const appointment = await Appointment.findByPk(id);
  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }
  return appointment;
};
export const createAppointment = async (
  data: createAppointmentType,
  userId: number
) => {
  const {
    patient_id,
    doctor_id,
    reason,

    patient_name,
    appointment_date,
    appointment_time,
    appointment_type,
    patient_visit_id,
  } = data;
  const isNewPatient = !!patient_id;
  let patientName = patient_name;
  if (patient_id) {
    const patient = await patientService.getPatientById(patient_id);
    patientName = patient.getFullName();
  }
  // Validate if the doctor_id belongs to a user with the "doctor" role
  const doctor = await userService.getUserById(doctor_id); // Assuming getUserById is a method in your user service

  if (!(await doctor.hasRole("doctor"))) {
    throw new ApiError(
      400,
      "The specified doctor is not valid or does not have the correct role."
    );
  }
  // create appointment date from appointment_date(eg. 01-17-2025) and appointment_time using date-fns

  const appointmentDate = combineAndFormatDateTime(
    appointment_date.toISOString().split("T")[0],
    appointment_time
  );
  const appointment = await Appointment.create({
    patient_id,
    doctor_id,
    reason,
    patient_name: patientName,
    appointment_date: appointmentDate,
    appointment_time,
    appointment_type,
    patient_visit_id,
    appointed_by: userId,
    is_new_patient: isNewPatient,
    registration_status: isNewPatient ? "pending" : null,
  });

  return appointment;
};

export const updateAppointment = async (
  appointmentId: number,
  data: updateAppointmentType,
  userId: number
) => {
  const {
    patient_id,
    doctor_id,
    reason,
    patient_name,
    appointment_date,
    appointment_time,
    appointment_type,
    patient_visit_id,
  } = data;

  const appointement = await getAppointmentById(appointmentId);
  if (appointement.status?.toLowerCase() !== "scheduled") {
    throw new ApiError(
      400,
      "Appointment is not scheduled you can not update it"
    );
  }
  // Validate if the doctor_id corresponds to a user with the "doctor" role
  const doctor = await userService.getUserById(doctor_id); // Fetch the doctor by ID

  // Check if the doctor has the "doctor" role
  if (!(await doctor.isDoctorRole())) {
    throw new ApiError(
      400,
      " The specified doctor is not valid or does not have the doctor role."
    );
  }
  // If the doctor has the "doctor" role, proceed to update the appointment
  const appointmentDate = combineAndFormatDateTime(
    appointment_date.toISOString().split("T")[0], // Format date
    appointment_time
  );

  // Update the appointment
  await appointement.update({
    patient_id,
    doctor_id,
    reason,
    patient_name,
    appointment_date: appointmentDate,
    appointment_time,
    appointment_type,
    patient_visit_id,
  });
  return appointement; // The updated appointment object
};

export const cancelAppointment = async (
  appointmentId: number,
  userId: number
) => {
  const appointment = await getAppointmentById(appointmentId);
  if (appointment.status?.toLowerCase() !== "scheduled") {
    throw new ApiError(
      400,
      "Appointment is not scheduled you can not cancel it"
    );
  }
  await appointment.update({ status: "Cancelled", cancelled_by: userId });
  return appointment;
};

export const confirmAppointment = async (
  appointmentId: number,
  userId: number
) => {
  const appointment = await getAppointmentById(appointmentId);
  if (appointment.status?.toLowerCase() !== "scheduled") {
    throw new ApiError(
      400,
      "Appointment is not scheduled you can not confirm it"
    );
  }
  // check if patient_id is null if it is null then redirect to patient registration page
  if (!appointment.patient_id) {
    throw new ApiError(
      400,
      "Patient is not registered you can not confirm the appointment"
    );
  }
  await appointment.update({ status: "Confirmed" });
  return appointment;
};
export const deleteAppointment = async (appointmentId: number) => {
  const appointment = await getAppointmentById(appointmentId);
  await appointment.destroy();
  return appointment;
};

export const completeAppointment = async (
  appointmentId: number,
  visit_id: number
) => {
  const appointment = await getAppointmentById(appointmentId);
  if (appointment.status?.toLowerCase() !== "confirmed") {
    throw new ApiError(
      400,
      "Appointment is not confirmed you can not complete it"
    );
  }
  await appointment.update({ status: "Completed", patient_visit_id: visit_id });
  return appointment;
};

// reschedule appointment
export const rescheduleAppointment = async (
  appointmentId: number,
  data: updateAppointmentType,
  userId: number
) => {};
