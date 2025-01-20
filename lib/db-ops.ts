import { getConnection } from "./db"

export async function validateAdmin(username: string, password: string) {
  const client = await getConnection()

  try {
    const {
      rows: [admin],
    } = await client.query("SELECT username, password_hash FROM admins WHERE username = $1", [username])

    if (!admin) {
      return null
    }

    return admin
  } catch (error) {
    console.error("Error validating admin:", error)
    return null
  }
}

