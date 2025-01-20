import { NextResponse } from "next/server"
import { submitReport } from "@/lib/db"
import crypto from "crypto"

export const runtime = "nodejs"

export async function POST(request: Request) {
  // Generate a random identifier instead of using any user data
  const anonymousId = crypto.randomBytes(32).toString("hex")

  try {
    const data = await request.json()
    const result = await submitReport({
      ...data,
      anonymousId, // Store only the anonymous ID
      // Explicitly avoid storing any identifying information
      submittedAt: new Date().toISOString(),
    })

    if (result.success) {
      // Return only the tracking ID
      return NextResponse.json({
        success: true,
        trackingId: result.trackingId,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to submit report",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid request",
      },
      { status: 400 },
    )
  }
}

