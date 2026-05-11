"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { logout } from "@/lib/auth";


export default function Navbar() {
  return (
    <nav className="border-b px-8 py-4 flex items-center justify-between">
      <Link href='/dashboard' className="text-xl font-bold">
        TrackJobs
      </Link>
      <div className="flex gap-4">
        <Link href='/dashboard' className="text-sm text-muted-foreground hover:text-foreground">
          Dashboard
        </Link>
        <Link href='/applications' className="text-sm text-muted-foreground hover:text-foreground">
          Applications
        </Link>
        <Button variant="ghost" size="sm" onClick={logout}>
          Logout
        </Button>
      </div>
    </nav>
  )
}