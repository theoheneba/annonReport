import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Remove all identifying headers
  const headers = new Headers(request.headers)
  headers.delete("x-forwarded-for")
  headers.delete("x-real-ip")

  // Create response with sanitized headers
  const response = NextResponse.next({
    request: {
      headers,
    },
  })

  // Remove tracking headers from response
  response.headers.delete("x-powered-by")
  response.headers.set("Referrer-Policy", "no-referrer")
  response.headers.set("X-Content-Type-Options", "nosniff")

  return response
}

export const config = {
  matcher: "/api/:path*",
}

