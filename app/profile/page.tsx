"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Profile() {
  const { user, isAuthenticated, logout, updateProfile } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  // Set initial form values
  useEffect(() => {
    if (user) {
      setName(user.name || "")
      setPhoneNumber(user.phone_number || "")
      setProfileImage(user.profile_image || "")
    }
  }, [user])

  if (!user) {
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      const success = await updateProfile({
        name,
        phone_number: phoneNumber,
        profile_image: profileImage,
      })

      if (success) {
        setSuccess("Profil berhasil diperbarui")
        setIsEditing(false)
      } else {
        setError("Gagal memperbarui profil. Silakan coba lagi.")
      }
    } catch (err) {
      console.error("Error updating profile:", err)
      setError("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setProfileImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen water-bg">
      <Header variant="booking" />

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="glass-effect rounded-2xl shadow-2xl p-8 backdrop-blur-lg">
          <div className="text-center mb-8">
            <h1 className="cormorant text-4xl font-bold text-blue-900 mb-2">Profil Saya</h1>
            <p className="text-blue-700">Kelola akun Garden Ciberes Anda</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              {success}
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-center mb-4">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden bg-blue-100">
                    {profileImage ? (
                      <Image
                        src={profileImage || "/placeholder.svg"}
                        alt={user.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-blue-600 text-5xl">
                        <i className="fas fa-user"></i>
                      </div>
                    )}
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-center">{user.name}</h2>
                <p className="text-gray-500 text-center">{user.email}</p>
                {user.phone_number && (
                  <p className="text-gray-500 text-center mt-1">
                    <i className="fas fa-phone mr-2"></i>
                    {user.phone_number}
                  </p>
                )}
                <div className="mt-6 space-y-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="w-full py-2 px-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center"
                  >
                    <i className="fas fa-edit mr-2"></i> {isEditing ? "Batal Edit" : "Edit Profil"}
                  </button>
                  <Link
                    href="/my-bookings"
                    className="w-full py-2 px-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center"
                  >
                    <i className="fas fa-calendar-alt mr-2"></i> Pemesanan Saya
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full py-2 px-4 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Keluar
                  </button>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Informasi Akun</h2>
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Foto Profil</label>
                      <div className="flex items-center space-x-4">
                        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-blue-100">
                          {profileImage ? (
                            <Image
                              src={profileImage || "/placeholder.svg"}
                              alt={name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-blue-600 text-2xl">
                              <i className="fas fa-user"></i>
                            </div>
                          )}
                        </div>
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Pilih Foto
                          </button>
                          {profileImage && (
                            <button
                              type="button"
                              onClick={() => setProfileImage("")}
                              className="ml-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                              Hapus
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Nama Lengkap</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={user.email}
                        readOnly
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                      />
                      <p className="text-sm text-gray-500 mt-1">Email tidak dapat diubah</p>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Nomor Telepon</label>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+62 xxx-xxxx-xxxx"
                      />
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false)
                          setName(user.name)
                          setPhoneNumber(user.phone_number || "")
                          setProfileImage(user.profile_image || "")
                        }}
                        className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70"
                      >
                        {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Nama Lengkap</label>
                      <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">{user.name}</div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Email</label>
                      <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">{user.email}</div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Nomor Telepon</label>
                      <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
                        {user.phone_number || "Belum ditambahkan"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Tanggal Bergabung</label>
                      <div className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50">
                        {new Date(user.created_at).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md mt-6">
                <h2 className="text-2xl font-semibold mb-4">Pemesanan Terbaru</h2>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Akhir Pekan</h3>
                        <p className="text-gray-600">15 April 2023 • 2 Pengunjung</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Selesai</span>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Deluxe Hari Kerja</h3>
                        <p className="text-gray-600">20 Mei 2023 • 4 Pengunjung</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Akan Datang</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="/my-bookings" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    Lihat semua pemesanan <i className="fas fa-arrow-right ml-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer variant="simple" />
    </div>
  )
}
