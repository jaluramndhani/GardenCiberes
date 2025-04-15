import { NextResponse } from "next/server"

// Configuración para rutas dinámicas
export const dynamic = "force-dynamic"

// Tambahkan API route sederhana untuk memastikan routing berfungsi
export async function GET() {
  return NextResponse.json({ message: "Hello from API route!" })
}
