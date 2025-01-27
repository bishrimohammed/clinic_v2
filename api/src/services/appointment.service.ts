import {
  CreateOptions,
  InstanceUpdateOptions,
  Op,
  UpdateOptions,
} from "sequelize";
import { Appointment } from "../models";
import {
  appointmentQueryType,
  createAppointmentType,
  updateAppointmentType,
} from "../types/appointment";
import { ApiError } from "../shared/error/ApiError";
import { patientService, userService } from ".";

import { combineAndFormatDateTime } from "../utils/helpers";
interface CustomUpdateOptions extends InstanceUpdateOptions<Appointment> {
  userId?: number; // Add the userId property
}
interface CustomCreateOptions extends CreateOptions<Appointment> {
  userId?: number;
}
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
  const isNewPatient = patient_id ? false : true;
  let patientName = patient_name;

  const doctor = await userService.getUserById(doctor_id); // Assuming getUserById is a method in your user service

  if (!(await doctor.isDoctorRole())) {
    throw new ApiError(
      400,
      // `User (${doctor_id}) not a doctor role`
      `User with id (${doctor_id}) not a doctor role`
    );
  }

  if (patient_id) {
    const patient = await patientService.getPatientById(patient_id);
    patientName = patient.getFullName();
    // check of the patient is already scheduled for the same day and time and doctor
    if (await isPatientAlreadyScheduledWithDoctor(patient_id, doctor_id)) {
      throw new ApiError(
        400,
        "Patient already has an appointment scheduled with the same doctor"
      );
    }
  }

  // Check if the doctor is already scheduled for the same day and time
  if (
    await isDoctorAlreadyScheduledWithOtherPatient(
      doctor_id,
      appointment_date,
      appointment_time
    )
  ) {
    throw new ApiError(
      400,
      "Doctor already has an appointment scheduled for the same day and time."
    );
  }

  const day_of_week = new Date(appointment_date).toLocaleString("en-us", {
    weekday: "long",
  }) as
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday";
  const isDoctorAvailable = await userService.isDoctorAvailable({
    date: appointment_date,
    dayOfWeek: day_of_week,
    doctor: doctor,
    time: appointment_time,
  });
  if (!isDoctorAvailable) {
    throw new ApiError(400, "Doctor is not available at the specified time.");
  }

  // create appointment

  const appointmentDate = combineAndFormatDateTime(
    appointment_date.toISOString().split("T")[0],
    appointment_time
  );
  const appointment = await Appointment.create(
    {
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
    },
    { hooks: true, userId: userId }
  );

  return appointment;
};

// export const updateAppointment = async (
//   appointmentId: number,
//   data: updateAppointmentType,
//   userId: number
// ) => {
//   const {
//     patient_id,
//     doctor_id,
//     reason,
//     patient_name,
//     appointment_date,
//     appointment_time,
//     appointment_type,
//     patient_visit_id,
//   } = data;

//   const appointement = await getAppointmentById(appointmentId);
//   if (appointement.status?.toLowerCase() !== "scheduled") {
//     throw new ApiError(
//       400,
//       "Appointment is not scheduled you can not update it"
//     );
//   }
//   // Validate if the doctor_id corresponds to a user with the "doctor" role
//   const doctor = await userService.getUserById(doctor_id); // Fetch the doctor by ID

//   // Check if the doctor has the "doctor" role
//   if (!(await doctor.isDoctorRole())) {
//     throw new ApiError(
//       400,
//       " The specified doctor is not valid or does not have the doctor role."
//     );
//   }
//   // If the doctor has the "doctor" role, proceed to update the appointment
//   const appointmentDate = combineAndFormatDateTime(
//     appointment_date.toISOString().split("T")[0], // Format date
//     appointment_time
//   );

//   // Update the appointment
//   await appointement.update({
//     patient_id,
//     doctor_id,
//     reason,
//     patient_name,
//     appointment_date: appointmentDate,
//     appointment_time,
//     appointment_type,
//     patient_visit_id,
//   });
//   return appointement; // The updated appointment object
// };
export const updateAppointment = async (
  appointmentId: number,
  data: Partial<createAppointmentType>,
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

  const existingAppointment = await getAppointmentById(appointmentId);
  if (existingAppointment.status !== "Scheduled") {
    throw new ApiError(
      400,
      "Appointment is not scheduled you can not update it"
    );
  }

  // Check if the doctor_id is provided and is valid
  if (doctor_id) {
    const doctor = await userService.getUserById(doctor_id);

    if (!(await doctor.isDoctorRole())) {
      throw new ApiError(
        400,
        `User with id (${doctor_id}) is not a doctor role.`
      );
    }

    // Check if the doctor has another appointment at the same time
    if (
      appointment_date &&
      appointment_time &&
      (await isDoctorAlreadyScheduledWithOtherPatient(
        doctor_id,
        appointment_date,
        appointment_time
      ))
    ) {
      throw new ApiError(
        400,
        "Doctor already has an appointment scheduled for the same day and time."
      );
    }
  }

  // Check if the patient_id is provided and is valid
  if (patient_id) {
    const patient = await patientService.getPatientById(patient_id);
    const updatedPatientName = patient_name || patient.getFullName();

    // Check if the patient has a conflicting appointment with the same doctor
    if (
      doctor_id &&
      appointment_date &&
      appointment_time &&
      (await isPatientAlreadyScheduledWithDoctor(patient_id, doctor_id))
    ) {
      throw new ApiError(
        400,
        "Patient already has an appointment scheduled with the same doctor."
      );
    }

    data.patient_name = updatedPatientName; // Ensure the name is updated if provided
  }

  // Validate doctor's availability
  if (doctor_id && appointment_date && appointment_time) {
    const day_of_week = new Date(appointment_date).toLocaleString("en-us", {
      weekday: "long",
    }) as
      | "Sunday"
      | "Monday"
      | "Tuesday"
      | "Wednesday"
      | "Thursday"
      | "Friday"
      | "Saturday";

    const isDoctorAvailable = await userService.isDoctorAvailable({
      date: appointment_date,
      dayOfWeek: day_of_week,
      doctor: await userService.getUserById(doctor_id),
      time: appointment_time,
    });

    if (!isDoctorAvailable) {
      throw new ApiError(400, "Doctor is not available at the specified time.");
    }
  }

  // Format the updated appointment date and time if both are provided
  // if (appointment_date && appointment_time) {
  //   data.appointment_date = combineAndFormatDateTime(
  //     appointment_date.toISOString().split("T")[0],
  //     appointment_time
  //   );
  // }

  // Update the appointment
  await existingAppointment.update(
    {
      patient_id: patient_id || existingAppointment.patient_id,
      doctor_id: doctor_id || existingAppointment.doctor_id,
      reason: reason || existingAppointment.reason,
      patient_name: patient_name || existingAppointment.patient_name,
      appointment_date:
        appointment_date || existingAppointment.appointment_date,
      appointment_time:
        appointment_time || existingAppointment.appointment_time,
      appointment_type:
        appointment_type || existingAppointment.appointment_type,
      patient_visit_id:
        patient_visit_id || existingAppointment.patient_visit_id,

      // updated_by: userId, // Record who updated the appointment
    },
    { hooks: true, userId: userId }
  );

  return existingAppointment;
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
export const rescheduleOrCreate = async (
  appointmentId: number,
  newDate: string,
  newTime: string,
  rescheduledBy: number,
  options?: { newDoctorId?: number; newReason?: string }
): Promise<Appointment> => {
  const existingAppointment = await getAppointmentById(appointmentId);

  interface CustomUpdateOptions extends InstanceUpdateOptions<Appointment> {
    userId?: number; // Add the userId property
  }
  // If the changes are minor (e.g., only date/time), reschedule the existing appointment
  if (!options?.newDoctorId && !options?.newReason) {
    await existingAppointment.update(
      {
        appointment_date: newDate,
        appointment_time: newTime,
        status: "Rescheduled",
        re_appointed_by: rescheduledBy,
      },
      {
        hooks: true,
        // userId: 6,
        fields: [
          "appointment_date",
          "appointment_time",
          "status",
          "re_appointed_by",
        ],
      }
    );

    return existingAppointment;
  }

  // If the changes are significant, create a new appointment and mark the old one as cancelled
  const newAppointment = await Appointment.create({
    patient_id: existingAppointment.patient_id,
    patient_name: existingAppointment.patient_name,
    doctor_id: options.newDoctorId || existingAppointment.doctor_id,
    appointment_date: newDate,
    appointment_time: newTime,
    reason: options.newReason || existingAppointment.reason,
    appointment_type: existingAppointment.appointment_type,
    previous_appointment_id: existingAppointment.id, // Link to the old appointment
    appointed_by: rescheduledBy,
    status: "Scheduled",
  });

  // Mark the old appointment as cancelled
  existingAppointment.status = "Cancelled";
  existingAppointment.cancelled_by = rescheduledBy;
  await existingAppointment.save();

  return newAppointment;
};

// check if patient has schedule appointment in the same day and time with the same doctor

export const isPatientAlreadyScheduledWithDoctor = async (
  patientId: number,
  doctorId: number
  // appointmentDate: Date,
  // appointmentTime: string
) => {
  const appointment = await Appointment.findOne({
    where: {
      patient_id: patientId,
      doctor_id: doctorId,
      // appointment_date: appointmentDate,
      // appointment_time: appointmentTime,
      status: "Scheduled",
    },
  });
  // const hasAppointment = appointment ? true : false;
  return !!appointment;
};

// has doctor appointment in the same day and time with the other patient
export const isDoctorAlreadyScheduledWithOtherPatient = async (
  doctorId: number,
  appointmentDate: Date,
  appointmentTime: string
) => {
  const appointment = await Appointment.findOne({
    where: {
      doctor_id: doctorId,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      status: "Scheduled",
    },
  });
  const hasOtherAppointment = appointment ? true : false;
  if (hasOtherAppointment) {
    throw new ApiError(400, "Doctor has appointment with other patient");
  }
  return hasOtherAppointment;
};
