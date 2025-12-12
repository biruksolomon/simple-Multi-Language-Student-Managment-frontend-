import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const txRef = request.nextUrl.searchParams.get("tx_ref")

    if (!txRef) {
      return NextResponse.json({ error: "Transaction reference required" }, { status: 400 })
    }

    // Verify payment with Chapa
    const CHAPA_API_URL = process.env.NEXT_PUBLIC_CHAPA_API_URL || "https://api.chapa.co/v1"
    const CHAPA_AUTH_KEY = process.env.CHAPA_AUTH_KEY

    const response = await fetch(`${CHAPA_API_URL}/transaction/verify/${txRef}`, {
      headers: {
        Authorization: `Bearer ${CHAPA_AUTH_KEY}`,
      },
    })

    const data = await response.json()

    return NextResponse.json({
      success: true,
      data: data.data || {},
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
