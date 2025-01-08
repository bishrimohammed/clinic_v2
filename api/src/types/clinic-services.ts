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
      .min(3, ""),
    price: z.number().nonnegative().step(2),
    unit: z.string().optional(),
    isFixed: z.boolean(),
    isLab: z.boolean(),
    lab: z
      .object({
        isPanel: z.boolean(),
        panel_type: z.enum(["Panel", "UnderPanel", "Normal"]).optional(),
        underPanels: z.array(z.number()).optional(),
      })
      .optional()
      .superRefine((data, ctx) => {
        if (data?.isPanel && !data?.underPanels?.length) {
          ctx.addIssue({
            path: ["underPanels"],
            code: z.ZodIssueCode.custom,
            message: "Required",
          });
        }
      }),
  })
  .superRefine((data, ctx) => {
    if (data.isLab && !data.lab) {
      ctx.addIssue({
        path: ["lab"],
        code: z.ZodIssueCode.custom,
        message: "Lab info is Required",
      });
    }
    if (data.isLab && data.lab?.isPanel && !data.lab?.underPanels?.length) {
      ctx.addIssue({
        path: ["lab", "underPanels"],
        code: z.ZodIssueCode.custom,
        message: "Required",
      });
    }
  });
export type createClinicServiceT = z.infer<typeof createClinicServiceSchema>;
