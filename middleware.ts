import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Middleware sederhana untuk memastikan routing berfungsi
export function middleware(request: NextRequest) {
  // Lanjutkan ke request berikutnya
  return NextResponse.next()
}

// Konfigurasi untuk menjalankan middleware pada semua routes
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
