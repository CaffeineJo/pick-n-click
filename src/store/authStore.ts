import { create } from 'zustand';

type AuthState = {
  user: { id: string; email: string; nickname: string } | null;
  accessToken: string | null;
  refreshToken: string | null;
  login: (
    user: { id: string; email: string; nickname: string },
    accessToken: string,
    refreshToken: string,
  ) => void;
  logout: () => void;
};

const useAuthStore = create<AuthState>()((set) => ({
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
}));

export default useAuthStore;
