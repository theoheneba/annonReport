import { NextResponse } from "next/server"
import { getReportStatus } from "@/lib/db"

export const runtime = "nodejs"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ success: false, error: "No tracking ID provided" }, { status: 400 })
  }

  const result = await getReportStatus(id)

  if (result.success) {
    return NextResponse.json(result)
  } else {
    return NextResponse.json(result, { status: 500 })
  }
}

