import pkg from "pg"
const { Pool } = pkg

let pool: pkg.Pool | null = null

export async function getConnection() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  }
  return pool
}

export async function submitReport(data: {
  category: string
  title: string
  description: string
  location: string
  dateOfIncident: string
  attachments: Array<{ name: string; url: string; type: string }>
}) {
  const client = await getConnection()

  try {
    await client.query("BEGIN")

    // Generate a unique tracking ID (12 characters)
    const trackingId = Math.random().toString(36).substring(2, 14).toUpperCase()

    // Insert the report
    const reportResult = await client.query(
      `INSERT INTO reports (category, title, description, location, date_of_incident, tracking_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [data.category, data.title, data.description, data.location, data.dateOfIncident, trackingId],
    )

    const reportId = reportResult.rows[0].id

    // Insert attachments if any
    if (data.attachments && data.attachments.length > 0) {
      const attachmentValues = data.attachments
        .map((attachment) => {
          return `('${reportId}', '${attachment.name}', '${attachment.type}', '${attachment.url}')`
        })
        .join(",")

      await client.query(
        `INSERT INTO attachments (report_id, file_name, file_type, file_url)
         VALUES ${attachmentValues}`,
      )
    }

    await client.query("COMMIT")

    return { success: true, trackingId }
  } catch (error) {
    await client.query("ROLLBACK")
    console.error("Error submitting report:", error)
    return { success: false, error: "Failed to submit report" }
  }
}

