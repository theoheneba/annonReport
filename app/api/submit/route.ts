import { NextResponse } from "next/server"
import { submitReport } from "@/lib/db"

export const runtime = "nodejs"

export async function POST(request: Request) {
  console.log("Submit API route called")

  try {
    const data = await request.json()
    console.log("Received report data:", {
      ...data,
      description: data.description?.substring(0, 100) + "...", // Log truncated description
    })

    // Validate required fields
    const requiredFields = ["category", "title", "description", "location", "dateOfIncident"]
    const missingFields = requiredFields.filter((field) => !data[field])

    if (missingFields.length > 0) {
      console.error("Missing required fields:", missingFields)
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 },
      )
    }

    // Validate category
    const validCategories = [
      "corruption",
      "fraud",
      "misconduct",
      "harassment",
      "discrimination",
      "environmental",
      "other",
    ]

    if (!validCategories.includes(data.category.toLowerCase())) {
      console.error("Invalid category:", data.category)
      return NextResponse.json(
        {
          success: false,
          error: `Invalid category: ${data.category}. Must be one of: ${validCategories.join(", ")}`,
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
          error: "Invalid date format. Please use YYYY-MM-DD format.",
        },
        { status: 400 },
      )
    }

    try {
      console.log("Attempting to submit report to database...")
      const result = await submitReport(data)
      console.log("Report submitted successfully:", result)
      return NextResponse.json(result)
    } catch (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json(
        {
          success: false,
          error: "Failed to save report to database",
          details: dbError instanceof Error ? dbError.message : String(dbError),
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
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

