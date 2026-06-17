import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserRole = "admin" | "manager" | "qa" | "employee";

type AuthUser = {
  email: string;
  role: UserRole;
};

type AuthState = {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (
    email: string,
    password: string,
  ) => {
    ok: boolean;
    error?: string;
  };
  logout: () => void;
};

const mockUsers: Record<string, { password: string; role: UserRole }> = {
  "admin@company.com": { password: "admin123", role: "admin" },
  "manager@company.com": { password: "manager123", role: "manager" },
  "qa@company.com": { password: "qa123", role: "qa" },
  "employee@company.com": { password: "employee123", role: "employee" },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      login: (email, password) => {
        const user = mockUsers[email];

        if (!user || user.password !== password) {
          return { ok: false, error: "Invalid email or password" };
        }

        set({
          user: { email, role: user.role },
          isLoggedIn: true,
        });

        return { ok: true };
      },

      logout: () => {
        set({
          user: null,
          isLoggedIn: false,
        });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
