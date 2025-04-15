import { NextResponse } from "next/server"
import { sql } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    // Ambil data dari request body
    const body = await request.json()
    const { name, email, password } = body

    // Validasi input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Nama, email, dan password diperlukan" }, { status: 400 })
    }

    // Periksa apakah email sudah terdaftar
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`
    if (existingUser.length > 0) {
      return NextResponse.json({ error: "Email sudah terdaftar" }, { status: 400 })
    }

    // Hash password untuk keamanan
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Simpan user baru ke database
    const result = await sql`
     INSERT INTO users (name, email, password, salt, created_at)
     VALUES (${name}, ${email}, ${hashedPassword}, ${salt}, NOW())
     RETURNING id, name, email, created_at
   `

    // Kembalikan data user yang baru dibuat
    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error registering user:", error)
    return NextResponse.json({ error: "Gagal mendaftar. Silakan coba lagi." }, { status: 500 })
  }
}
