import mysql from "mysql2/promise"
import crypto from "crypto"

export async function createConnection() {
  return await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
}

export async function submitReport(data: {
  category: string
  description: string
  location: string
  anonymousId: string
}) {
  const connection = await createConnection()
  const id = crypto.randomUUID()
  const trackingId = crypto.randomBytes(6).toString("hex").toUpperCase()

  try {
    await connection.execute(
      "INSERT INTO reports (id, category, description, location, tracking_id) VALUES (?, ?, ?, ?, ?)",
      [id, data.category, data.description, data.location, trackingId],
    )
    return { success: true, trackingId }
  } catch (error) {
    console.error("Error submitting report:", error)
    return { success: false, error: "Failed to submit report" }
  } finally {
    await connection.end()
  }
}

export async function getReportStatus(trackingId: string) {
  const connection = await createConnection()

  try {
    const [rows] = await connection.execute(
      "SELECT status, date_submitted, category, description, location FROM reports WHERE tracking_id = ?",
      [trackingId],
    )
    const [updates] = await connection.execute(
      "SELECT status, message, date_added FROM updates WHERE report_id = (SELECT id FROM reports WHERE tracking_id = ?)",
      [trackingId],
    )
    return { success: true, report: rows[0], updates }
  } catch (error) {
    console.error("Error getting report status:", error)
    return { success: false, error: "Failed to get report status" }
  } finally {
    await connection.end()
  }
}

