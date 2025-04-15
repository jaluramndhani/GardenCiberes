import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

// Configuración para rutas dinámicas
export const dynamic = "force-dynamic"

// Handler untuk GET request - mengambil booking berdasarkan user ID
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Ambil booking berdasarkan user ID dari database
    const bookings = await sql`
     SELECT * FROM bookings
     WHERE user_id = ${userId}
     ORDER BY booking_date DESC
   `

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

// Handler untuk POST request - membuat booking baru
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { user_id, package_name, booking_date, visitors, total_price } = body

    // Validasi input
    if (!user_id || !package_name || !booking_date || !visitors || !total_price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Simpan booking baru ke database
    const result = await sql`
     INSERT INTO bookings (
       user_id, package_name, booking_date, visitors, total_price, status, created_at
     ) VALUES (
       ${user_id}, ${package_name}, ${booking_date}, ${visitors}, ${total_price}, 'pending', NOW()
     )
     RETURNING *
   `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
