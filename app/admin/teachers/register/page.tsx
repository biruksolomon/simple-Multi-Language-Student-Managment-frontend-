"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function RegisterTeacherPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    qualifications: "",
    experience: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Success!",
        description: "Teacher registered successfully",
      })

      router.push("/admin/teachers")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register teacher",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <Link href="/admin/teachers">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Teachers
        </Button>
      </Link>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Register New Teacher</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <Input name="phone" value={formData.phone} onChange={handleChange} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                required
              >
                <option value="">Select Department</option>
                <option value="mathematics">Mathematics</option>
                <option value="languages">Languages</option>
                <option value="sciences">Sciences</option>
                <option value="social">Social Studies</option>
                <option value="arts">Arts</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Qualifications</label>
              <Input
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                placeholder="e.g., BA in Mathematics, MA in Education"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Years of Experience</label>
              <Input type="number" name="experience" value={formData.experience} onChange={handleChange} min="0" />
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
                {loading ? "Registering..." : "Register Teacher"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
