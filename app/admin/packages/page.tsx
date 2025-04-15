"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Tipe data untuk package
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

export default function AdminPackages() {
  const [packages, setPackages] = useState<Package[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [currentPackage, setCurrentPackage] = useState<Package | null>(null)
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  // Redirect jika tidak login atau bukan admin
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
    // Untuk demo, kita anggap user dengan ID 34 adalah admin
    else if (user?.id !== 34) {
      router.push("/")
    }
  }, [isAuthenticated, router, user])

  // Fungsi untuk mengambil data paket
  const fetchPackages = async () => {
    setIsLoading(true)
    setError("")
    try {
      const response = await fetch("/api/admin/packages")
      if (!response.ok) {
        throw new Error("Gagal mengambil data paket")
      }
      const data = await response.json()
      setPackages(data)
    } catch (err) {
      console.error("Error fetching packages:", err)
      setError("Gagal memuat paket. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPackages()
  }, [])

  // Fungsi untuk menangani perubahan form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (!currentPackage) return

    setCurrentPackage({
      ...currentPackage,
      [name]: type === "number" ? Number.parseFloat(value) : name === "is_weekend" ? value === "true" : value,
    })
  }

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentPackage) return

    try {
      const method = currentPackage.id ? "PUT" : "POST"
      const url = currentPackage.id ? `/api/admin/packages/${currentPackage.id}` : "/api/admin/packages"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentPackage),
      })

      if (!response.ok) {
        throw new Error(`Gagal ${currentPackage.id ? "memperbarui" : "membuat"} paket`)
      }

      // Refresh data
      await fetchPackages()
      setIsEditing(false)
      setCurrentPackage(null)
    } catch (err) {
      console.error("Error saving package:", err)
      setError(`Gagal ${currentPackage.id ? "memperbarui" : "membuat"} paket. Silakan coba lagi.`)
    }
  }

  // Fungsi untuk menghapus paket
  const deletePackage = async (packageId: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus paket ini?")) {
      return
    }

    try {
      const response = await fetch(`/api/admin/packages/${packageId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Gagal menghapus paket")
      }

      // Refresh data
      await fetchPackages()
    } catch (err) {
      console.error("Error deleting package:", err)
      setError("Gagal menghapus paket. Silakan coba lagi.")
    }
  }

  // Fungsi untuk mengedit paket
  const editPackage = (pkg: Package) => {
    setCurrentPackage(pkg)
    setIsEditing(true)
  }

  // Fungsi untuk membuat paket baru
  const createNewPackage = () => {
    setCurrentPackage({
      id: 0,
      name: "",
      subtitle: "",
      description: "",
      max_persons: 30,
      price_per_person: 15000,
      is_weekend: false,
      time_slot: "",
      image_url: "",
    })
    setIsEditing(true)
  }

  // Jika loading atau tidak terautentikasi, tampilkan loading
  if (isLoading || !isAuthenticated || user?.id !== 34) {
    return (
      <div className="min-h-screen water-bg flex items-center justify-center">
        <div className="glass-effect p-8 rounded-2xl text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
          <p className="text-blue-900">Memuat manajemen paket...</p>
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
            <h1 className="cormorant text-3xl md:text-4xl font-bold text-blue-900 mb-4 md:mb-0">Manajemen Paket</h1>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push("/admin")}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
              >
                <i className="fas fa-arrow-left mr-2"></i> Kembali ke Dashboard
              </button>
              <button
                onClick={createNewPackage}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <i className="fas fa-plus mr-2"></i> Tambah Paket Baru
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
          )}

          {isEditing ? (
            <div className="bg-white rounded-xl p-6 shadow-md mb-8">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">
                {currentPackage?.id ? "Edit Paket" : "Buat Paket Baru"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Nama Paket*</label>
                    <input
                      type="text"
                      name="name"
                      value={currentPackage?.name || ""}
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Subtitle</label>
                    <input
                      type="text"
                      name="subtitle"
                      value={currentPackage?.subtitle || ""}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Deskripsi</label>
                  <textarea
                    name="description"
                    value={currentPackage?.description || ""}
                    onChange={handleChange}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Maksimal Orang*</label>
                    <input
                      type="number"
                      name="max_persons"
                      value={currentPackage?.max_persons || 0}
                      onChange={handleChange}
                      required
                      min="1"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Harga Per Orang (Rp)*</label>
                    <input
                      type="number"
                      name="price_per_person"
                      value={currentPackage?.price_per_person || 0}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Paket Akhir Pekan?</label>
                    <select
                      name="is_weekend"
                      value={currentPackage?.is_weekend ? "true" : "false"}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="false">Tidak (Hari Kerja)</option>
                      <option value="true">Ya (Akhir Pekan)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Slot Waktu</label>
                    <input
                      type="text"
                      name="time_slot"
                      value={currentPackage?.time_slot || ""}
                      onChange={handleChange}
                      placeholder="contoh: 09:00 - 12:00"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">URL Gambar</label>
                    <input
                      type="text"
                      name="image_url"
                      value={currentPackage?.image_url || ""}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false)
                      setCurrentPackage(null)
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {currentPackage?.id ? "Perbarui Paket" : "Buat Paket"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">Paket Tersedia</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-blue-600 text-white">
                    <tr>
                      <th className="py-3 px-4 text-left">ID</th>
                      <th className="py-3 px-4 text-left">Nama</th>
                      <th className="py-3 px-4 text-left">Slot Waktu</th>
                      <th className="py-3 px-4 text-left">Maks Orang</th>
                      <th className="py-3 px-4 text-left">Harga</th>
                      <th className="py-3 px-4 text-left">Akhir Pekan</th>
                      <th className="py-3 px-4 text-left">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.length > 0 ? (
                      packages.map((pkg) => (
                        <tr key={pkg.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{pkg.id}</td>
                          <td className="py-3 px-4">
                            <div>{pkg.name}</div>
                            <div className="text-sm text-gray-500">{pkg.subtitle}</div>
                          </td>
                          <td className="py-3 px-4">{pkg.time_slot}</td>
                          <td className="py-3 px-4">{pkg.max_persons}</td>
                          <td className="py-3 px-4">Rp {pkg.price_per_person.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            {pkg.is_weekend ? (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                Akhir Pekan
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                                Hari Kerja
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => editPackage(pkg)}
                                className="p-1 text-blue-600 hover:text-blue-800"
                                title="Edit"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                onClick={() => deletePackage(pkg.id)}
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
                        <td colSpan={7} className="py-4 px-4 text-center text-gray-500">
                          Belum ada paket. Buat paket pertama Anda untuk memulai.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer variant="simple" />
    </div>
  )
}
