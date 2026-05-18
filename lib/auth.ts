import { useAuthStore } from './auth-store';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const logout = async () => {
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  useAuthStore.getState().setAuthenticated(false);
  window.location.href = "/login";
};