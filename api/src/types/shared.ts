import { z } from "zod";

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
      if (!data.region_id) {
        ctx.addIssue({
          path: ["region_id"],
          code: z.ZodIssueCode.custom,
          message: "Region is required for emergency contact",
        });
      }
      if (!data.city_id) {
        ctx.addIssue({
          path: ["city_id"],
          code: z.ZodIssueCode.custom,
          message: "City is required for emergency contact",
        });
      }
      if (!data.subcity_id) {
        ctx.addIssue({
          path: ["subcity_id"],
          code: z.ZodIssueCode.custom,
          message: "Subcity is required for emergency contact",
        });
      }
      if (!data.woreda_id) {
        ctx.addIssue({
          path: ["woreda_id"],
          code: z.ZodIssueCode.custom,
          message: "Woreda is required for emergency contact",
        });
      }
    }
  });

export type addressT = z.infer<typeof addressSchema>;
export type createEmergencyContactT = z.infer<
  typeof createEmergencyContactSchema
>;
