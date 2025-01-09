import { add } from "date-fns";
import { number, z } from "zod";

const WoredaSchema = z.object({
  id: z.string(),
  name: z.string(),
  subcity: z.object({
    id: z.string(),
    name: z.string(),
    city: z.object({
      id: z.string(),
      name: z.string(),
      region: z.object({
        id: z.string(),
        name: z.string(),
      }),
    }),
  }),
});
const addressSchema = z.object({
  id: z.number(),
  region_id: z.string(),
  city_id: z.string(),
  subcity_id: z.string(),
  woreda_id: z.string(),
  house_number: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  phone_1: z.string().regex(/^(09|07)\d{8}$/, "Phone number is invalid"),
  street: z.string().optional(),
});
// woreda: WoredaSchema,

const clinicProfileSchema = z.object({
  id: z.number().int(""),
  name: z.string({ required_error: "Required" }).trim().min(1, "Required"),
  logo: z
    .instanceof(FileList)
    .refine((files) => files.length == 0, "Logo is Required")
    .refine((files) => files[0]?.size <= 1 * 1024 * 1024, {
      message: "Profile image size must be 5MB or less",
    }) // 5MB limit
    .refine((file) => ["image/jpeg", "image/png"].includes(file[0].type), {
      message: "Profile image must be JPEG or PNG",
    }),
  // .optional(),
  card_valid_date: z.number(),
  website_url: z.string().optional(),
  address_id: z.number().optional(),
  brand_color: z.string(),
  motto: z.string().optional(),
  number_of_branch: z.number(),
  branch_addresses: z.string(),
  clinic_type: z.string(),
  has_triage: z.boolean(),
  clinic_seal: z.string().optional(),
});
const working_hourSchema = z.object({
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
});

const clinicProfileResponseSchema = clinicProfileSchema.extend({
  address: z.object({
    id: z.number(),
    phone_1: z.string().regex(/^(09|07)\d{8}$/, "Phone number is invalid"),

    woreda_id: z.string(),
    house_number: z.string().optional(),
    email: z.string().email("Invalid email").optional(),
    street: z.string().optional(),
    woreda: WoredaSchema,
  }),
  working_hours: z.array(working_hourSchema),
});

export const FormclinicProfileSchema = clinicProfileSchema.extend({
  address: addressSchema,
  working_hours: z.array(working_hourSchema).superRefine((data, ctx) => {
    // console.log(ctx.path);
    data.map((work_hour, index) => {
      const starTime = work_hour.start_time.split(":");
      const endTime = work_hour.end_time.split(":");
      if (endTime[0] + ":" + endTime[1] <= starTime[0] + ":" + starTime[1]) {
        return ctx.addIssue({
          path: [index, "end_time"],
          code: z.ZodIssueCode.custom,
          message: "Must be greater than start time",
        });
      }
    });
  }),
});
export type clinicProfileResType = z.infer<typeof clinicProfileResponseSchema>;
