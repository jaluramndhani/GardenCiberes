"use client" // Menandakan bahwa ini adalah Client Component, bukan Server Component

import type React from "react" // Import tipe React untuk TypeScript

import { useState } from "react" // Import useState hook untuk manajemen state
import Link from "next/link" // Import Link untuk navigasi antar halaman
import { useRouter, useSearchParams } from "next/navigation" // Import hooks untuk routing dan query params
import { useAuth } from "@/context/auth-context" // Import custom hook untuk autentikasi
import Header from "@/components/header" // Import komponen Header
import Footer from "@/components/footer" // Import komponen Footer

export default function Login() {
  // State untuk menyimpan nilai input email
  const [email, setEmail] = useState("")

  // State untuk menyimpan nilai input password
  const [password, setPassword] = useState("")

  // State untuk menandakan proses loading saat login
  const [isLoading, setIsLoading] = useState(false)

  // State untuk menyimpan pesan error jika login gagal
  const [error, setError] = useState("")

  // Hook untuk navigasi antar halaman
  const router = useRouter()

  // Hook untuk mengakses parameter URL
  const searchParams = useSearchParams()

  // Destructuring fungsi login dari context autentikasi
  const { login } = useAuth()

  // Mengambil parameter 'registered' dari URL (digunakan jika user baru saja mendaftar)
  const registered = searchParams.get("registered")

  // Mengambil parameter 'redirect' dari URL (halaman yang akan dituju setelah login)
  const redirect = searchParams.get("redirect")

  /**
   * Fungsi untuk menangani submit form login
   * @param e - Event form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Mencegah refresh halaman saat form disubmit
    setError("") // Reset pesan error
    setIsLoading(true) // Aktifkan status loading

    try {
      // Memanggil fungsi login dari auth context
      const success = await login(email, password)
      if (success) {
        // Jika login berhasil, redirect ke halaman yang diminta atau ke beranda
        router.push(redirect || "/")
      } else {
        // Jika login gagal, tampilkan pesan error
        setError("Email atau password salah. Silakan coba lagi.")
      }
    } catch (err: any) {
      // Tangani error yang mungkin terjadi selama proses login
      console.error("Login error:", err)
      setError(err.message || "Gagal masuk. Silakan coba lagi.")
    } finally {
      // Nonaktifkan status loading setelah proses selesai (berhasil atau gagal)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen water-bg">
      {/* Komponen Header dengan variant "booking" */}
      <Header variant="booking" />

      <div className="container mx-auto px-4 py-12 mt-16">
        <div className="max-w-md mx-auto glass-effect rounded-2xl shadow-2xl p-8">
          {/* Judul dan deskripsi halaman login */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900">Masuk ke Akun Anda</h1>
            <p className="text-gray-600 mt-2">Masukkan email dan password Anda untuk melanjutkan</p>
          </div>

          {/* Tampilkan pesan sukses jika user baru saja mendaftar */}
          {registered && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              Pendaftaran berhasil! Silakan masuk dengan akun baru Anda.
            </div>
          )}

          {/* Tampilkan pesan error jika login gagal */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
          )}

          {/* Form login */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input field untuk email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update state email saat input berubah
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="email@example.com"
                required
              />
            </div>

            {/* Input field untuk password */}
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state password saat input berubah
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Link untuk lupa password */}
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800 text-sm">
                Lupa password?
              </Link>
            </div>

            {/* Tombol submit form */}
            <button
              type="submit"
              disabled={isLoading} // Nonaktifkan tombol saat loading
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-70"
            >
              {isLoading ? "Memproses..." : "Masuk"} {/* Ubah teks tombol saat loading */}
            </button>
          </form>

          {/* Link untuk mendaftar jika belum punya akun */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Belum punya akun?{" "}
              <Link href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Komponen Footer dengan variant "simple" */}
      <Footer variant="simple" />
    </div>
  )
}
