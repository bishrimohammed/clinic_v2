import { z } from "zod";
import { isValidDate } from "../utils/helpers";
import { timePattern } from "../utils/constants";

export const appointmentQuerySchema = z.object({
  page: z
    .string()
    .refine((value) => !isNaN(Number(value)), {
      message: "Page must be a number",
    })
    .default("1"),

  // Directly allow numbers
  limit: z
    .string()
    .refine((value) => !isNaN(Number(value)), {
      message: "Limit must be a number",
    })
    .default("10"),

  searchTerm: z.string().optional(), // Renamed for clarity
  sortBy: z
    .enum([
      "name_asc",
      "name_desc",
      "appointment_date_asc",
      "appointment_date_desc",
    ])
    .optional(),
  status: z.string().optional(),
});

export const createAppointmentSchema = z.object({
  patient_id: z.number().nullable(),
  patient_name: z.string().trim(),
  doctor_id: z.number(),
  appointment_date: z
    .string()
    .transform((val) => new Date(val))
    .refine(isValidDate, { message: "Invalid date" }), // Check if the date is valid

  appointment_time: z.string().regex(timePattern, { message: "Invalid time" }), // Check if the time matches the regex pattern

  reason: z.string().trim().nullable(),
  appointment_type: z.string().trim(),
  patient_visit_id: z.number().nullable(),

  //   previous_appointment_id: z.number().nullable(),
  //   next_appointment_date: z.date().nullable(),
  //   appointed_by: z.number(),
  //   re_appointed_by: z.number().nullable(),
  //   is_new_patient: z.boolean(),
  //   registration_status: z.enum(["pending", "completed"]).nullable(),
});

export type createAppointmentType = z.infer<typeof createAppointmentSchema>;
export type updateAppointmentType = z.infer<typeof createAppointmentSchema>;
export type appointmentQueryType = z.infer<typeof appointmentQuerySchema>;
