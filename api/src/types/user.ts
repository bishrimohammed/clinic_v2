import { z } from "zod";
import { timePattern } from "../utils/constants";

const userRegisterSchema = z.object({
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
  permissions: z
    .array(
      z
        .object({
          permission_id: z.number({
            required_error: "Permission ID is required",
          }),
          create: z.boolean({
            required_error: "Create permission is required",
          }),
          read: z.boolean({ required_error: "Read permission is required" }),
          edit: z.boolean({ required_error: "Edit permission is required" }),
          delete: z.boolean({
            required_error: "Delete permission is required",
          }),
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
    .min(1, "User must contain at least 1 permission"),
});

const userUpdateSchema = z.object({
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
    .min(6, "Password must be at least 6 characters long")
    .optional(),
  permissions: z
    .array(
      z
        .object({
          permission_id: z.number({
            required_error: "Permission ID is required",
          }),
          create: z.boolean({
            required_error: "Create permission is required",
          }),
          read: z.boolean({ required_error: "Read permission is required" }),
          edit: z.boolean({ required_error: "Edit permission is required" }),
          delete: z.boolean({
            required_error: "Delete permission is required",
          }),
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
    .min(1, "User must contain at least 1 permission"),
});

const user_login_schema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(3, "Username must be at least 3 characters long"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),
});

const changePasswordSchema = z.object({
  oldpassword: z.string({ required_error: "Old Password is required" }),
  newpassword: z
    .string({ required_error: "New Password is required" })
    .min(6, "New Password must be at least 6 characters long"),
});

const addDoctorWorkingHoursSchema = z
  .object({
    day_of_week: z.enum([
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]),
    start_time: z
      .string({ required_error: "Start time is required" })
      .regex(timePattern, { message: "Invalid time" })
      .time({
        message: "Start time must be a valid time",
      }),
    end_time: z
      .string({ required_error: "End time is required" })
      .regex(timePattern, { message: "Invalid time" })
      .time({
        message: "End time must be a valid time",
      }),
  })
  .superRefine((data, ctx) => {
    // compare start time and end time
    if (data.start_time >= data.end_time) {
      ctx.addIssue({
        path: ["start_time"],
        code: z.ZodIssueCode.custom,
        message: "Start time must be before end time",
      });
    }
  });

export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export type UserRegisterInput = z.infer<typeof userRegisterSchema>;
export type UserLoginInput = z.infer<typeof user_login_schema>;
export type changePasswordInput = z.infer<typeof changePasswordSchema>;
export type addDoctorWorkingHoursInput = z.infer<
  typeof addDoctorWorkingHoursSchema
>;
export {
  userRegisterSchema,
  user_login_schema,
  userUpdateSchema,
  changePasswordSchema,
  addDoctorWorkingHoursSchema,
};
