// // context/auth-store.ts
// context/auth-store.ts
"use client";

import { create } from "zustand";

type permission = {
  name: string;
  permissionId: number;
  create: boolean;
  read: boolean;
  edit: boolean;
  delete: boolean;
};

type userInterface = {
  user: {
    id: number;
    name: string;
    is_new: boolean;
    digital_signature: string | null;
    doctor_titer: string | null;
    role: string;
    permissions: permission[];
  };
};

type authState = {
  user: userInterface | null;
  token: string | null;
  login: (data: { user: userInterface | null; token: string | null }) => void;
  logout: () => void;
};

export const useAuth = create<authState>()((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: JSON.parse(localStorage.getItem("token") || "null"),
  //   user: null,
  //   token: null,
  login: async (data) => {
    set(() => ({
      user: data.user,
      token: data.token,
    }));
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    if (data.token) {
      localStorage.setItem("token", JSON.stringify(data.token));
    }
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set(() => ({
      user: null,
      token: null,
    }));
  },
}));
