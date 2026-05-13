export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token")
}

export const logout = async () => {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  window.location.href = "/login";
};