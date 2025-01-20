import { getConnection } from "../lib/db"

async function testConnection() {
  try {
    const client = await getConnection()
    const result = await client.query("SELECT NOW()")
    console.log("Database connection successful:", result.rows[0])
    await client.end()
  } catch (error) {
    console.error("Database connection failed:", error)
  }
}

testConnection()

