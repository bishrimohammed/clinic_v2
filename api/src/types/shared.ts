import { number, z } from "zod";

export type loggedInUserId = number;

export const addressSchema = z.object({
  id: z
    .union([
      z.number().int().nonnegative(), // Directly allow numbers
      z
        .string()
        .refine((value) => !isNaN(Number(value)), {
          message: "Must be a number",
        })
        .transform((value) => Number(value)),
    ])
    .optional(),
  region_id: z.union([
    z.number().int().nonnegative(), // Directly allow numbers
    z
      .string()
      .refine((value) => !isNaN(Number(value)), {
        message: "Must be a number",
      })
      .transform((value) => Number(value)),
  ]),
  city_id: z.union([
    z.number().int().nonnegative(),
    z
      .string()
      .refine((value) => !isNaN(Number(value)), {
        message: "Must be a number",
      })
      .transform((value) => Number(value)),
  ]),
  subcity_id: z.union([
    z.number().int().nonnegative(), // Directly allow numbers
    z
      .string()
      .refine((value) => !isNaN(Number(value)), {
        message: "Must be a number",
      })
      .transform((value) => Number(value)),
  ]),
  woreda_id: z.union([
    z.number().int().nonnegative(), // Directly allow numbers
    z
      .string()
      .refine((value) => !isNaN(Number(value)), {
        message: "Must be a number",
      })
      .transform((value) => Number(value)),
  ]),
  email: z.string().trim().email("Invalid email").optional(),
  phone_1: z.string().regex(/^(09|07)\d{8}$/, "Phone number is invalid"),
  house_number: z.string().trim().optional(),
  street: z.string().trim().optional(),
  phone_2: z
    .string()
    .optional()
    .refine(
      (value) => !value || phoneRegex.test(value),
      "Phone number is invalid"
    ),
});
export const phoneRegex = /^(07|09)\d{8}$/;

export type dayOfWeekType =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export const createEmergencyContactSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(3, "First Name must be at least 3 characters long"),
    middleName: z
      .string()
      .trim()
      .min(3, "Father Name must be at least 3 characters long"),
    lastName: z.string().trim().optional(),
    relationship: z
      .string({ required_error: "Relationship is required" })
      .min(1),
    other_relation: z.string().trim().optional(),
    phone: z.string().regex(phoneRegex, "Phone number is invalid"),
    is_the_same_address: z.boolean(),
    region_id: z.union([
      z.number().int().nonnegative(), // Directly allow numbers
      z
        .string()
        .refine((value) => !isNaN(Number(value)), {
          message: "Must be a number",
        })
        .transform((value) => Number(value)),
    ]),
    city_id: z.union([
      z.number().int().nonnegative(),
      z
        .string()
        .refine((value) => !isNaN(Number(value)), {
          message: "Must be a number",
        })
        .transform((value) => Number(value)),
    ]),
    subcity_id: z.union([
      z.number().int().nonnegative(), // Directly allow numbers
      z
        .string()
        .refine((value) => !isNaN(Number(value)), {
          message: "Must be a number",
        })
        .transform((value) => Number(value)),
    ]),
    woreda_id: z.union([
      z.number().int().nonnegative(), // Directly allow numbers
      z
        .string()
        .refine((value) => !isNaN(Number(value)), {
          message: "Must be a number",
        })
        .transform((value) => Number(value)),
    ]),
    house_number: z.string().trim().optional(),
    street: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.relationship.toLowerCase() === "other" && !data.other_relation) {
      ctx.addIssue({
        path: ["other_relation"],
        code: z.ZodIssueCode.custom,
        message: "Relationship type is required when relation is 'Other'",
      });
    }

    if (!data.is_the_same_address) {
      (
        ["region_id", "city_id", "subcity_id", "woreda_id"] as Array<
          keyof typeof data
        >
      ).forEach((field) => {
        if (!data[field]) {
          ctx.addIssue({
            path: [field],
            code: z.ZodIssueCode.custom,
            message: `${field.replace(
              "_",
              " "
            )} is required for emergency contact`,
          });
        }
      });
    }
  });

export const updateEmergencyContactSchema = z
  .object({
    firstName: z.string().trim().optional(),
    middleName: z.string().trim().optional(),
    lastName: z.string().trim().optional(),
    relationship: z
      .string({ required_error: "Relationship is required" })
      .optional(),
    other_relation: z.string().trim().optional(),
    phone: z.string().regex(phoneRegex, "Phone number is invalid"),
    is_the_same_address: z.boolean().optional(),
    region_id: z
      .union([
        z.number().int().nonnegative(), // Directly allow numbers
        z
          .string()
          .refine((value) => !isNaN(Number(value)), {
            message: "Must be a number",
          })
          .transform((value) => Number(value)),
      ])
      .optional(),
    city_id: z
      .union([
        z.number().int().nonnegative(),
        z
          .string()
          .refine((value) => !isNaN(Number(value)), {
            message: "Must be a number",
          })
          .transform((value) => Number(value)),
      ])
      .optional(),
    subcity_id: z
      .union([
        z.number().int().nonnegative(), // Directly allow numbers
        z
          .string()
          .refine((value) => !isNaN(Number(value)), {
            message: "Must be a number",
          })
          .transform((value) => Number(value)),
      ])
      .optional(),
    woreda_id: z
      .union([
        z.number().int().nonnegative(), // Directly allow numbers
        z
          .string()
          .refine((value) => !isNaN(Number(value)), {
            message: "Must be a number",
          })
          .transform((value) => Number(value)),
      ])
      .optional(),
    house_number: z.string().trim().optional(),
    street: z.string().trim().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data?.relationship?.toLowerCase() === "other" &&
      !data?.other_relation
    ) {
      ctx.addIssue({
        path: ["other_relation"],
        code: z.ZodIssueCode.custom,
        message: "Relationship type is required when relation is 'Other'",
      });
    }

    if (!data.is_the_same_address) {
      (
        ["region_id", "city_id", "subcity_id", "woreda_id"] as Array<
          keyof typeof data
        >
      ).forEach((field) => {
        if (!data[field]) {
          ctx.addIssue({
            path: [field],
            code: z.ZodIssueCode.custom,
            message: `${field.replace(
              "_",
              " "
            )} is required for emergency contact`,
          });
        }
      });
    }
  });

export const preprocessBoolean = z.preprocess(
  (val) => {
    // Convert string values to boolean if they represent "true" or "false"
    if (typeof val === "string") {
      const lowerCaseVal = val.toLowerCase();
      if (lowerCaseVal === "true") return true;
      if (lowerCaseVal === "false") return false;
    }
    return val; // Return the original value if not a string or not "true"/"false"
  },
  z.boolean().refine((val) => typeof val === "boolean", {
    message: "Expected a boolean value (true or false)",
  })
);
export const preprocessDate = z.preprocess(
  (val) => {
    // Convert string values to Date objects if they represent a valid date
    if (typeof val === "string") {
      const date = new Date(val);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    return val; // Return the original value if not a string or not a valid date
  },
  z.date().refine((val) => !isNaN(val.getTime()), {
    message: "Expected a valid date",
  })
  // .transform((val) => val.toISOString().split("T")[0])
);

export const preprocessNumber = z.preprocess(
  (val) => {
    // Convert string values to numbers if they represent a valid number
    if (typeof val === "string") {
      const number = Number(val);
      if (!isNaN(number)) {
        return number;
      }
    }
    return val; // Return the original value if not a string or not a valid number
  },
  z
    .number()
    .refine((val) => !isNaN(val), {
      message: "Expected a valid number",
    })
    .transform((val) => val.toString())
);

export type addressT = z.infer<typeof addressSchema>;
export type createEmergencyContactT = z.infer<
  typeof createEmergencyContactSchema
>;
