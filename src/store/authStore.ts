import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  user: { email: string; nickname: string } | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (
    user: { email: string; nickname: string },
    accessToken: string,
    refreshToken: string,
  ) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      login: (user, accessToken, refreshToken) =>
        set({
          user,
          accessToken,
          refreshToken,
        }),
      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export default useAuthStore;
