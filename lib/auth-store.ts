import { create } from 'zustand';

type AuthState = {
  isAuthenticated: boolean | null; // null = henüz kontrol edilmedi
  setAuthenticated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: null,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
}));