import { NextResponse } from "next/server"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

export async function POST(request: Request) {
  try {
    const { category, title, description, location, dateOfIncident } = await request.json()

    // Validate input
    if (!category || !title || !description || !location || !dateOfIncident) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const client = await pool.connect()
    try {
      const result = await client.query(
        `INSERT INTO reports (category, title, description, location, date_of_incident, status, tracking_id)
         VALUES ($1::report_category, $2, $3, $4, $5, $6, $7)
         RETURNING id`,
        [category.toLowerCase(), title, description, location, dateOfIncident, "pending", generateTrackingId()],
      )

      return NextResponse.json({ success: true, id: result.rows[0].id })
    } catch (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json({ success: false, error: "Database error" }, { status: 500 })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error("Error creating report:", error)
    return NextResponse.json({ success: false, error: "Failed to create report" }, { status: 500 })
  }
}

function generateTrackingId() {
  return Math.random().toString(36).substring(2, 15).toUpperCase()
}

