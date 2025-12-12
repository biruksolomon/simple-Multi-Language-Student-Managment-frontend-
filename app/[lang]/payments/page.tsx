"use client"

import type { Language } from "@/lib/i18n"
import { DashboardLayout } from "@/components/dashboard/layout"
import { PaymentForm } from "@/components/payments/payment-form"
import { useState } from "react"

export default function PaymentsPage({ params }: { params: { lang: Language } }) {
  const { lang } = params
  const [studentData, setStudentData] = useState({
    id: "student-001",
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
  })

  return (
    <DashboardLayout lang={lang}>
      <div className="max-w-md mx-auto">
        <PaymentForm
          lang={lang}
          studentId={studentData.id}
          studentName={studentData.name}
          studentEmail={studentData.email}
          courseTitle="Advanced Python Programming"
          amount={500}
        />
      </div>
    </DashboardLayout>
  )
}
