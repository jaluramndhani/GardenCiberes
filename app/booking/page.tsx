"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Tipe data untuk paket kolam renang
type Package = {
  id: number
  name: string
  subtitle: string
  description: string
  max_persons: number
  price_per_person: number
  is_weekend: boolean
  time_slot: string
  image_url: string
}

export default function Booking() {
  // State untuk menyimpan data
  const [packages, setPackages] = useState<Package[]>([])
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [bookingDate, setBookingDate] = useState("")
  const [visitors, setVisitors] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Hooks untuk autentikasi, routing, dan query params
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Ambil paket dari API saat komponen dimuat
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch("/api/packages")
        if (!response.ok) {
          throw new Error("Gagal mengambil data paket")
        }
        const data = await response.json()
        setPackages(data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching packages:", error)
        setError("Gagal memuat paket. Silakan coba lagi nanti.")
        setIsLoading(false)
      }
    }

    fetchPackages()
  }, [])

  // Redirect ke login jika tidak terautentikasi
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?redirect=booking")
    }
  }, [isLoading, isAuthenticated, router])

  // Fungsi untuk menghitung total harga berdasarkan tanggal dan jumlah pengunjung
  const calculateTotalPrice = () => {
    if (!bookingDate || visitors <= 0) return 0

    // Tentukan apakah tanggal yang dipilih adalah weekend
    const date = new Date(bookingDate)
    const day = date.getDay() // 0 = Minggu, 1 = Senin, ..., 6 = Sabtu
    const isWeekend = day === 0 || day === 6 // Sabtu atau Minggu

    // Harga berbeda untuk weekend dan weekday
    const pricePerPerson = isWeekend ? 25000 : 15000
    return pricePerPerson * visitors
  }

  // Fungsi untuk menangani submit form booking
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validasi input
    if (!selectedPackage) {
      setError("Silakan pilih paket")
      return
    }

    if (!bookingDate) {
      setError("Silakan pilih tanggal")
      return
    }

    if (!visitors || visitors <= 0) {
      setError("Silakan masukkan jumlah pengunjung")
      return
    }

    setIsSubmitting(true)

    try {
      // Kirim data booking ke API
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user?.id,
          package_name: selectedPackage.name,
          booking_date: bookingDate,
          visitors: visitors,
          total_price: calculateTotalPrice(),
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Gagal membuat pemesanan")
      }

      // Reset form dan tampilkan pesan sukses
      setSuccess("Pemesanan berhasil dibuat! Kami akan menghubungi Anda untuk konfirmasi.")
      setSelectedPackage(null)
      setBookingDate("")
      setVisitors(1)
    } catch (err: any) {
      console.error("Booking error:", err)
      setError(err.message || "Gagal membuat pemesanan. Silakan coba lagi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Tampilkan loading jika data masih dimuat atau user belum login
  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen water-bg flex items-center justify-center">
        <div className="glass-effect p-8 rounded-2xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-blue-900">Memuat halaman pemesanan...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen water-bg">
      <Header variant="booking" />

      <div className="container mx-auto px-4 py-12 mt-16">
        <div className="glass-effect rounded-2xl shadow-2xl p-6 md:p-8">
          <h1 className="cormorant text-3xl md:text-4xl font-bold text-blue-900 mb-6 text-center">
            Pesan Kolam Renang
          </h1>

          {/* Tampilkan pesan error atau sukses jika ada */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="bookingDate" className="block text-gray-700 font-medium mb-2">
                  Tanggal Kunjungan
                </label>
                <input
                  type="date"
                  id="bookingDate"
                  value={bookingDate}
                  onChange={(e) => {
                    const selectedDate = e.target.value
                    setBookingDate(selectedDate)

                    // Tentukan paket berdasarkan hari yang dipilih (weekend/weekday)
                    if (selectedDate) {
                      const date = new Date(selectedDate)
                      const day = date.getDay() // 0 = Minggu, 1 = Senin, ..., 6 = Sabtu

                      // Cari paket yang sesuai berdasarkan hari
                      const isWeekend = day === 0 || day === 6 // Sabtu atau Minggu
                      const appropriatePackage = packages.find((pkg) => pkg.is_weekend === isWeekend)

                      if (appropriatePackage) {
                        setSelectedPackage(appropriatePackage)
                      }
                    }
                  }}
                  min={new Date().toISOString().split("T")[0]} // Tanggal minimal adalah hari ini
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                {bookingDate && (
                  <p className="text-sm text-blue-600 mt-1">
                    {new Date(bookingDate).getDay() === 0 || new Date(bookingDate).getDay() === 6
                      ? "Anda memilih hari weekend (Sabtu/Minggu)"
                      : "Anda memilih hari weekday (Senin-Jumat)"}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="visitors" className="block text-gray-700 font-medium mb-2">
                  Jumlah Pengunjung
                </label>
                <input
                  type="number"
                  id="visitors"
                  value={visitors}
                  onChange={(e) => setVisitors(Number.parseInt(e.target.value || "0", 10))}
                  min="0"
                  max={selectedPackage?.max_persons || 50}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {selectedPackage && (
                  <p className="text-sm text-gray-500 mt-1">Maksimal {selectedPackage.max_persons} orang per sesi</p>
                )}
              </div>
            </div>

            {/* Ringkasan pemesanan */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Ringkasan Pemesanan</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Paket:</span>
                  <span className="font-medium">
                    {selectedPackage ? (selectedPackage.is_weekend ? "Weekend Premium" : "Weekday Deluxe") : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tanggal:</span>
                  <span className="font-medium">
                    {bookingDate ? new Date(bookingDate).toLocaleDateString("id-ID") : "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Jumlah Pengunjung:</span>
                  <span className="font-medium">{visitors} orang</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Harga per Orang:</span>
                  <span className="font-medium">
                    {bookingDate
                      ? new Date(bookingDate).getDay() === 0 || new Date(bookingDate).getDay() === 6
                        ? "Rp 25.000"
                        : "Rp 15.000"
                      : "-"}
                  </span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-blue-600">Rp {calculateTotalPrice().toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !selectedPackage || !bookingDate}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? "Memproses..." : "Konfirmasi Pemesanan"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer variant="simple" />
    </div>
  )
}
