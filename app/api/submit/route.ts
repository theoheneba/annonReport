import { NextResponse } from "next/server"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

export async function POST(request: Request) {
  console.log("Received report submission request")
  let client
  try {
    const data = await request.json()
    console.log("Received data:", data)

    // Validate required fields
    if (!data.category || !data.title || !data.description || !data.location || !data.dateOfIncident) {
      console.error("Missing required fields")
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    client = await pool.connect()
    console.log("Connected to database")

    await client.query("BEGIN")

    // Generate tracking ID
    const trackingId = Math.random().toString(36).substring(2, 14).toUpperCase()

    // Insert report
    const reportResult = await client.query(
      `INSERT INTO reports (category, title, description, location, date_of_incident, tracking_id, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [data.category, data.title, data.description, data.location, data.dateOfIncident, trackingId, "pending"],
    )

    const reportId = reportResult.rows[0].id
    console.log(`Report inserted with ID: ${reportId}`)

    // Insert attachments if any
    if (data.attachments && data.attachments.length > 0) {
      console.log(`Inserting ${data.attachments.length} attachments`)
      for (const attachment of data.attachments) {
        await client.query(
          `INSERT INTO attachments (report_id, file_name, file_type, file_url)
           VALUES ($1, $2, $3, $4)`,
          [reportId, attachment.name, attachment.type, attachment.url],
        )
      }
      console.log("Attachments inserted")
    }

    await client.query("COMMIT")
    console.log("Transaction committed")

    return NextResponse.json({
      success: true,
      trackingId,
    })
  } catch (error) {
    console.error("Error submitting report:", error)
    if (client) {
      await client.query("ROLLBACK")
      console.log("Transaction rolled back")
    }
    return NextResponse.json({ success: false, error: "Failed to submit report" }, { status: 500 })
  } finally {
    if (client) {
      client.release()
      console.log("Database connection released")
    }
  }
}

