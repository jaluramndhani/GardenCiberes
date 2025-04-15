import { NextResponse } from "next/server"

// Configuración para rutas dinámicas
export const dynamic = "force-dynamic"

// API route sederhana untuk memastikan routing berfungsi
export async function GET() {
  return NextResponse.json({ status: "ok", message: "API routes working correctly" })
}
