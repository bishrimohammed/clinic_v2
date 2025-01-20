import { z } from "zod";
import { addressSchema, createEmergencyContactSchema } from "./shared";

export const createEmployeeSchema = z
  .object({
    firstName: z.string({ required_error: "Name is required" }).trim().min(3),
    middleName: z
      .string({ required_error: "Father Name is required" })
      .trim()
      .min(3),
    lastName: z.string().trim().optional(),
    gender: z.enum(["Male", "Female"]),
    date_of_birth: z
      .date({ required_error: "Date of Birth is required" })
      .transform((val) => new Date(val))
      .refine(
        (date) => {
          const today = new Date();
          const age = today.getFullYear() - date.getFullYear();
          const isBirthdayPassed =
            today.getMonth() > date.getMonth() ||
            (today.getMonth() === date.getMonth() &&
              today.getDate() >= date.getDate());

          return age > 18 || (age === 18 && isBirthdayPassed);
        },
        {
          message: "Date of Birth must indicate an age greater than 18 years",
        }
      ),
    date_of_hire: z
      .date({ required_error: "Date of Hire is required" })
      .max(new Date(), { message: "Date of Hire cannot be in the future" }),

    position: z.string().trim(),
    address: addressSchema,
    emergencyContact: createEmergencyContactSchema,
  })
  .superRefine((data, ctx) => {
    // Example: Cross-field validation

    // Emergency contact validations
    if (
      data.emergencyContact.relationship === "Other" &&
      !data.emergencyContact.other_relation
    ) {
      ctx.addIssue({
        path: ["emergency", "other_relation"],
        code: z.ZodIssueCode.custom,
        message: "Relationship type is required when relation is 'Other'",
      });
    }

    if (!data.emergencyContact.is_the_same_address) {
      if (!data.emergencyContact.region_id) {
        ctx.addIssue({
          path: ["emergency", "region_id"],
          code: z.ZodIssueCode.custom,
          message: "Region is required for emergency contact",
        });
      }
      if (!data.emergencyContact.city_id) {
        ctx.addIssue({
          path: ["emergency", "city_id"],
          code: z.ZodIssueCode.custom,
          message: "City is required for emergency contact",
        });
      }
      if (!data.emergencyContact.subcity_id) {
        ctx.addIssue({
          path: ["emergency", "subcity_id"],
          code: z.ZodIssueCode.custom,
          message: "Subcity is required for emergency contact",
        });
      }
      if (!data.emergencyContact.woreda_id) {
        ctx.addIssue({
          path: ["emergency", "woreda_id"],
          code: z.ZodIssueCode.custom,
          message: "Woreda is required for emergency contact",
        });
      }
    }
  });

export const updateEmployeeSchema = z
  .object({
    firstName: z.string({ required_error: "Name is required" }).trim().min(3),
    middleName: z
      .string({ required_error: "Father Name is required" })
      .trim()
      .min(3),
    lastName: z.string().trim().optional(),
    gender: z.enum(["Male", "Female"]),
    date_of_birth: z
      .date({ required_error: "Date of Birth is required" })
      .transform((val) => new Date(val))
      .refine(
        (date) => {
          const today = new Date();
          const age = today.getFullYear() - date.getFullYear();
          const isBirthdayPassed =
            today.getMonth() > date.getMonth() ||
            (today.getMonth() === date.getMonth() &&
              today.getDate() >= date.getDate());

          return age > 18 || (age === 18 && isBirthdayPassed);
        },
        {
          message: "Date of Birth must indicate an age greater than 18 years",
        }
      )
      .optional(),
    date_of_hire: z
      .date({ required_error: "Date of Hire is required" })
      .max(new Date(), { message: "Date of Hire cannot be in the future" })
      .optional(),
    position: z.string().trim().optional(),
    address: addressSchema,
    emergencyContact: createEmergencyContactSchema,
  })
  .superRefine((data, ctx) => {
    // Emergency contact validations
  });
export const employeeFilterQuerySchema = z.object({
  status: z.enum(["true", "false"]).optional(),
  position: z.string().optional(),
  gender: z.enum(["Male", "Female"]).optional(),
});
export const employeeGetByIdParamSchema = z.object({
  id: z.string().transform((value) => parseInt(value)),
  item_id: z.string(),
});
export type createEmployeeT = z.infer<typeof createEmployeeSchema>;
export type updateEmployeeT = z.infer<typeof updateEmployeeSchema>;
