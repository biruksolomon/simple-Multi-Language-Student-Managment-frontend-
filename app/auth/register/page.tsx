"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (formData.fullName && formData.email && formData.password && formData.password === formData.confirmPassword) {
      setSubmitted(true)
      setTimeout(() => {
        router.push("/auth/pending-approval")
      }, 2000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Student Registration</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {submitted && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700 ml-2">
                Registration successful! Waiting for admin approval...
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Ahmed Hassan"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="student@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="+251912345678"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <Button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700">
            Register
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/student-login" className="text-blue-600 font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
