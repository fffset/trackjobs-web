"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, setAuthenticated } = useAuthStore();

  useEffect(() => {
    // Zaten kontrol edildiyse tekrar atma
    if (isAuthenticated !== null) return;

    const checkAuth = async () => {
      try {
        let res = await fetch(`${API_URL}/auth/me`, {
          credentials: "include",
        });

        if (res.status === 401) {
          const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
          });

          if (refreshRes.ok) {
            res = await fetch(`${API_URL}/auth/me`, {
              credentials: "include",
            });
          }
        }

        if (res.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          router.push("/login");
        }
      } catch {
        setAuthenticated(false);
        router.push("/login");
      }
    };

    checkAuth();
  }, [isAuthenticated, router, setAuthenticated]);

  if (isAuthenticated === null) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );

  if (!isAuthenticated) return null;

  return <>{children}</>;
}