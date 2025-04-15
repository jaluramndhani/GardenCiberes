import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

// Configuración para rutas dinámicas
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Ambil semua paket
    const packages = await sql`
      SELECT * FROM packages
      ORDER BY id
    `

    return NextResponse.json(packages)
  } catch (error) {
    console.error("Error fetching packages:", error)
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, subtitle, description, max_persons, price_per_person, is_weekend, time_slot, image_url } = body

    // Validasi input
    if (!name || !max_persons || !price_per_person) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Simpan paket baru
    const result = await sql`
      INSERT INTO packages (
        name, subtitle, description, max_persons, price_per_person, is_weekend, time_slot, image_url
      ) VALUES (
        ${name}, ${subtitle}, ${description}, ${max_persons}, ${price_per_person}, ${is_weekend}, ${time_slot}, ${image_url}
      )
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error creating package:", error)
    return NextResponse.json({ error: "Failed to create package" }, { status: 500 })
  }
}
