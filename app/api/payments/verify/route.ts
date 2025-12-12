import { type NextRequest, NextResponse } from "next/server"

const CHAPA_API_URL = process.env.NEXT_PUBLIC_CHAPA_API_URL || "https://api.chapa.co/v1"
const CHAPA_AUTH_KEY = process.env.CHAPA_AUTH_KEY

export async function GET(request: NextRequest) {
  try {
    const txRef = request.nextUrl.searchParams.get("tx_ref")

    if (!txRef || !CHAPA_AUTH_KEY) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }

    const response = await fetch(`${CHAPA_API_URL}/transaction/verify/${txRef}`, {
      headers: {
        Authorization: `Bearer ${CHAPA_AUTH_KEY}`,
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to verify payment" }, { status: response.status })
    }

    const data = await response.json()

    // TODO: Update payment status in database
    if (data.data.status === "success") {
      // await db.payments.update(
      //   { transaction_ref: txRef },
      //   { status: 'completed' }
      // )
    }

    return NextResponse.json({
      success: true,
      data: data.data,
    })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
