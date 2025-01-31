import { z } from "zod";

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

export const createPatientVisitSchema = z.object({
  patientId: z.string().optional(),
  doctorId: z.string().optional(),
  visitDate: z.string().optional(),
  visitTime: z.string().optional(),
  visitType: z.string().optional(),
  visitReason: z.string().optional(),
  // visitStatus: z.string().optional(),
});

export type patientVisitQueryType = z.infer<typeof patientVisitQuerySchema>;
