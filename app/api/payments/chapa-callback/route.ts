import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const CHAPA_AUTH_KEY = process.env.CHAPA_AUTH_KEY
const CHAPA_WEBHOOK_KEY = process.env.CHAPA_WEBHOOK_KEY
const CHAPA_API_URL = process.env.NEXT_PUBLIC_CHAPA_API_URL || "https://api.chapa.co/v1"

interface ChapaWebhookPayload {
  event: string
  data: {
    id: string
    tx_ref: string
    amount: string
    status: string
    currency: string
    customization: Record<string, string>
    first_name: string
    last_name: string
    email: string
    message: string
  }
}

function verifyWebhookSignature(payload: string, signature: string): boolean {
  if (!CHAPA_WEBHOOK_KEY) return false

  try {
    const hmac = crypto.createHmac("sha256", CHAPA_WEBHOOK_KEY).update(payload).digest("hex")

    return hmac === signature
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text()
    const signature = request.headers.get("x-chapa-signature") || ""

    // Verify webhook signature
    if (!verifyWebhookSignature(payload, signature)) {
      console.warn("Webhook signature verification failed")
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    const data: ChapaWebhookPayload = JSON.parse(payload)
    const { event } = data

    if (event === "charge.success") {
      const { tx_ref, status, amount, email } = data.data

      // TODO: Update payment status in database
      // await db.payments.update(
      //   { transaction_ref: tx_ref },
      //   { status: 'completed' }
      // )

      // TODO: Send confirmation email
      console.log(`Payment successful for ${email}: ${amount} ${data.data.currency}`)

      return NextResponse.json({
        success: true,
        message: "Payment processed successfully",
      })
    }

    if (event === "charge.failed") {
      const { tx_ref, message } = data.data

      // TODO: Update payment status in database
      // await db.payments.update(
      //   { transaction_ref: tx_ref },
      //   { status: 'failed' }
      // )

      console.error(`Payment failed for tx_ref: ${tx_ref}, reason: ${message}`)

      return NextResponse.json({
        success: false,
        message: "Payment failed",
      })
    }

    return NextResponse.json({
      success: true,
      message: "Event received",
    })
  } catch (error) {
    console.error("Webhook processing error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
