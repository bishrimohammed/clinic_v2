"use server";
import API from "@/lib/axios-client";
import { SessionData, userInterface } from "@/store/auth";
import { loginData } from "@/types/auth";
import { cookies } from "next/headers";
import { z } from "zod";

export const loginAction = async (data: loginData) =>
  await API.post<SessionData>("/users/login", data);

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
