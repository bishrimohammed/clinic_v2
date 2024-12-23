import { z } from "zod";

const user_register_schema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(3, "Username must be at least 3 characters long"),
  employeeId: z
    .number({ required_error: "Employee ID is required" })
    .int("Employee ID must be an integer"),
  role_id: z
    .number({ required_error: "Role ID is required" })
    .int("Role ID must be an integer"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),
  permissions: z.array(
    z.object({
      permissionId: z.number({ required_error: "Permission ID is required" }),
      create: z.boolean({ required_error: "Create permission is required" }),
      read: z.boolean({ required_error: "Read permission is required" }),
      edit: z.boolean({ required_error: "Edit permission is required" }),
      delete: z.boolean({ required_error: "Delete permission is required" }),
    })
  ),
});

const user_update_schema = z
  .object({
    username: z
      .string({ required_error: "Username is required" })
      .min(3, "Username must be at least 3 characters long"),
    employeeId: z
      .number({ required_error: "Employee ID is required" })
      .int("Employee ID must be an integer"),
    role_id: z
      .number({ required_error: "Role ID is required" })
      .int("Role ID must be an integer"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long"),
    permissions: z.array(
      z.object({
        permissionId: z.number({ required_error: "Permission ID is required" }),
        create: z.boolean({ required_error: "Create permission is required" }),
        read: z.boolean({ required_error: "Read permission is required" }),
        edit: z.boolean({ required_error: "Edit permission is required" }),
        delete: z.boolean({ required_error: "Delete permission is required" }),
      })
    ),
    isUpdatePassword: z
      .boolean({ required_error: "isUpdatePassword is required" })
      .default(false),
  })
  .refine(
    (data) => {
      if (data.isUpdatePassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required",
      path: ["password"],
    }
  );

const user_login_schema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(3, "Username must be at least 3 characters long"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),
});

export type UserUpdateInput = z.infer<typeof user_update_schema>;
export type UserRegisterInput = z.infer<typeof user_register_schema>;
export type UserLoginInput = z.infer<typeof user_login_schema>;
export { user_register_schema, user_login_schema, user_update_schema };
