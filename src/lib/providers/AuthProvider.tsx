"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { getProfile } from "@/lib/api/clientApi";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser, clearAuth } = useAuthStore();

  useEffect(() => {
    async function initAuth() {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch {
        clearAuth();
      }
    }

    initAuth();
  }, [setUser, clearAuth]);

  return <>{children}</>;
};
