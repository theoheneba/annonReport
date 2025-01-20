export async function submitReport(data: {
  category: string
  title: string
  description: string
  location: string
  dateOfIncident: string
  attachments: Array<{ name: string; url: string; type: string }>
}) {
  const client = await getPool().connect()

  try {
    await client.query("BEGIN")

    console.log("Starting database transaction...")

    // Generate a unique tracking ID (12 characters)
    const trackingId = Math.random().toString(36).substring(2, 14).toUpperCase()

    console.log("Inserting report with tracking ID:", trackingId)

    // Insert the report (ensure category is lowercase and cast to report_category)
    const reportResult = await client.query(
      `INSERT INTO reports (category, title, description, location, date_of_incident, tracking_id, status)
       VALUES ($1::text::report_category, $2, $3, $4, $5, $6, 'pending'::report_status)
       RETURNING id`,
      [data.category.toLowerCase(), data.title, data.description, data.location, data.dateOfIncident, trackingId],
    )

    const reportId = reportResult.rows[0].id
    console.log("Report inserted successfully. Report ID:", reportId)

    // Insert attachments if any
    if (data.attachments && data.attachments.length > 0) {
      console.log("Inserting attachments...")
      for (const attachment of data.attachments) {
        await client.query(
          `INSERT INTO attachments (report_id, file_name, file_type, file_url)
           VALUES ($1, $2, $3::text::file_type, $4)`,
          [reportId, attachment.name, attachment.type, attachment.url],
        )
      }
      console.log("Attachments inserted successfully")
    }

    await client.query("COMMIT")
    console.log("Transaction committed successfully")
    return { success: true, trackingId }
  } catch (error) {
    await client.query("ROLLBACK")
    console.error("Error in submitReport:", error)
    if (error instanceof Error) {
      console.error("Error name:", error.name)
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }
    throw error
  } finally {
    client.release()
  }
}

