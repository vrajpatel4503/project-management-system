import { User } from "firebase/auth";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  role: string | null;
  loading: boolean;

  setUser: (user: User | null) => void;
  setRole: (role: string | null) => void;
  setLoading: (loading: boolean) => void;

  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  loading: true,

  setUser: (user) => set({ user }),

  setRole: (role) => set({ role }),

  setLoading: (loading) => set({ loading }),

  clearAuth: () =>
    set({
      user: null,
      role: null,
      loading: false,
    }),
}));
