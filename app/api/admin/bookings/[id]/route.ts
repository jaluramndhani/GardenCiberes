import { NextResponse } from "next/server"

// Format paling dasar untuk Next.js 15
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    // Ambil booking berdasarkan ID
    // const booking = await sql`SELECT * FROM bookings WHERE id = ${id}`;

    // Untuk sementara, kembalikan respons sederhana
    return NextResponse.json({ id: id, message: "Booking found" })
  } catch (error) {
    console.error("Error fetching booking:", error)
    return NextResponse.json({ error: "Failed to fetch booking" }, { status: 500 })
  }
}

// Sementara komentar fungsi lain untuk fokus memperbaiki GET
/*
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  // ...
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // ...
}
*/
