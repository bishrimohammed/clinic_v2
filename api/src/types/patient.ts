import { z } from "zod";

const phoneRegex = /^(07|09)\d{8}$/;

const patientRegistrationSchema = z
  .object({
    patientId: z.string().optional(),
    registrationDate: z.date().optional(),
    firstName: z.string().trim().min(1, "Patient name is required"),
    middleName: z.string().trim().min(1, "Father Name is required"),
    lastName: z.string().trim().optional(),
    gender: z.string().min(1, "Sex is required"),
    blood_type: z.string().optional(),
    nationality: z.string().optional(),
    marital_status: z.string().optional(),
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
    manual_card_id: z.string().trim().optional(),
    is_credit: z.boolean({ required_error: "Payment type is required" }),
    address: z.object({
      street: z.string().optional(),
      region_id: z.string().min(1, "Region is required"),
      city_id: z.string().min(1, "City is required"),
      subcity_id: z.string().min(1, "Subcity is required"),
      woreda_id: z.string().min(1, "Woreda is required"),
      house_number: z.string().optional(),
      email: z.string().email("Invalid email").optional(),
      phone_2: z
        .string()
        .optional()
        .refine(
          (value) => !value || phoneRegex.test(value),
          "Phone number is invalid"
        ),
    }),
    emergency: z.object({
      firstName: z
        .string()
        .trim()
        .min(3, "First Name must be at least 3 characters long"),
      middleName: z
        .string()
        .trim()
        .min(3, "Father Name must be at least 3 characters long"),
      lastName: z.string().trim().optional(),
      relation: z.string().min(1, "Relationship is required"),
      phone: z.string().regex(phoneRegex, "Phone number is invalid"),
      the_same_address_as_patient: z.boolean().optional(),
      other_relation: z.string().trim().optional(),
      region_id: z.string().optional(),
      city_id: z.string().optional(),
      subcity_id: z.string().optional(),
      woreda_id: z.string().optional(),
      house_number: z.string().trim().optional(),
    }),
    isUpdate: z.boolean().default(false),
    company_id: z.string().optional(),
    employeeId: z.string().optional(),
    employeeId_doc: z.any().optional(),
    letter_doc: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    // Example: Cross-field validation
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

    if (data.company_id && !data.employeeId) {
      ctx.addIssue({
        path: ["employeeId"],
        code: z.ZodIssueCode.custom,
        message: "Employee ID is required when company ID is provided",
      });
    }

    // Emergency contact validations
    if (data.emergency.relation === "Other" && !data.emergency.other_relation) {
      ctx.addIssue({
        path: ["emergency", "other_relation"],
        code: z.ZodIssueCode.custom,
        message: "Relationship type is required when relation is 'Other'",
      });
    }

    if (!data.emergency.the_same_address_as_patient) {
      if (!data.emergency.region_id) {
        ctx.addIssue({
          path: ["emergency", "region_id"],
          code: z.ZodIssueCode.custom,
          message: "Region is required for emergency contact",
        });
      }
      if (!data.emergency.city_id) {
        ctx.addIssue({
          path: ["emergency", "city_id"],
          code: z.ZodIssueCode.custom,
          message: "City is required for emergency contact",
        });
      }
      if (!data.emergency.subcity_id) {
        ctx.addIssue({
          path: ["emergency", "subcity_id"],
          code: z.ZodIssueCode.custom,
          message: "Subcity is required for emergency contact",
        });
      }
      if (!data.emergency.woreda_id) {
        ctx.addIssue({
          path: ["emergency", "woreda_id"],
          code: z.ZodIssueCode.custom,
          message: "Woreda is required for emergency contact",
        });
      }
    }
  });

export type PatientRegistrationInput = z.infer<
  typeof patientRegistrationSchema
>;
export { patientRegistrationSchema };
