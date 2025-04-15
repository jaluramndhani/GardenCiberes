import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID diperlukan" }, { status: 400 })
    }

    // Ambil profil pengguna
    const users = await sql`
      SELECT id, name, email, phone_number, profile_image, created_at 
      FROM users 
      WHERE id = ${userId}
    `

    if (users.length === 0) {
      return NextResponse.json({ error: "Pengguna tidak ditemukan" }, { status: 404 })
    }

    return NextResponse.json(users[0])
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json({ error: "Gagal mengambil profil. Silakan coba lagi." }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json()
    const { id, name, phone_number, profile_image } = body

    // Validasi input
    if (!id) {
      return NextResponse.json({ error: "User ID diperlukan" }, { status: 400 })
    }

    // Update profil pengguna
    const result = await sql`
      UPDATE users
      SET 
        name = COALESCE(${name}, name),
        phone_number = COALESCE(${phone_number}, phone_number),
        profile_image = COALESCE(${profile_image}, profile_image)
      WHERE id = ${id}
      RETURNING id, name, email, phone_number, profile_image, created_at
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Pengguna tidak ditemukan" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "Gagal memperbarui profil. Silakan coba lagi." }, { status: 500 })
  }
}
