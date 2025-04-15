import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

// Configuración para rutas dinámicas
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Ambil semua paket yang unik (menghindari duplikasi)
    const packages = await sql`
      SELECT DISTINCT ON (name) * FROM packages
      ORDER BY name, id
    `

    return NextResponse.json(packages)
  } catch (error) {
    console.error("Error fetching packages:", error)
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 })
  }
}
