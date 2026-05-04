"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })

      if (!res.ok) {
        setError("Invalid email or password");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      router.push("/dashboard")
    } catch {
      setError("Something went wrong");

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">TrackJobs</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input name="email" type="email" placeholder="Email" onChange={handleChange} />
            <Input name="password" type="password" placeholder="Password" onChange={handleChange} />
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" disabled={isLoading} >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}