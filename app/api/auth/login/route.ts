import { NextResponse } from "next/server"
import { sql } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    // Ambil data email dan password dari request body
    const body = await request.json()
    const { email, password } = body

    // Validasi input
    if (!email || !password) {
      return NextResponse.json({ error: "Email dan password diperlukan" }, { status: 400 })
    }

    // Cari user berdasarkan email di database
    const users = await sql`SELECT * FROM users WHERE email = ${email}`
    if (users.length === 0) {
      return NextResponse.json({ error: "Email tidak ditemukan" }, { status: 401 })
    }

    const user = users[0]

    // Verifikasi password menggunakan bcrypt
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json({ error: "Password salah" }, { status: 401 })
    }

    // Jangan kirim password dan salt ke client untuk keamanan
    const { password: _, salt: __, ...userWithoutPassword } = user

    // Kembalikan data user tanpa password
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("Error logging in:", error)
    return NextResponse.json({ error: "Gagal masuk. Silakan coba lagi." }, { status: 500 })
  }
}
