import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Tangani error dengan mencoba redirect ke halaman HTML statis jika terjadi error
  try {
    return NextResponse.next()
  } catch (error) {
    console.error("Middleware error:", error)
    // Redirect ke halaman HTML statis jika terjadi error
    return NextResponse.redirect(new URL("/html/landingpage.html", request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - html (static HTML files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|html).*)",
  ],
}
