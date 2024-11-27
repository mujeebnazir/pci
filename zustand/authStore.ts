import { create } from "zustand";
import AuthService from "@/lib/auth";

// Define types for the user session and state
interface AuthState {
  isLoggedIn: boolean;
  session: object | null;
  signUp: (email: string, password: string) => Promise<{ success: boolean; message?: string; }>;
  signIn: (email: string, password: string) => Promise<{ session: any; account: any }>;
  logout: () => Promise<boolean>;
  checkUserStatus: () => Promise<object | null>;
}

// Create the Zustand store with typed state and actions
const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  session: null,

  signUp: async (email: string, password: string) => {
    const result = await AuthService.signUp(email, password);
  
    if (result.success) {
      const user = await AuthService.getCurrentUser();
      set({ isLoggedIn: true, session: user });
      return { success: true, session: user };
    } else {
      set({ isLoggedIn: false, session: null });
      return { success: false, message: result.message, session: null };
    }
},
  

  signIn: async (email: string, password: string) => {
    const { session , account} = await AuthService.signIn(email, password);

    if (session) {
      const user = await AuthService.getCurrentUser();
      set({ isLoggedIn: true, session: user });
    } else {
      set({ isLoggedIn: false, session: null });
    }
    return {session, account};
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
