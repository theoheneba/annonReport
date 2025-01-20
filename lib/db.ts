import pkg from "pg"
const { Pool } = pkg

let pool: pkg.Pool | null = null

export async function getConnection() {
  if (!pool) {
    console.log("Creating new database connection pool")
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
  console.log("Submitting report to database")
  const client = await getConnection()

  try {
    await client.query("BEGIN")
    console.log("Transaction begun")

    // Generate a unique tracking ID (12 characters)
    const trackingId = Math.random().toString(36).substring(2, 14).toUpperCase()

    // Insert the report
    console.log("Inserting report with data:", {
      category: data.category,
      title: data.title,
      location: data.location,
      dateOfIncident: data.dateOfIncident,
      trackingId,
    })
    const reportResult = await client.query(
      `INSERT INTO reports (category, title, description, location, date_of_incident, tracking_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [data.category, data.title, data.description, data.location, data.dateOfIncident, trackingId],
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

    return { success: true, trackingId }
  } catch (error) {
    await client.query("ROLLBACK")
    console.error("Error submitting report:", error)
    return {
      success: false,
      error: "Failed to submit report: " + (error instanceof Error ? error.message : String(error)),
    }
  } finally {
    client.release()
  }
}

