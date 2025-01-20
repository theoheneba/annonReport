import { Pool } from "pg"
import crypto from "crypto"

let pool: Pool | null = null

export async function getConnection() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: true,
      },
    })
  }
  return pool
}

export async function submitReport(data: {
  category: string
  description: string
  location: string
  anonymousId: string
}) {
  const client = await getConnection()
  const id = crypto.randomUUID()
  const trackingId = crypto.randomBytes(6).toString("hex").toUpperCase()

  try {
    await client.query(
      "INSERT INTO reports (id, category, description, location, tracking_id) VALUES ($1, $2, $3, $4, $5)",
      [id, data.category, data.description, data.location, trackingId],
    )
    return { success: true, trackingId }
  } catch (error) {
    console.error("Error submitting report:", error)
    return { success: false, error: "Failed to submit report" }
  }
}

export async function getReportStatus(trackingId: string) {
  const client = await getConnection()

  try {
    const {
      rows: [report],
    } = await client.query(
      "SELECT status, date_submitted, category, description, location FROM reports WHERE tracking_id = $1",
      [trackingId],
    )
    const { rows: updates } = await client.query(
      "SELECT status, message, date_added FROM updates WHERE report_id = (SELECT id FROM reports WHERE tracking_id = $1)",
      [trackingId],
    )
    return { success: true, report, updates }
  } catch (error) {
    console.error("Error getting report status:", error)
    return { success: false, error: "Failed to get report status" }
  }
}

