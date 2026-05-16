import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_USERS } from "../data/mockData";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: MOCK_USERS[0], // Pre-authenticated as Khushbu
      token: "mock-proto-token",
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: "taskorbit-auth",
    }
  )
);
