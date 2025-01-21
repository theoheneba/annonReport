import { Pool } from "pg"

let pool: Pool | null = null

export async function getPool() {
  if (!pool) {
    console.log("Initializing new database pool...")

    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not defined")
    }

    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })

    // Test the connection
    try {
      const client = await pool.connect()
      console.log("Database connection test successful")
      const result = await client.query("SELECT NOW()")
      console.log("Database query test successful:", result.rows[0])
      client.release()
    } catch (error) {
      console.error("Database connection test failed:", error)
      pool = null
      throw error
    }
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
  console.log("Starting submitReport function with data:", {
    ...data,
    description: data.description.substring(0, 100) + "...", // Log truncated description
  })

  const pool = await getPool()
  const client = await pool.connect()

  try {
    await client.query("BEGIN")
    console.log("Transaction started")

    // Verify report_category enum exists
    const enumCheck = await client.query(`
      SELECT EXISTS (
        SELECT 1 FROM pg_type 
        WHERE typname = 'report_category'
      );
    `)

    if (!enumCheck.rows[0].exists) {
      console.error("report_category enum does not exist")
      throw new Error("Database schema is not properly set up")
    }

    // Generate tracking ID
    const trackingId = Math.random().toString(36).substring(2, 14).toUpperCase()
    console.log("Generated tracking ID:", trackingId)

    // Insert report with explicit type casting and parameter logging
    const insertQuery = `
      INSERT INTO reports (
        category,
        title,
        description,
        location,
        date_of_incident,
        tracking_id,
        status
      )
      VALUES (
        $1::text::report_category,
        $2,
        $3,
        $4,
        $5,
        $6,
        'pending'::report_status
      )
      RETURNING id
    `

    const params = [
      data.category.toLowerCase(),
      data.title,
      data.description,
      data.location,
      data.dateOfIncident,
      trackingId,
    ]

    console.log("Executing insert query with params:", {
      ...params,
      description: params[2].substring(0, 100) + "...", // Log truncated description
    })

    const reportResult = await client.query(insertQuery, params)
    const reportId = reportResult.rows[0].id
    console.log("Report inserted successfully. Report ID:", reportId)

    // Insert attachments
    if (data.attachments && data.attachments.length > 0) {
      console.log(`Processing ${data.attachments.length} attachments`)

      for (const attachment of data.attachments) {
        const attachQuery = `
          INSERT INTO attachments (
            report_id,
            file_name,
            file_type,
            file_url
          )
          VALUES ($1, $2, $3::text::file_type, $4)
        `

        await client.query(attachQuery, [reportId, attachment.name, attachment.type, attachment.url])
        console.log(`Attachment inserted: ${attachment.name}`)
      }
    }

    await client.query("COMMIT")
    console.log("Transaction committed successfully")
    return { success: true, trackingId }
  } catch (error) {
    await client.query("ROLLBACK")
    console.error("Error in submitReport:")
    console.error("Error name:", error.name)
    console.error("Error message:", error.message)
    console.error("Error stack:", error.stack)
    throw error
  } finally {
    client.release()
  }
}

