import { NextResponse } from "next/server"
import { submitReport } from "@/lib/db"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.category || !data.title || !data.description || !data.location || !data.dateOfIncident) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const result = await submitReport(data)

    if (result.success) {
      return NextResponse.json({
        success: true,
        trackingId: result.trackingId,
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Failed to submit report",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error submitting report:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Invalid request",
      },
      { status: 400 },
    )
  }
}

