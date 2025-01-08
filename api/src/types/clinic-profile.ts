import { z } from "zod";
import { addressSchema } from "./shared";
import { isAfter, isBefore } from "date-fns";
const working_hourSchema = z
  .object({
    id: z.number(),
    start_time: z.string(),
    end_time: z.string(),
    day_of_week: z.enum([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]),
  })
  .superRefine((data, ctx) => {
    const start_time = new Date(`1970-01-01T${data.start_time}`);
    const end_time = new Date(`1970-01-01T${data.end_time}`);
    // console.log(start_time, end_time);

    // if (data.end_time < data.start_time) {
    if (isAfter(start_time, end_time)) {
      ctx.addIssue({
        path: ["start_time"],
        code: z.ZodIssueCode.custom,
        message: "Must be less than end time",
      });
    }
  });

export const updateClinicProfileSchema = z.object({
  name: z.string({ required_error: "Name Required" }).trim().min(1, "Required"),
  logo: z.string().optional(),
  // .optional(),
  card_valid_date: z.union([
    z.number().int().nonnegative(), // Directly allow numbers
    z
      .string()
      .refine((value) => !isNaN(Number(value)), {
        message: "card_valid_date must be a number",
      })
      .transform((value) => Number(value)), // Convert string to number
  ]),
  website_url: z.string().optional(),
  address_id: z.number().optional(),
  brand_color: z.string(),
  motto: z.string().optional(),
  number_of_branch: z.union([
    z.number().int().nonnegative(), // Directly allow numbers
    z
      .string()
      .refine((value) => !isNaN(Number(value)), {
        message:
          "number_of_branch must be a number or a string that can be converted to a number",
      })
      .transform((value) => Number(value)),
  ]),
  branch_addresses: z.string().optional(),
  clinic_type: z.string(),
  has_triage: z.union([
    z.literal(true),
    z.literal(false),
    z
      .string()
      .refine((value) => value === "true" || value === "false", {
        message: "has_triage must be a boolean or a string 'true'/'false'",
      })
      .transform((value) => value === "true"), // Convert string to boolean
  ]),
  clinic_seal: z.string().optional(),
  address: addressSchema,
  working_hours: z.array(working_hourSchema).length(7, "hello"),
});

export type updateClinicProfileT = z.infer<typeof updateClinicProfileSchema>;
export type working_hourT = z.infer<typeof working_hourSchema>;
