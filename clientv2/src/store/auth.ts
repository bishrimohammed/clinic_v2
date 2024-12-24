import { createUserSession, logout } from "@/actions/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";
type permission = {
  name: string;
  permissionId: number;
  create: boolean;
  read: boolean;
  edit: boolean;
  delete: boolean;
};

export type userInterface = {
  id: number;
  name: string;
  is_new: boolean;
  digital_signature: string | null;
  doctor_titer: string | null;
  role: string;
  permissions: permission[];
};

export type SessionData = {
  user: userInterface;
  accessToken: string;
  refreshToken: string;
};

interface userSessionStore {
  user: userInterface | null;
  setUser: (userData: userInterface) => Promise<void>;
  clearSession: () => Promise<void>;
}

export const useUserSession = create<userSessionStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: async (userData) => {
        try {
          //   const result = await createUserSession(sessionData);
          set({
            user: userData,
          });
        } catch (error) {
          console.error("Session creation error " + error);
        }
      },
      clearSession: async () => {
        try {
          const result = await logout();
          if (result.success) {
            set({ user: null });
          } else {
            throw new Error("logout Failed");
          }
        } catch (error) {
          console.error("Session logout error " + error);
        }
      },
    }),
    {
      name: "user-session",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
