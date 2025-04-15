"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()

  // Cek apakah ada pesan sukses dari halaman register
  const registered = searchParams.get("registered")
  const redirect = searchParams.get("redirect")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        // Redirect ke halaman yang diminta atau ke beranda
        router.push(redirect || "/")
      } else {
        setError("Email atau password salah. Silakan coba lagi.")
      }
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.message || "Gagal masuk. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen water-bg">
      <Header variant="booking" />

      <div className="container mx-auto px-4 py-12 mt-16">
        <div className="max-w-md mx-auto glass-effect rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900">Masuk ke Akun Anda</h1>
            <p className="text-gray-600 mt-2">Masukkan email dan password Anda untuk melanjutkan</p>
          </div>

          {registered && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              Pendaftaran berhasil! Silakan masuk dengan akun baru Anda.
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="email@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-blue-600 hover:text-blue-800 text-sm">
                Lupa password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-70"
            >
              {isLoading ? "Memproses..." : "Masuk"}
            </button>
          </form>

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

      <Footer variant="simple" />
    </div>
  )
}
