import { z } from "zod";
import {
  addressSchema,
  createEmergencyContactSchema,
  phoneRegex,
  preprocessBoolean,
  updateEmergencyContactSchema,
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
    marital_status: z.string().trim().optional(),
    guardian_name: z.string().trim().optional(),
    guardian_relationship: z.string().trim().optional(),
    occupation: z.string().trim().optional(),
    has_phone: preprocessBoolean,
    // phone: z.string().regex(phoneRegex, "Phone number is invalid").optional(),
    phone: z
      .string()
      .optional()
      .refine((val) => !val || phoneRegex.test(val), {
        message: "Phone number is invalid",
      }),
    birth_date: z.preprocess((val) => {
      if (typeof val === "string") {
        const parsedDate = new Date(val);
        return isNaN(parsedDate.getTime()) ? null : parsedDate; // Return null for invalid dates
      }
      return val; // Return the original value if not a string
    }, z.date({ required_error: "Date of Birth is required" }).max(new Date(), "Date must be less than or equal to today").min(new Date("1900-01-01"), "Date of Birth must be after 1900-01-01")),
    is_new: preprocessBoolean,
    manual_card_id: z.string().trim().optional(),
    is_credit: preprocessBoolean,
    // ({ required_error: "Payment type is required" }),
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

    if (data.is_credit) {
      if (!data.company_id) {
        ctx.addIssue({
          path: ["company_id"],
          code: z.ZodIssueCode.custom,
          message: "Company ID is required for credit payments",
        });
      }

      if (!data.credit_limit) {
        ctx.addIssue({
          path: ["credit_limit"],
          code: z.ZodIssueCode.custom,
          message: "Credit limit is required",
        });
      }

      if (!data.employeeId) {
        ctx.addIssue({
          path: ["employeeId"],
          code: z.ZodIssueCode.custom,
          message: "Employee ID is required",
        });
      }
    }
  });

export const updatePatientSchema = z
  .object({
    patientId: z.string().optional(), // Assuming patientId is not being updated
    registrationDate: z.date().optional(),
    firstName: z.string().trim().min(3).optional(),
    middleName: z.string().trim().min(3).optional(),
    lastName: z.string().trim().optional(),
    gender: z.enum(["Male", "Female"]).optional(),
    blood_type: z
      .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
      .optional(),
    nationality: z.string().optional(),
    marital_status: z.string().trim().optional(),
    guardian_name: z.string().trim().optional(),
    guardian_relationship: z.string().trim().optional(),
    occupation: z.string().trim().optional(),
    has_phone: preprocessBoolean.optional(),
    phone: z
      .string()
      .optional()
      .refine((val) => !val || phoneRegex.test(val), {
        message: "Phone number is invalid",
      }),
    birth_date: z
      .preprocess((val) => {
        if (typeof val === "string") {
          const parsedDate = new Date(val);
          return isNaN(parsedDate.getTime()) ? null : parsedDate;
        }
        return val;
      }, z.date().max(new Date(), "Date must be less than or equal to today").min(new Date("1900-01-01"), "Date of Birth must be after 1900-01-01"))
      .optional(),
    is_new: preprocessBoolean.optional(),
    manual_card_id: z.string().trim().optional(),
    is_credit: preprocessBoolean.optional(),
    address: addressSchema.optional(),
    emergencyContact: createEmergencyContactSchema.optional(),
    company_id: z
      .string()
      .refine((value) => !isNaN(Number(value)), {
        message: "Company ID must be a number",
      })
      .transform(Number)
      .optional(),
    employeeId: z
      .string()
      .refine((value) => !isNaN(Number(value)), {
        message: "Employee ID must be a number",
      })
      .transform(Number)
      .optional(),
    credit_limit: z
      .string()
      .refine((value) => !isNaN(Number(value)), {
        message: "Credit limit must be a number",
      })
      .transform(Number)
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.has_phone && !data.phone) {
      ctx.addIssue({
        path: ["phone"],
        code: z.ZodIssueCode.custom,
        message: "Phone is required when has_phone is true",
      });
    }

    if (data.is_credit) {
      if (!data.company_id) {
        ctx.addIssue({
          path: ["company_id"],
          code: z.ZodIssueCode.custom,
          message: "Company ID is required for credit payments",
        });
      }

      if (!data.credit_limit) {
        ctx.addIssue({
          path: ["credit_limit"],
          code: z.ZodIssueCode.custom,
          message: "Credit limit is required",
        });
      }

      if (!data.employeeId) {
        ctx.addIssue({
          path: ["employeeId"],
          code: z.ZodIssueCode.custom,
          message: "Employee ID is required",
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
  reaction_details: z.string().trim().optional().nullable(),
});

export const createFamilyHistorySchema = z.object({
  medical_condition: z.string().trim().min(3),
  relationship: z.string().trim().min(3),
});

export const createSocialHistorySchema = z.object({
  smoking_status: z.enum(["Current smoker", "Former smoker", "Non-smoker"]),
  alcohol_consumption: z.enum(["light", "moderate", "heavy"]),
  drug_use: z.enum(["never", "occasional", "regular"]).optional().nullable(),
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
