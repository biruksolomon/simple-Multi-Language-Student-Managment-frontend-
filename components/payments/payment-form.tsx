"use client"

import type React from "react"

import { useState } from "react"
import type { Language } from "@/lib/i18n"
import { t } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { CreditCard } from "lucide-react"

interface PaymentFormProps {
  lang: Language
  studentId: string
  studentName: string
  studentEmail: string
  courseTitle: string
  amount: number
}

export function PaymentForm({ lang, studentId, studentName, studentEmail, courseTitle, amount }: PaymentFormProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const isRTL = lang === "ar"

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const [firstName, ...lastNameParts] = studentName.split(" ")
      const lastName = lastNameParts.join(" ") || "Student"

      const response = await fetch("/api/payments/chapa-init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          amount,
          currency: "ETB",
          description: `Payment for ${courseTitle}`,
          email: studentEmail,
          firstName,
          lastName,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Payment initialization failed")
      }

      const data = await response.json()

      if (data.data?.checkout_url) {
        // Redirect to Chapa checkout
        window.location.href = data.data.checkout_url
      } else {
        throw new Error("No checkout URL received")
      }
    } catch (error) {
      toast({
        title: t("common.error", lang),
        description: error instanceof Error ? error.message : "Payment failed",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className={isRTL ? "rtl" : "ltr"} dir={isRTL ? "rtl" : "ltr"}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          {t("payment.method", lang)}
        </CardTitle>
        <CardDescription>{courseTitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePayment} className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium text-neutral-700">{t("payment.amount", lang)}:</span>
              <span className="text-2xl font-bold text-blue-600">{amount} ETB</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("student.email", lang)}</Label>
            <Input type="email" value={studentEmail} disabled className="bg-neutral-100" />
          </div>

          <div className="space-y-2">
            <Label>Student Name</Label>
            <Input type="text" value={studentName} disabled className="bg-neutral-100" />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
            {loading ? t("common.loading", lang) : `Pay ${amount} ETB`}
          </Button>

          <p className="text-xs text-neutral-500 text-center">Secure payment powered by Chapa</p>
        </form>
      </CardContent>
    </Card>
  )
}
