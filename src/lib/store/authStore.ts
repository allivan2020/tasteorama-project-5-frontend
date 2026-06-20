import { create } from "zustand";
import { User } from "@/app/types/user";

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;

  isHydrated: boolean;
  setHydrated: () => void;

  setUser: (user: User) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,

  isHydrated: false,

  setHydrated: () =>
    set({
      isHydrated: true,
    }),

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));