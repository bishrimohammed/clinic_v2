import { z } from "zod";

export const addressSchema = z.object({
  id: z.union([
    z.number().int().nonnegative(), // Directly allow numbers
    z
      .string()
      .refine((value) => !isNaN(Number(value)), {
        message: "Must be a number",
      })
      .transform((value) => Number(value)),
  ]),
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
  house_number: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  phone_1: z.string().regex(/^(09|07)\d{8}$/, "Phone number is invalid"),
  street: z.string().optional(),
});

export type addressT = z.infer<typeof addressSchema>;
