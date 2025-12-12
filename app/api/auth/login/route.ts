import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // TODO: Connect to Spring Boot backend
    // const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
    // const response = await fetch(`${backendUrl}/api/auth/login`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password }),
    // })

    // Mock response for development
    if (email && password) {
      return NextResponse.json({
        token: "mock-jwt-token",
        user: {
          id: "1",
          email,
          role: "admin",
        },
      })
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
