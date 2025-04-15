import { NextResponse } from "next/server"

// API route sederhana untuk memastikan routing berfungsi
export async function GET() {
  return NextResponse.json({ status: "ok", message: "API routes working correctly" })
}
