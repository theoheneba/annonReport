import { NextResponse } from "next/server"
import { Pool } from "pg"
import { compare } from "bcryptjs"
import { SignJWT } from "jose"
import { cookies } from "next/headers"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    const client = await pool.connect()
    try {
      // Get admin user
      const result = await client.query("SELECT username, password_hash FROM admins WHERE username = $1", [username])

      const admin = result.rows[0]
      if (!admin) {
        return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
      }

      // Verify password
      const isValid = await compare(password, admin.password_hash)
      if (!isValid) {
        return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
      }

      // Create JWT token
      const token = await new SignJWT({ username: admin.username })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("24h")
        .sign(new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key"))

      // Set cookie
      cookies().set("admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
      })

      return NextResponse.json({ success: true })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

