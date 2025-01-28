import {
  CreateOptions,
  InstanceDestroyOptions,
  InstanceUpdateOptions,
  Op,
} from "sequelize";
import { Appointment } from "../models";
import {
  appointmentQueryType,
  createAppointmentType,
} from "../types/appointment";
import { ApiError } from "../shared/error/ApiError";
import { patientService, userService } from ".";

import { combineAndFormatDateTime } from "../utils/helpers";

interface CustomUpdateOptions extends InstanceUpdateOptions {
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
      orderClause.push(
        ["appointment_date", "ASC"],
        ["appointment_time", "ASC"]
      );
      break;
    case "appointment_date_desc":
      orderClause.push(
        ["appointment_date", "DESC"],
        ["appointment_time", "DESC"]
      );
      break;
    default:
      orderClause.push(
        ["appointment_date", "DESC"],
        ["appointment_time", "DESC"]
      );
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
        appointment_time,
        (appointmentId = existingAppointment.id)
      ))
    ) {
      throw new ApiError(400, "Doctor has appointment with other patient");
    }
  }

  // Check if the patient_id is provided and is valid
  let updatedPatientName = patient_name;
  if (patient_id) {
    const patient = await patientService.getPatientById(patient_id);
    updatedPatientName = patient.getFullName();

    // Check if the patient has a conflicting appointment with the same doctor
    // if (
    //   doctor_id &&
    //   appointment_date &&
    //   appointment_time &&
    //   (await isPatientAlreadyScheduledWithDoctor(patient_id, doctor_id))
    // ) {
    //   throw new ApiError(
    //     400,
    //     "Patient already has an appointment scheduled with the same doctor."
    //   );
    // }

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
  let appointmentDate = existingAppointment.appointment_date;
  if (appointment_date && appointment_time) {
    appointmentDate = appointment_date.toString(); // Format date
    // combineAndFormatDateTime(
    //   appointment_date.toISOString().split("T")[0],
    //   appointment_time
    // );
  }

  // Update the appointment
  // await Appointment.update(
  //   {
  //     patient_id: patient_id || existingAppointment.patient_id,
  //     doctor_id: doctor_id || existingAppointment.doctor_id,
  //     reason: reason || existingAppointment.reason,
  //     patient_name: patient_name || existingAppointment.patient_name,
  //     appointment_date: appointmentDate,
  //     appointment_time:
  //       appointment_time || existingAppointment.appointment_time,
  //     appointment_type:
  //       appointment_type || existingAppointment.appointment_type,
  //     patient_visit_id:
  //       patient_visit_id || existingAppointment.patient_visit_id,
  //   },
  //   {
  //     where: { id: appointmentId },
  //     hooks: true,
  //     individualHooks: true,

  //         },

  // );
  // @ts-ignore
  await existingAppointment.update(
    {
      patient_id: patient_id || existingAppointment.patient_id,
      doctor_id: doctor_id || existingAppointment.doctor_id,
      reason: reason || existingAppointment.reason,
      patient_name: updatedPatientName,
      appointment_date: appointmentDate,
      appointment_time:
        appointment_time || existingAppointment.appointment_time,
      appointment_type:
        appointment_type || existingAppointment.appointment_type,
      patient_visit_id:
        patient_visit_id || existingAppointment.patient_visit_id,
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
  if (appointment.status !== "Scheduled") {
    throw new ApiError(
      400,
      "Appointment is not scheduled you can not cancel it"
    );
  }
  const updateOptions = { hooks: true, userId } as InstanceUpdateOptions & {
    userId: number;
  };
  // @ts-ignore
  await appointment.update({ status: "Cancelled" }, { ...updateOptions });
  return appointment;
};

export const confirmAppointment = async (
  appointmentId: number,

  userId: number
) => {
  const appointment = await getAppointmentById(appointmentId);
  if (appointment.status !== "Scheduled") {
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

export const deleteAppointment = async (
  appointmentId: number,
  userId: number
) => {
  const appointment = await getAppointmentById(appointmentId);
  if (appointment.status?.toLowerCase() !== "scheduled") {
    throw new ApiError(
      400,
      "Appointment is not scheduled you can not delete it"
    );
  }
  // interface gg extends InstanceDestroyOptions {
  //   userId: number;
  // }
  const destroyOptions = { hooks: true, userId } as InstanceDestroyOptions & {
    userId: number;
  };
  await appointment.destroy(destroyOptions);
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
  // existingAppointment.re_appointed_by = rescheduledBy;
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
  appointmentTime: string,
  appointmentId?: number // optional parameter to exclude the current appointment from the check if it's provided
) => {
  const whereClause: any = {
    doctor_id: doctorId,
    appointment_date: appointmentDate,
    appointment_time: appointmentTime,
    status: "Scheduled",
  };
  if (appointmentId) {
    whereClause.id = { [Op.not]: appointmentId };
  }
  const appointment = await Appointment.findOne({
    where: whereClause,
  });
  const hasOtherAppointment = appointment ? true : false;

  return hasOtherAppointment;
};
