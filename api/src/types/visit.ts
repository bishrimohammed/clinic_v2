import { z } from "zod";
import { preprocessNumber } from "./shared";
import { timePattern } from "../utils/constants";
import { isBefore, isEqual, startOfDay } from "date-fns";
import { isValidDate } from "../utils/helpers";

export const patientVisitQuerySchema = z.object({
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

  q: z.string().trim().optional(), // Renamed for clarity
  sortBy: z
    .enum([
      "patientName_asc",
      "patientName_desc",
      "patientId_asc",
      "patientId_desc",
      "doctorName_asc",
      "doctorName_desc",
      //   "sex_asc",
      //   "sex_desc",
      "visit_date_asc", // Corrected spelling
      "visit_date_desc", // Corrected spelling
    ])
    .optional(),
});

export const createPatientVisitSchema = z
  .object({
    patientId: preprocessNumber,
    doctorId: preprocessNumber,
    visitDate: z
      .string()
      .transform((val) => new Date(val))
      .refine(isValidDate, { message: "Invalid date" }), // Check if the date is valid
    visitTime: z
      .string()
      .trim()
      .regex(timePattern, { message: "Invalid time" }),
    visitType: z.enum([
      "consultation",
      "follow-up",
      "emergency",
      "checkup",
      "vaccination",
      "therapy",
      "diagnostic",
      "surgery",
    ]),

    visitReason: z.string().trim().optional(),
    modeOfArrival: z
      .union([
        z.enum(["walk-in", "referral", "emergency", "scheduled", "ambulance"]),
        z.literal(""),
      ])
      .optional(),
  })
  .superRefine((data, ctx) => {
    const today = startOfDay(new Date()); // Normalize today's date to remove time
    const visitDate = startOfDay(new Date(data.visitDate)); // Ensure visitDate has no time

    // Ensure visitDate is today or in the future
    if (isBefore(visitDate, today)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Visit date must be today or in the future",
        path: ["visitDate"],
      });
    }

    // If visitDate is today, ensure visitTime is in the future
    if (isEqual(visitDate, today)) {
      const [hours, minutes] = data.visitTime.split(":").map(Number);
      const visitTime = new Date();
      visitTime.setHours(hours, minutes, 0, 0);

      if (visitTime < new Date()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Visit time must be in the future",
          path: ["visitTime"],
        });
      }
    }

    // if visit type is emergency modeOfArrival is required
    if (data.visitType === "emergency") {
      if (!data.modeOfArrival) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Mode of Arrival is required",
          path: ["modeOfArrival"],
        });
      }
    }
  });

export const updatepatientVisitSchema = z
  .object({
    visitDate: z
      .string()
      .transform((val) => new Date(val))
      .refine(isValidDate, { message: "Invalid date" }), // Check if the date is valid
    // visitTime: z
    //   .string()
    //   .trim()
    //   .regex(timePattern, { message: "Invalid time" }),
    visitType: z.enum([
      "consultation",
      "follow-up",
      "emergency",
      "checkup",
      "vaccination",
      "therapy",
      "diagnostic",
      "surgery",
    ]),

    visitReason: z.string().trim().optional(),
    modeOfArrival: z
      .union([
        z.enum(["walk-in", "referral", "emergency", "scheduled", "ambulance"]),
        z.literal(""),
      ])
      .optional(),
  })
  .superRefine((data, ctx) => {
    const today = new Date(); // Normalize today's date to remove time
    // const visitDate = startOfDay(new Date(data.visitDate)); // Ensure visitDate has no time
    const visitDate = data.visitDate; // Ensure visitDate has no time

    // Ensure visitDate is today or in the future
    if (isBefore(visitDate, today)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Visit date must be today or in the future",
        path: ["visitDate"],
      });
    }

    // If visitDate is today, ensure visitTime is in the future
    // if (isEqual(visitDate, today)) {
    //   const [hours, minutes] = data.visitTime.split(":").map(Number);
    //   const visitTime = new Date();
    //   visitTime.setHours(hours, minutes, 0, 0);

    //   if (visitTime < new Date()) {
    //     ctx.addIssue({
    //       code: z.ZodIssueCode.custom,
    //       message: "Visit time must be in the future",
    //       path: ["visitTime"],
    //     });
    //   }
    // }

    // if visit type is emergency modeOfArrival is required
    if (data.visitType === "emergency") {
      if (!data.modeOfArrival) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Mode of Arrival is required",
          path: ["modeOfArrival"],
        });
      }
    }
  });
export type patientVisitQueryType = z.infer<typeof patientVisitQuerySchema>;
export type createPatientVisitType = z.infer<typeof createPatientVisitSchema>;
export type updatePatientVisitType = z.infer<typeof updatepatientVisitSchema>;
