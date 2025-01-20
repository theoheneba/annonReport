import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export const runtime = "nodejs"

export async function POST() {
  cookies().delete("admin_session")
  return NextResponse.json({ success: true })
}

