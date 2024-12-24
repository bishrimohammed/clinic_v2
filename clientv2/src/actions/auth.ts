"use server";
import { SessionData, userInterface } from "@/store/auth";
import { cookies } from "next/headers";
import { z } from "zod";

// const userSchema = z.object({
//   id: z.number().int(),
//   name: z.string(),
//   role: z.string(),
//   is_new: z.boolean(),
//   digital_signature: z.string().nullable(),
//   doctor_titer: z.string().nullable(),
//   permissions: z.array(
//     z.object({
//       name: z.string(),
//       permissionId: z.number(),
//       create: z.boolean(),
//       read: z.boolean(),
//       edit: z.boolean(),
//       delete: z.boolean(),
//     })
//   ),
// });
export const createUserSession = async (sessionData: SessionData) => {
  try {
    const cookieStore = await cookies();
    cookieStore.set("user", JSON.stringify(sessionData.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60,
    });
    cookieStore.set("accessToken", JSON.stringify(sessionData.accessToken), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60,
    });
    cookieStore.set("refreshToken", JSON.stringify(sessionData.refreshToken), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
    });
    return { success: true };
  } catch (error) {
    console.log();
    return { success: false, error: "" };
  }
};

export const logout = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("user");
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    return { success: true };
  } catch (error) {
    console.error("Logout error " + error);
    return { success: false, error: "Logout Field" };
  }
};

export async function getServerUser() {
  const cookieStore = await cookies();
  const userCookies = cookieStore.get("user");
  if (!userCookies) return null;
  try {
    const user = JSON.parse(userCookies.value);
    return user as userInterface;
  } catch (error) {
    return null;
  }
}
