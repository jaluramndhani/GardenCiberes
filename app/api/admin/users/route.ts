import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

// Configuración para rutas dinámicas
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Ambil semua user (tanpa password dan salt)
    const users = await sql`
      SELECT id, name, email, created_at FROM users
      ORDER BY id
    `

    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
