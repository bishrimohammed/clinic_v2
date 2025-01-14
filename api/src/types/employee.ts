import { z } from "zod";
import {
  addressSchema,
  createEmergencyContactSchema,
  phoneRegex,
} from "./shared";

export const createEmployeeSchema = z
  .object({
    firstName: z.string().trim().min(1, "Patient name is required"),
    middleName: z.string().trim().min(1, "Father Name is required"),
    lastName: z.string().trim().optional(),
    gender: z.enum(["Male", "Female"]),
    date_of_birth: z.date({ required_error: "Date of Birth is required" }),
    date_of_hire: z
      .date({ required_error: "Date of Hire is required" })
      .max(new Date()),
    position: z.string().trim(),
    address: addressSchema,
    emergencyContact: createEmergencyContactSchema,
  })
  .superRefine((data, ctx) => {
    // Example: Cross-field validation

    // Emergency contact validations
    // if (data.emergency.relation === "Other" && !data.emergency.other_relation) {
    //   ctx.addIssue({
    //     path: ["emergency", "other_relation"],
    //     code: z.ZodIssueCode.custom,
    //     message: "Relationship type is required when relation is 'Other'",
    //   });
    // }

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

export type createEmployeeT = z.infer<typeof createEmployeeSchema>;
