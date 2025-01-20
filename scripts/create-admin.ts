import { Pool } from "pg"
import { hash } from "bcryptjs"
import dotenv from "dotenv"

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" })

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

async function createAdmin() {
  const client = await pool.connect()
  try {
    // Hash the admin password
    const passwordHash = await hash(process.env.ADMIN_PASSWORD || "secureAdminPassword123!", 12)

    // Check if admin already exists
    const checkResult = await client.query("SELECT * FROM admins WHERE username = $1", [
      process.env.ADMIN_EMAIL || "admin@ghanareport.gov.gh",
    ])

    if (checkResult.rows.length === 0) {
      // Insert admin user
      await client.query("INSERT INTO admins (username, password_hash) VALUES ($1, $2)", [
        process.env.ADMIN_EMAIL || "admin@ghanareport.gov.gh",
        passwordHash,
      ])
      console.log("Admin user created successfully")
    } else {
      // Update admin password
      await client.query("UPDATE admins SET password_hash = $1 WHERE username = $2", [
        passwordHash,
        process.env.ADMIN_EMAIL || "admin@ghanareport.gov.gh",
      ])
      console.log("Admin password updated successfully")
    }
  } catch (error) {
    console.error("Error creating admin user:", error)
  } finally {
    client.release()
  }
}

createAdmin()
  .then(() => {
    console.log("Script execution completed.")
    process.exit(0)
  })
  .catch((error) => {
    console.error("Unhandled error:", error)
    process.exit(1)
  })

