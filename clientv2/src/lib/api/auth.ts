import { loginData } from "@/types/auth";
import API from "../axios-client";
import { SessionData } from "@/store/auth";

// type permission = {
//   name: string;
//   permissionId: number;
//   create: boolean;
//   read: boolean;
//   edit: boolean;
//   delete: boolean;
// };

// type userInterface = {
//   user: {
//     id: number;
//     name: string;
//     is_new: boolean;
//     digital_signature: string | null;
//     doctor_titer: string | null;
//     role: string;
//     permissions: permission[];
//   };
//   token: string;
// };
export const loginMutationFn = async (data: loginData) =>
  await API.post<SessionData>("/users/login", data);
