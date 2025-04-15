"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Tipe data untuk booking
type Booking = {
  id: number
  user_id: number
  user_name?: string
  user_email?: string
  package_name: string
  booking_date: string
  visitors: number
  total_price: number
  status: string
  created_at: string
}

// Tipe data untuk user
type User = {
  id: number
  name: string
  email: string
}

export default function AdminDashboard() {
  // State untuk menyimpan data
  const [bookings, setBookings] = useState<Booking[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("")

  // Hooks untuk autentikasi dan routing
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  // Redirect jika tidak login atau bukan admin
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
    // Untuk demo, kita anggap user dengan ID 34 adalah admin
    // Di implementasi nyata, Anda perlu menambahkan kolom role di tabel users
    else if (user?.id !== 34) {
      router.push("/")
    }
  }, [isAuthenticated, router, user])

  // Fungsi untuk mengambil data booking dan user
  const fetchData = async () => {
    setIsLoading(true)
    setError("")
    try {
      // Fetch bookings dari API
      const bookingsResponse = await fetch("/api/admin/bookings")
      if (!bookingsResponse.ok) {
        throw new Error("Gagal mengambil data pemesanan")
      }
      const bookingsData = await bookingsResponse.json()

      // Fetch users dari API
      const usersResponse = await fetch("/api/admin/users")
      if (!usersResponse.ok) {
        throw new Error("Gagal mengambil data pengguna")
      }
      const usersData = await usersResponse.json()

      // Gabungkan data booking dengan informasi user
      const enhancedBookings = bookingsData.map((booking: Booking) => {
        const bookingUser = usersData.find((u: User) => u.id === booking.user_id)
        return {
          ...booking,
          user_name: bookingUser?.name || "Tamu",
          user_email: bookingUser?.email || "N/A",
        }
      })

      setBookings(enhancedBookings)
      setUsers(usersData)
    } catch (err) {
      console.error("Error fetching data:", err)
      setError("Gagal memuat data. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  // Ambil data saat komponen dimuat
  useEffect(() => {
    fetchData()
  }, [])

  // Fungsi untuk mengubah status booking
  const updateBookingStatus = async (bookingId: number, newStatus: string) => {
    try {
      // Kirim request ke API untuk update status
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error("Gagal memperbarui status pemesanan")
      }

      // Update state lokal
      setBookings(bookings.map((booking) => (booking.id === bookingId ? { ...booking, status: newStatus } : booking)))
    } catch (err) {
      console.error("Error updating booking status:", err)
      setError("Gagal memperbarui status pemesanan. Silakan coba lagi.")
    }
  }

  // Fungsi untuk menghapus booking
  const deleteBooking = async (bookingId: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pemesanan ini?")) {
      return
    }

    try {
      // Kirim request ke API untuk delete booking
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Gagal menghapus pemesanan")
      }

      // Update state lokal
      setBookings(bookings.filter((booking) => booking.id !== bookingId))
    } catch (err) {
      console.error("Error deleting booking:", err)
      setError("Gagal menghapus pemesanan. Silakan coba lagi.")
    }
  }

  // Filter bookings berdasarkan status dan tanggal
  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    const matchesDate = !dateFilter || booking.booking_date === dateFilter
    return matchesStatus && matchesDate
  })

  // Jika loading atau tidak terautentikasi, tampilkan loading
  if (isLoading || !isAuthenticated || user?.id !== 34) {
    return (
      <div className="min-h-screen water-bg flex items-center justify-center">
        <div className="glass-effect p-8 rounded-2xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-blue-900">Memuat dashboard admin...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen water-bg">
      <Header variant="booking" />

      <div className="container mx-auto px-4 py-12">
        <div className="glass-effect rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="cormorant text-3xl md:text-4xl font-bold text-blue-900 mb-4 md:mb-0">Dashboard Admin</h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={fetchData}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <i className="fas fa-sync-alt mr-2"></i> Muat Ulang Data
              </button>
              <button
                onClick={() => router.push("/admin/packages")}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <i className="fas fa-box mr-2"></i> Kelola Paket
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
          )}

          {/* Bagian manajemen pemesanan */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">Manajemen Pemesanan</h2>

            {/* Filter untuk pemesanan */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Filter berdasarkan Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Semua Status</option>
                  <option value="pending">Menunggu</option>
                  <option value="confirmed">Dikonfirmasi</option>
                  <option value="completed">Selesai</option>
                  <option value="cancelled">Dibatalkan</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Filter berdasarkan Tanggal</label>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex-1 flex items-end">
                <button
                  onClick={() => {
                    setStatusFilter("all")
                    setDateFilter("")
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Hapus Filter
                </button>
              </div>
            </div>

            {/* Tabel pemesanan */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">ID</th>
                    <th className="py-3 px-4 text-left">Pengguna</th>
                    <th className="py-3 px-4 text-left">Paket</th>
                    <th className="py-3 px-4 text-left">Tanggal</th>
                    <th className="py-3 px-4 text-left">Pengunjung</th>
                    <th className="py-3 px-4 text-left">Total Harga</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <tr key={booking.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{booking.id}</td>
                        <td className="py-3 px-4">
                          <div>{booking.user_name}</div>
                          <div className="text-sm text-gray-500">{booking.user_email}</div>
                        </td>
                        <td className="py-3 px-4">{booking.package_name}</td>
                        <td className="py-3 px-4">{new Date(booking.booking_date).toLocaleDateString()}</td>
                        <td className="py-3 px-4">{booking.visitors}</td>
                        <td className="py-3 px-4">Rp {booking.total_price.toLocaleString()}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : booking.status === "confirmed"
                                  ? "bg-blue-100 text-blue-800"
                                  : booking.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                          >
                            {booking.status === "pending"
                              ? "Menunggu"
                              : booking.status === "confirmed"
                                ? "Dikonfirmasi"
                                : booking.status === "completed"
                                  ? "Selesai"
                                  : "Dibatalkan"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <select
                              value={booking.status}
                              onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                              className="p-1 border border-gray-300 rounded text-sm"
                            >
                              <option value="pending">Menunggu</option>
                              <option value="confirmed">Dikonfirmasi</option>
                              <option value="completed">Selesai</option>
                              <option value="cancelled">Dibatalkan</option>
                            </select>
                            <button
                              onClick={() => deleteBooking(booking.id)}
                              className="p-1 text-red-600 hover:text-red-800"
                              title="Hapus"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-4 px-4 text-center text-gray-500">
                        {bookings.length === 0
                          ? "Belum ada pemesanan. Pemesanan akan muncul di sini ketika pelanggan melakukan reservasi."
                          : "Tidak ada pemesanan yang sesuai dengan filter saat ini."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Kartu ringkasan */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Pemesanan</h3>
              <p className="text-3xl font-bold text-blue-600">{bookings.length}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Pemesanan Menunggu</h3>
              <p className="text-3xl font-bold text-yellow-600">
                {bookings.filter((b) => b.status === "pending").length}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Pemesanan Dikonfirmasi</h3>
              <p className="text-3xl font-bold text-blue-600">
                {bookings.filter((b) => b.status === "confirmed").length}
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Pendapatan</h3>
              <p className="text-3xl font-bold text-green-600">
                Rp{" "}
                {bookings
                  .filter((b) => b.status !== "cancelled")
                  .reduce((sum, booking) => sum + booking.total_price, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>

          {/* Bagian manajemen pengguna */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">Manajemen Pengguna</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left">ID</th>
                    <th className="py-3 px-4 text-left">Nama</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Tanggal Daftar</th>
                    <th className="py-3 px-4 text-left">Pemesanan</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{user.id}</td>
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">{new Date(user.created_at).toLocaleDateString()}</td>
                        <td className="py-3 px-4">{bookings.filter((b) => b.user_id === user.id).length}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-4 px-4 text-center text-gray-500">
                        Belum ada pengguna terdaftar.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer variant="simple" />
    </div>
  )
}
