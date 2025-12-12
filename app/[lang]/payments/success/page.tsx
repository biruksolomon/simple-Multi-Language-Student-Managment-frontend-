"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import type { Language } from "@/lib/i18n"
import { t } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function PaymentSuccessPage({ params }: { params: { lang: Language } }) {
  const { lang } = params
  const searchParams = useSearchParams()
  const router = useRouter()
  const [paymentStatus, setPaymentStatus] = useState<"loading" | "success" | "failed">("loading")
  const [paymentDetails, setPaymentDetails] = useState<Record<string, string>>({})

  useEffect(() => {
    const verifyPayment = async () => {
      const txRef = searchParams.get("tx_ref")
      if (!txRef) {
        setPaymentStatus("failed")
        return
      }

      try {
        const response = await fetch(`/api/payments/verify?tx_ref=${txRef}`)
        const data = await response.json()

        if (data.success && data.data.status === "success") {
          setPaymentStatus("success")
          setPaymentDetails({
            txRef,
            amount: data.data.amount,
            currency: data.data.currency,
            email: data.data.email,
          })
        } else {
          setPaymentStatus("failed")
        }
      } catch (error) {
        setPaymentStatus("failed")
      }
    }

    verifyPayment()
  }, [searchParams])

  const isRTL = lang === "ar"

  return (
    <main className="min-h-screen flex items-center justify-center bg-neutral-50 p-4" dir={isRTL ? "rtl" : "ltr"}>
      <Card className="w-full max-w-md">
        {paymentStatus === "loading" && (
          <CardContent className="pt-6 text-center">
            <div className="animate-spin inline-block">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full" />
            </div>
            <p className="mt-4 text-neutral-600">{t("common.loading", lang)}</p>
          </CardContent>
        )}

        {paymentStatus === "success" && (
          <>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <CardTitle className="text-green-600">Payment Successful!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Transaction Ref:</span>
                  <span className="font-mono text-neutral-900">{paymentDetails.txRef}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Amount:</span>
                  <span className="font-bold">
                    {paymentDetails.amount} {paymentDetails.currency}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Email:</span>
                  <span className="text-neutral-900">{paymentDetails.email}</span>
                </div>
              </div>
              <Button
                onClick={() => router.push(`/${lang}/dashboard`)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Back to Dashboard
              </Button>
            </CardContent>
          </>
        )}

        {paymentStatus === "failed" && (
          <>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <AlertCircle className="w-16 h-16 text-red-500" />
              </div>
              <CardTitle className="text-red-600">{t("common.error", lang)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-neutral-600 text-center">Payment verification failed. Please try again.</p>
              <Button onClick={() => router.push(`/${lang}/payments`)} variant="outline" className="w-full">
                Return to Payment
              </Button>
              <Button
                onClick={() => router.push(`/${lang}/dashboard`)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Back to Dashboard
              </Button>
            </CardContent>
          </>
        )}
      </Card>
    </main>
  )
}
