import { z, ZodIssueCode } from "zod";

const addMedicalRecordSymptomsSchema = z.object({
  chiefComplaint: z
    .array(z.string().trim())
    .min(1, "At least one chief Complaint is required")
    .max(1000),
  HPI: z.string().trim(),
});

const addVitalSignSchema = z
  .array(
    z.object({
      vitalSignFieldId: z.string().trim(),
      value: z.string().trim().optional(),
    })
  )
  .superRefine((data, ctx) => {
    // at least one vitalsigns has both vitalSignFieldId and value is not empty

    const hasVitalSignFieldId = data.some(
      (vitalSign) => vitalSign.vitalSignFieldId && vitalSign.value
    );
    if (!hasVitalSignFieldId) {
      ctx.addIssue({
        path: [0],
        code: ZodIssueCode.custom,
        message: " ",
      });
    }
  });

export type addVitalSignType = z.infer<typeof addVitalSignSchema>;
export type addMedicalRecordSymptomsType = z.infer<
  typeof addMedicalRecordSymptomsSchema
>;
