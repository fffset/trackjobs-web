export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token")
}

export const logout = async () => {
  await fetch("http://localhost:8000/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  window.location.href = "/login";
};