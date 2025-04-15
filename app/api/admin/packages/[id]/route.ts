import { NextResponse } from "next/server"

// Format paling dasar untuk Next.js 15
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    // Untuk sementara, kembalikan respons sederhana
    return NextResponse.json({ id: id, message: "Package found" })
  } catch (error) {
    console.error("Error fetching package:", error)
    return NextResponse.json({ error: "Failed to fetch package" }, { status: 500 })
  }
}

// Sementara komentar fungsi lain untuk fokus memperbaiki GET
/*
export async function PUT(
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
