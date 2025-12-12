import { type NextRequest, NextResponse } from "next/server"

const CHAPA_API_URL = process.env.NEXT_PUBLIC_CHAPA_API_URL || "https://api.chapa.co/v1"
const CHAPA_AUTH_KEY = process.env.CHAPA_AUTH_KEY
const CHAPA_WEBHOOK_KEY = process.env.CHAPA_WEBHOOK_KEY

export async function POST(request: NextRequest) {
  try {
    const { studentId, amount, currency = "ETB", description, email, firstName, lastName } = await request.json()

    if (!CHAPA_AUTH_KEY) {
      return NextResponse.json({ error: "Chapa configuration missing" }, { status: 500 })
    }

    const txRef = `TX-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    const payload = {
      amount: String(amount),
      currency,
      email,
      first_name: firstName,
      last_name: lastName,
      tx_ref: txRef,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/chapa-callback`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/payments/success`,
      description,
      customization: {
        title: "Academic Management System",
        description: description || "Course Payment",
      },
    }

    const response = await fetch(`${CHAPA_API_URL}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${CHAPA_AUTH_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json({ error: error.message || "Failed to initialize payment" }, { status: response.status })
    }

    const data = await response.json()

    // Save transaction reference to database
    // TODO: Connect to database to store payment record
    // await db.payments.create({
    //   student_id: studentId,
    //   amount,
    //   currency,
    //   transaction_ref: txRef,
    //   status: 'pending',
    //   description
    // })

    return NextResponse.json({
      success: true,
      data: data.data,
      txRef,
    })
  } catch (error) {
    console.error("Payment initialization error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
