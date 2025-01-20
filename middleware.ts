import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifySession } from "./lib/auth"

export async function middleware(request: NextRequest) {
  // Remove identifying headers for anonymous reports
  if (request.nextUrl.pathname.startsWith("/api/submit")) {
    const headers = new Headers(request.headers)
    headers.delete("x-forwarded-for")
    headers.delete("x-real-ip")

    const response = NextResponse.next({
      request: {
        headers,
      },
    })

    response.headers.delete("x-powered-by")
    response.headers.set("Referrer-Policy", "no-referrer")
    response.headers.set("X-Content-Type-Options", "nosniff")

    return response
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next()
    }

    const session = await verifySession(request)
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/submit"],
}

