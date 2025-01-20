import { NextResponse } from "next/server"
import { submitReport } from "@/lib/db"

export const runtime = "nodejs"

export async function POST(request: Request) {
  console.log("Submit API route called")
  try {
    const data = await request.json()
    console.log("Received data:", JSON.stringify(data, null, 2))

    // Validate required fields
    if (!data.category || !data.title || !data.description || !data.location || !data.dateOfIncident) {
      console.error("Missing required fields")
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    console.log("Submitting report to database")
    const result = await submitReport(data)

    if (result.success) {
      console.log("Report submitted successfully")
      return NextResponse.json({
        success: true,
        trackingId: result.trackingId,
      })
    } else {
      console.error("Failed to submit report:", result.error)
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

