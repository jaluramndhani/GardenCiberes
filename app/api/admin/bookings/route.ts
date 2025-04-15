import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    // Ambil semua booking
    const bookings = await sql`
      SELECT * FROM bookings
      ORDER BY booking_date DESC
    `

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { user_id, package_name, booking_date, visitors, total_price, status = "pending" } = body

    // Validasi input
    if (!package_name || !booking_date || !visitors || !total_price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Simpan booking baru
    const result = await sql`
      INSERT INTO bookings (
        user_id, package_name, booking_date, visitors, total_price, status, created_at
      ) VALUES (
        ${user_id}, ${package_name}, ${booking_date}, ${visitors}, ${total_price}, ${status}, NOW()
      )
      RETURNING *
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
