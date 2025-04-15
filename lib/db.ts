import { neon } from "@neondatabase/serverless"

// Gunakan string koneksi yang diberikan untuk terhubung ke database Neon PostgreSQL
const DATABASE_URL =
  "postgres://neondb_owner:npg_ibNWf91JTPak@ep-noisy-sky-a1c7alxa-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"

// Buat instance SQL client untuk menjalankan query ke database
export const sql = neon(DATABASE_URL)

// Fungsi helper untuk menjalankan query dengan parameter
export async function query(query: string, params: any[] = []) {
  try {
    // Jalankan query SQL dengan parameter yang diberikan
    return await sql(query, params)
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}
