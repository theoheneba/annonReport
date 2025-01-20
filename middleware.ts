import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

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
    // Allow access to login page
    if (request.nextUrl.pathname === "/admin/login") {
      const token = request.cookies.get("admin_session")?.value

      // If already logged in, redirect to admin dashboard
      if (token) {
        try {
          await jwtVerify(token, JWT_SECRET)
          return NextResponse.redirect(new URL("/admin", request.url))
        } catch {
          // Invalid token, continue to login page
        }
      }
      return NextResponse.next()
    }

    const token = request.cookies.get("admin_session")?.value

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    try {
      await jwtVerify(token, JWT_SECRET)
      return NextResponse.next()
    } catch {
      // Invalid token
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/api/submit"],
}

