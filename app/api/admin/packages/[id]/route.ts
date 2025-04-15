import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

// Configuración para rutas dinámicas
export const dynamic = "force-dynamic"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Ambil paket berdasarkan ID
    const pkg = await sql`
      SELECT * FROM packages
      WHERE id = ${id}
    `

    if (pkg.length === 0) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    return NextResponse.json(pkg[0])
  } catch (error) {
    console.error("Error fetching package:", error)
    return NextResponse.json({ error: "Failed to fetch package" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()
    const { name, subtitle, description, max_persons, price_per_person, is_weekend, time_slot, image_url } = body

    // Validasi input
    if (!name || !max_persons || !price_per_person) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Update paket
    const result = await sql`
      UPDATE packages
      SET 
        name = ${name},
        subtitle = ${subtitle},
        description = ${description},
        max_persons = ${max_persons},
        price_per_person = ${price_per_person},
        is_weekend = ${is_weekend},
        time_slot = ${time_slot},
        image_url = ${image_url}
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error updating package:", error)
    return NextResponse.json({ error: "Failed to update package" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Hapus paket berdasarkan ID
    const result = await sql`
      DELETE FROM packages
      WHERE id = ${id}
      RETURNING id
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Package deleted successfully" })
  } catch (error) {
    console.error("Error deleting package:", error)
    return NextResponse.json({ error: "Failed to delete package" }, { status: 500 })
  }
}
