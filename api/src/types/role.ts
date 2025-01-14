import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string({}).trim().min(3),
  permissions: z
    .array(
      z
        .object({
          permission_id: z.number(),
          create: z.boolean(),
          read: z.boolean(),
          edit: z.boolean(),
          delete: z.boolean(),
        })
        .superRefine((data, ctx) => {
          if ((data.create || data.edit || data.delete) && !data.read) {
            ctx.addIssue({
              path: ["read"],
              code: z.ZodIssueCode.custom,
              message: "Read permission must be true",
            });
          }
        })
    )
    .min(1, "Role must contain at least 1 permission"),
});

export type createRoleT = z.infer<typeof createRoleSchema>;
