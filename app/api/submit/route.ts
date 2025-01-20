import { NextResponse } from "next/server"
import { submitReport } from "@/lib/db"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log("Received report data:", data)

    // Validate required fields
    if (!data.category || !data.title || !data.description || !data.location || !data.dateOfIncident) {
      console.error("Missing required fields:", data)
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 },
      )
    }

    // Validate date format
    const date = new Date(data.dateOfIncident)
    if (isNaN(date.getTime())) {
      console.error("Invalid date format:", data.dateOfIncident)
      return NextResponse.json(
        {
          success: false,
          error: "Invalid date format",
        },
        { status: 400 },
      )
    }

    try {
      const result = await submitReport(data)
      console.log("Report submitted successfully:", result)
      return NextResponse.json(result)
    } catch (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json(
        {
          success: false,
          error: "Failed to save report to database",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}

