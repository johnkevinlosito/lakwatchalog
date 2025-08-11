import { signIn as authSignin } from "@/lib/auth-client";
import { create } from "zustand";

interface AuthState {
  loading: boolean;
  signIn: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  loading: false,
  signIn: async () => {
    await authSignin.social(
      {
        provider: "github",
        callbackURL: "/dashboard",
      },
      {
        onRequest: () => {
          set({ loading: true });
        },
        onResponse: () => {
          set({ loading: false });
        },
      }
    );
  },
}));
