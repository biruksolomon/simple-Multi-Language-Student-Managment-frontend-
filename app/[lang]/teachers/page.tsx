"use client"

import type { Language } from "@/lib/i18n"
import { t } from "@/lib/i18n"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, BookOpen, Award } from "lucide-react"

const mockTeachers = [
  {
    id: "1",
    name: "Dr. Ahmed Hassan",
    email: "ahmed.hassan@academy.com",
    phone: "+251912345678",
    specialty: "Mathematics",
    courses: 3,
    rating: 4.8,
  },
  {
    id: "2",
    name: "Prof. Fatima Ali",
    email: "fatima.ali@academy.com",
    phone: "+251912345679",
    specialty: "Physics",
    courses: 2,
    rating: 4.9,
  },
  {
    id: "3",
    name: "Mr. Mohamed Ibrahim",
    email: "mohamed.ibrahim@academy.com",
    phone: "+251912345680",
    specialty: "English",
    courses: 4,
    rating: 4.7,
  },
]

export default function TeachersPage({ params }: { params: { lang: Language } }) {
  const { lang } = params

  return (
    <DashboardLayout lang={lang}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-neutral-900">{t("nav.teachers", lang)}</h1>
          <Button className="bg-blue-600 hover:bg-blue-700">Add New Teacher</Button>
        </div>

        <div className="flex gap-4">
          <Input placeholder="Search teachers..." className="flex-1" />
          <Button variant="outline">Filter</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockTeachers.map((teacher) => (
            <Card key={teacher.id}>
              <CardHeader>
                <CardTitle className="text-lg">{teacher.name}</CardTitle>
                <p className="text-sm text-neutral-600">{teacher.specialty}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-neutral-700">
                  <Mail className="w-4 h-4" />
                  {teacher.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral-700">
                  <Phone className="w-4 h-4" />
                  {teacher.phone}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-lg">{teacher.courses}</span>
                    </div>
                    <p className="text-xs text-neutral-500">Courses</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold text-lg">{teacher.rating}</span>
                    </div>
                    <p className="text-xs text-neutral-500">Rating</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-3">
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
