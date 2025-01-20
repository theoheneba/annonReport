import { NextResponse } from "next/server"
import { put } from "@vercel/blob"

export const runtime = "nodejs"

export async function POST(request: Request) {
  console.log("Upload API route called")
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      console.error("No file provided")
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 })
    }

    console.log(`File received: ${file.name}, type: ${file.type}, size: ${file.size} bytes`)

    // Validate file type
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "image/gif", "video/mp4"]
    if (!allowedTypes.includes(file.type)) {
      console.error(`Invalid file type: ${file.type}`)
      return NextResponse.json({ success: false, error: "Invalid file type" }, { status: 400 })
    }

    // Check if BLOB_READ_WRITE_TOKEN is set
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("BLOB_READ_WRITE_TOKEN is not set")
      return NextResponse.json(
        { success: false, error: "Server configuration error: BLOB_READ_WRITE_TOKEN is not set" },
        { status: 500 },
      )
    }

    // Upload to Vercel Blob
    try {
      console.log("Attempting to upload to Vercel Blob")
      const blob = await put(file.name, file, {
        access: "public",
      })

      console.log(`File uploaded successfully. URL: ${blob.url}`)
      return NextResponse.json({
        success: true,
        url: blob.url,
      })
    } catch (blobError) {
      console.error("Error uploading to Vercel Blob:", blobError)
      return NextResponse.json({ success: false, error: "Failed to upload file to storage" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in upload route:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

