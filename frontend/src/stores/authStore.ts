import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthTokens, LoginCredentials, RegisterCredentials } from '@/types/auth';
import { apiClient } from '@/lib/api';

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });
        try {
          const tokens = await apiClient.post<AuthTokens>('/auth/login', credentials);
          const user = await apiClient.get<User>('/users/profile');

          set({
            tokens,
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (credentials: RegisterCredentials) => {
        set({ isLoading: true });
        try {
          const user = await apiClient.post<User>('/auth/register', credentials);
          // Auto-login after registration
          await get().login({ email: credentials.email, password: credentials.password });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          tokens: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      fetchProfile: async () => {
        try {
          const user = await apiClient.get<User>('/users/profile');
          set({ user });
        } catch (error) {
          console.error('Failed to fetch profile:', error);
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        tokens: state.tokens,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);