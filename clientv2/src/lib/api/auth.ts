import { loginData } from "@/types/auth";
import API from "../axios-client";

export const loginMutationFn = async (data: loginData) =>
  await API.post("/users/login", data);
