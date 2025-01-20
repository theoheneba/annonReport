import { NextResponse } from "next/server"
import { Pool } from "pg"

export const runtime = "nodejs"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.category || !data.title || !data.description || !data.location || !data.dateOfIncident) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const client = await pool.connect()

    try {
      await client.query("BEGIN")

      // Generate tracking ID
      const trackingId = Math.random().toString(36).substring(2, 14).toUpperCase()

      // Insert report
      const reportResult = await client.query(
        `INSERT INTO reports (category, title, description, location, date_of_incident, tracking_id)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [data.category, data.title, data.description, data.location, data.dateOfIncident, trackingId],
      )

      const reportId = reportResult.rows[0].id

      // Insert attachments if any
      if (data.attachments && data.attachments.length > 0) {
        for (const attachment of data.attachments) {
          await client.query(
            `INSERT INTO attachments (report_id, file_name, file_type, file_url)
             VALUES ($1, $2, $3, $4)`,
            [reportId, attachment.name, attachment.type, attachment.url],
          )
        }
      }

      await client.query("COMMIT")

      return NextResponse.json({
        success: true,
        trackingId,
      })
    } catch (error) {
      await client.query("ROLLBACK")
      console.error("Database error:", error)
      return NextResponse.json({ success: false, error: "Failed to save report" }, { status: 500 })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error("Request error:", error)
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
  }
}

