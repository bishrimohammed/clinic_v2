import { z } from "zod";

export const createClinicServiceSchema = z.object({
  service_name: z
    .string({ required_error: "Service name is Required" })
    .trim()
    .min(3, ""),
  hasManyCategory: z.boolean(),
});
export const updateClinicServiceSchema = createClinicServiceSchema;

export const createServiceCategorySchema = z.object({
  category_name: z
    .string({ required_error: "Service category is Required" })
    .trim()
    .min(3, ""),
});
export const updateServiceCategorySchema = z.object({
  category_name: z
    .string({ required_error: "Service category is Required" })
    .trim()
    .min(3, ""),
  clinicService_id: z.number().int().positive(),
});

export const createServiceItemSchema = z
  .object({
    item_name: z
      .string({ required_error: "Item name is Required" })
      .trim()
      .min(3, "Item name must be at least 3 characters"),
    serviceCategory_id: z.number().int().nonnegative(),
    price: z.number({}).nonnegative(),
    unit: z.string().optional(),
    isFixed: z.boolean(),
    isLab: z.boolean(),
    lab: z
      .object({
        isPanel: z.boolean(),
        isUnderPanel: z.boolean(),
        panel_type: z.enum(["Panel", "UnderPanel", "Normal"]).optional(),
        referenceRange: z.string().trim().optional(),
        underPanels: z
          .array(
            z.union([
              z.number().int().nonnegative(),
              z
                .string()
                .refine((value) => !isNaN(Number(value)), {
                  message: "must be a number",
                })
                .transform((value) => Number(value)),
            ])
          )
          .optional(),
      })
      .optional()
      .superRefine((data, ctx) => {
        if (data?.isPanel && !data?.underPanels?.length) {
          ctx.addIssue({
            path: ["underPanels"],
            code: z.ZodIssueCode.custom,
            message: "must be at least 1 underPanel",
          });
        }

        if (data?.isPanel && data?.isUnderPanel) {
          ctx.addIssue({
            path: ["isPanel"],
            code: z.ZodIssueCode.custom,
            message: "isPanel and isUnderPanel can't be true at the same time",
          });
        }
      }),
  })
  .superRefine((data, ctx) => {
    if (data.isLab && !data.lab) {
      ctx.addIssue({
        path: ["lab"],
        code: z.ZodIssueCode.custom,
        message: "Lab info detail is Required",
      });
    }
    // if (data.isLab && data.lab?.isPanel && !data.lab?.underPanels?.length) {
    //   ctx.addIssue({
    //     path: ["lab", "underPanels"],
    //     code: z.ZodIssueCode.custom,
    //     message: "Required",
    //   });
    // }
    if (data.isLab && data.lab?.isUnderPanel && data.price > 0) {
      ctx.addIssue({
        path: ["price"],
        code: z.ZodIssueCode.custom,
        message: "Price must be 0",
      });
    }
  });
export type createClinicServiceT = z.infer<typeof createClinicServiceSchema>;
export type createServiceItemT = z.infer<typeof createServiceItemSchema>;
