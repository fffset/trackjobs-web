"use client"

import { getToken } from "@/lib/auth";
import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (!getToken()) {
      router.push("/login")
    }
  }, [router])

  if (!getToken()) return null;

  return <>{children}</>
}