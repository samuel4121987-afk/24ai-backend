import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  accessCode: string | null;
  userEmail: string | null;
  agentConnected: boolean;
  setAuth: (email: string, code: string) => void;
  logout: () => void;
  setAgentConnected: (connected: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      accessCode: null,
      userEmail: null,
      agentConnected: false,
      setAuth: (email, code) =>
        set({ isAuthenticated: true, userEmail: email, accessCode: code }),
      logout: () =>
        set({ isAuthenticated: false, userEmail: null, accessCode: null, agentConnected: false }),
      setAgentConnected: (connected) => set({ agentConnected: connected }),
    }),
    {
      name: 'ai-control-auth',
    }
  )
);