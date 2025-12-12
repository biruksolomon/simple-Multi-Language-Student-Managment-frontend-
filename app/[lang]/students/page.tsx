"use client"

import type { Language } from "@/lib/i18n"
import { t } from "@/lib/i18n"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, Calendar } from "lucide-react"

const mockStudents = [
  { id: 1, name: "Ahmed Hassan", email: "ahmed@example.com", phone: "+251912345678", enrollDate: "2024-01-01" },
  { id: 2, name: "Fatima Ali", email: "fatima@example.com", phone: "+251912345679", enrollDate: "2024-01-02" },
  { id: 3, name: "Mohammed Ibrahim", email: "mohammed@example.com", phone: "+251912345680", enrollDate: "2024-01-03" },
  { id: 4, name: "Aisha Ahmed", email: "aisha@example.com", phone: "+251912345681", enrollDate: "2024-01-04" },
  { id: 5, name: "Omar Saleh", email: "omar@example.com", phone: "+251912345682", enrollDate: "2024-01-05" },
]

export default function StudentsPage({ params }: { params: { lang: Language } }) {
  const { lang } = params

  return (
    <DashboardLayout lang={lang}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-neutral-900">{t("nav.students", lang)}</h1>
          <Button className="bg-blue-600 hover:bg-blue-700">Add New Student</Button>
        </div>

        <div className="flex gap-4">
          <Input placeholder="Search students..." className="flex-1" />
          <Button variant="outline">Filter</Button>
        </div>

        <div className="grid gap-4">
          {mockStudents.map((student) => (
            <Card key={student.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900 text-lg">{student.name}</h3>
                    <div className="mt-3 space-y-2 text-sm text-neutral-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {student.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {student.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Enrolled: {student.enrollDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
