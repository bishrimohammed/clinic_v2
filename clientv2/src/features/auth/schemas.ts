import { z } from "zod";

export const loginSchema = z.object({
  username: z.string({ required_error: "Username is required" }).min(3),
  // .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});
