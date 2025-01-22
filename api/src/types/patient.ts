import { z } from "zod";
import {
  addressSchema,
  createEmergencyContactSchema,
  phoneRegex,
} from "./shared";

export const patientRegistrationSchema = z
  .object({
    patientId: z.string(),
    registrationDate: z.date().optional(),
    firstName: z.string({ required_error: "Name is required" }).trim().min(3),
    middleName: z
      .string({ required_error: "Father's Name is required" })
      .trim()
      .min(3),
    lastName: z.string().trim().optional(),
    gender: z.enum(["Male", "Female"], { required_error: "Sex is required" }),
    blood_type: z
      .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
      .optional(),

    nationality: z.string().optional(),
    marital_status: z.string().min(1).optional(),
    guardian_name: z.string().trim().optional(),
    guardian_relationship: z.string().trim().optional(),
    occupation: z.string().trim().optional(),
    has_phone: z.boolean().optional(),
    phone: z.string().regex(phoneRegex, "Phone number is invalid").optional(),
    birth_date: z
      .date({ required_error: "Date of Birth is required" })
      .max(new Date(), "Date must be less than or equal to today")
      .min(new Date("1900-01-01"), "Date of Birth must be after 1900-01-01"),
    is_new: z.boolean(),
    manual_card_id: z.string().trim().min(1).optional(),
    is_credit: z.boolean({ required_error: "Payment type is required" }),
    address: addressSchema,
    emergencyContact: createEmergencyContactSchema,
    company_id: z
      .string()
      .refine((value) => !isNaN(Number(value)), {
        message: "company_id must be a number",
      })
      .transform((value) => Number(value))
      .optional(),
    employeeId: z
      .string()
      .refine((value) => !isNaN(Number(value)), {
        message: "Employee must be a number",
      })
      .transform((value) => Number(value))
      .optional(),
    credit_limit: z
      .string()
      .refine((value) => !isNaN(Number(value)), {
        message: "credit limit must be a number",
      })
      .transform((value) => Number(value))
      .optional(),
    // employeeId_doc: z.any().optional(),
    // letter_doc: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    // Example: Cross-field validation
    if (!data.is_new) {
      ctx.addIssue({
        path: ["manual_card_id"],
        code: z.ZodIssueCode.custom,
        message: "manual card is required",
      });
    }

    if (data.has_phone && !data.phone) {
      ctx.addIssue({
        path: ["phone"],
        code: z.ZodIssueCode.custom,
        message: "Phone is required when has_phone is true",
      });
    }

    if (data.is_credit && !data.company_id) {
      ctx.addIssue({
        path: ["company_id"],
        code: z.ZodIssueCode.custom,
        message: "Company ID is required for credit payments",
      });
    }
    if (data.is_credit) {
      ctx.addIssue({
        path: ["credit_limit"],
        code: z.ZodIssueCode.custom,
        message: "Credit limit is required",
      });
    }
    if (data.company_id && !data.employeeId) {
      ctx.addIssue({
        path: ["employeeId"],
        code: z.ZodIssueCode.custom,
        message: "Employee ID is required when company ID is provided",
      });
    }

    // Emergency contact validations
    if (
      data.emergencyContact.relationship.toLowerCase() === "other" &&
      !data.emergencyContact.other_relation
    ) {
      ctx.addIssue({
        path: ["emergencyContact", "other_relation"],
        code: z.ZodIssueCode.custom,
        message: "Relationship type is required when relationship is 'Other'",
      });
    }

    if (!data.emergencyContact.is_the_same_address) {
      if (!data.emergencyContact.region_id) {
        ctx.addIssue({
          path: ["emergencyContact", "region_id"],
          code: z.ZodIssueCode.custom,
          message: "Region is required",
        });
      }
      if (!data.emergencyContact.city_id) {
        ctx.addIssue({
          path: ["emergencyContact", "city_id"],
          code: z.ZodIssueCode.custom,
          message: "City is required for emergency contact",
        });
      }
      if (!data.emergencyContact.subcity_id) {
        ctx.addIssue({
          path: ["emergencyContact", "subcity_id"],
          code: z.ZodIssueCode.custom,
          message: "Subcity is required for emergency contact",
        });
      }
      if (!data.emergencyContact.woreda_id) {
        ctx.addIssue({
          path: ["emergencyContact", "woreda_id"],
          code: z.ZodIssueCode.custom,
          message: "Woreda is required for emergency contact",
        });
      }
    }
  });

export const patientQuerySchema = z.object({
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
      "age_asc",
      "age_desc",
      "sex_asc",
      "sex_desc",
      "registration_date_asc", // Corrected spelling
      "registration_date_desc", // Corrected spelling
    ])
    .optional(),

  gender: z.enum(["male", "female"]).optional(), // Renamed for clarity
  isPaymentWayCredit: z.enum(["true", "false"]).optional(), // Renamed for clarity
  isRegistrationTypeNew: z.enum(["true", "false"]).optional(), // Renamed for clarity
});

export const createAllergySchema = z.object({
  allergy_type: z.string().trim().min(3),
  severity: z.enum(["Mild", "Moderate", "Severe"]),
  reaction_details: z.string().trim().optional(),
});

export const createFamilyHistorySchema = z.object({
  medical_condition: z.string().trim().min(3),
  relationship: z.string().trim().min(3),
});

export const createSocialHistorySchema = z.object({
  smoking_status: z.enum(["Current smoker", "Former smoker", "Non-smoker"]),
  alcohol_consumption: z.enum(["light", "moderate", "heavy"]),
  drug_use: z.enum(["never", "occasional", "regular"]),
});

export const createPastMedicalHistorySchema = z.object({
  medical_condition: z.string().trim().min(3),
  diagnosis_date: z.string().trim().optional(),
  treatment: z.string().trim().min(3),
});

export type PatientRegistrationInput = z.infer<
  typeof patientRegistrationSchema
>;
export type PatientQueryType = z.infer<typeof patientQuerySchema>;
export type createAllergyInput = z.infer<typeof createAllergySchema>;
export type createFamilyHistoryInput = z.infer<
  typeof createFamilyHistorySchema
>;
export type createSocialHistoryInput = z.infer<
  typeof createSocialHistorySchema
>;
export type createPastMedicalHistoryInput = z.infer<
  typeof createPastMedicalHistorySchema
>;
