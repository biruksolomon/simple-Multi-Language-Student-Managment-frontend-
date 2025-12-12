"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function TeacherLoginPage() {
  const [email, setEmail] = useState("teacher@example.com")
  const [password, setPassword] = useState("password")
  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = () => {
    login(email, password, "teacher")
    router.push("/teacher/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Teacher Login</CardTitle>
          <CardDescription>Access your teaching dashboard</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="teacher@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClick={handleLogin} className="w-full bg-green-600 hover:bg-green-700">
            Login
          </Button>
          <div className="text-center">
            <Link href="/" className="text-sm text-green-600 hover:underline">
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
