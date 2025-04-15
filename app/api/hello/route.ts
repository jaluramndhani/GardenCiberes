import { NextResponse } from "next/server"

// Tambahkan API route sederhana untuk memastikan routing berfungsi
export async function GET() {
  return NextResponse.json({ message: "Hello from API route!" })
}
