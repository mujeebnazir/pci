import { create } from "zustand";
import AuthService from "@/lib/auth";

// Define types for the user session and state
interface AuthState {
  isLoggedIn: boolean;
  session: object | null;
  signUp: (email: string, password: string) => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  checkUserStatus: () => Promise<object | null>;
}

// Create the Zustand store with typed state and actions
const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  session: null,

  signUp: async (email: string, password: string) => {
    const success = await AuthService.signUp(email, password);
    if (success) {
      const user = await AuthService.getCurrentUser();
      set({ isLoggedIn: true, session: user });
    } else {
      set({ isLoggedIn: false, session: null });
    }
    return success;
  },

  signIn: async (email: string, password: string) => {
    const success = await AuthService.signIn(email, password);

    if (success) {
      const user = await AuthService.getCurrentUser();

      set({ isLoggedIn: true, session: user });
    } else {
      set({ isLoggedIn: false, session: null });
    }
    return success;
  },

  logout: async () => {
    const success = await AuthService.logout();
    if (success) {
      set({ isLoggedIn: false, session: null });
    }
    return success;
  },

  checkUserStatus: async () => {
    const user = await AuthService.getCurrentUser();
    set({ isLoggedIn: !!user, session: user });
    return user;
  },
}));

export default useAuthStore;
