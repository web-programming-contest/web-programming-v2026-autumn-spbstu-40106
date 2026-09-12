import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  isAuthenticated: boolean
  username: string | null
  accessToken: string | null
  refreshToken: string | null
  login: (username: string, accessToken: string, refreshToken: string) => void
  logout: () => void
  updateTokens: (accessToken: string, refreshToken: string) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      username: null,
      accessToken: null,
      refreshToken: null,
      login: (username, accessToken, refreshToken) =>
        set({ isAuthenticated: true, username, accessToken, refreshToken }),
      logout: () =>
        set({
          isAuthenticated: false,
          username: null,
          accessToken: null,
          refreshToken: null,
        }),
      updateTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
    }),
    {
      name: 'gadget-hub-auth',
    },
  ),
)
