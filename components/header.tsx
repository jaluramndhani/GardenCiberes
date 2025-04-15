"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"

interface HeaderProps {
  variant?: "default" | "transparent" | "booking"
}

export default function Header({ variant = "default" }: HeaderProps) {
  // State untuk mengontrol tampilan header
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Hooks untuk autentikasi dan routing
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()

  // Effect untuk mendeteksi scroll dan mengubah tampilan header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Fungsi untuk menentukan class header berdasarkan variant dan scroll
  const getHeaderClass = () => {
    if (variant === "transparent" && !isScrolled && !isMobileMenuOpen) {
      return "bg-transparent text-white"
    } else if (variant === "booking" || isScrolled || isMobileMenuOpen) {
      return "bg-white text-gray-900 shadow-md"
    } else {
      return "bg-transparent text-white"
    }
  }

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderClass()}`}
      style={{
        transition: "background-color 0.5s ease, color 0.5s ease, box-shadow 0.5s ease",
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/images/garden-ciberes-logo.png" alt="Garden Ciberes Logo" className="h-20 sm:h-24" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link
              href="/"
              className={`transition-colors ${!isScrolled && variant === "transparent" ? "text-white hover:text-blue-200" : "hover:text-blue-600"}`}
            >
              Beranda
            </Link>
            <Link
              href="/booking"
              className={`transition-colors ${!isScrolled && variant === "transparent" ? "text-white hover:text-blue-200" : "hover:text-blue-600"}`}
            >
              Booking Tiket
            </Link>
            <Link
              href="/about"
              className={`transition-colors ${!isScrolled && variant === "transparent" ? "text-white hover:text-blue-200" : "hover:text-blue-600"}`}
            >
              Tentang Kami
            </Link>

            {/* Tampilkan menu user jika sudah login, atau tombol login jika belum */}
            {isAuthenticated ? (
              <div className="relative group">
                <button
                  className={`flex items-center transition-colors ${!isScrolled && variant === "transparent" ? "text-white hover:text-blue-200" : "hover:text-blue-600"}`}
                >
                  <span className="mr-1">{user?.name || "Pengguna"}</span>
                  <i className="fas fa-chevron-down text-xs"></i>
                </button>
                {/* Dropdown menu untuk user yang sudah login */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600">
                    Profil Saya
                  </Link>
                  <Link
                    href="/my-bookings"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Pemesanan Saya
                  </Link>
                  {/* Tampilkan link admin jika user adalah admin (ID 34) */}
                  {user?.id === 34 && (
                    <Link href="/admin" className="block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Keluar
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Masuk
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
          >
            <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </button>
        </div>

        {/* Mobile Navigation - tampil saat tombol menu diklik */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-4 py-4">
            <Link
              href="/"
              className="block hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Beranda
            </Link>
            <Link
              href="/booking"
              className="block hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Booking Tiket
            </Link>
            <Link
              href="/about"
              className="block hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tentang Kami
            </Link>
            {isAuthenticated ? (
              <>
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-gray-500 mb-2">Masuk sebagai: {user?.name || "Pengguna"}</p>
                  <Link
                    href="/profile"
                    className="block hover:text-blue-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profil Saya
                  </Link>
                  <Link
                    href="/my-bookings"
                    className="block hover:text-blue-600 transition-colors mt-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pemesanan Saya
                  </Link>
                  {user?.id === 34 && (
                    <Link
                      href="/admin"
                      className="block hover:text-blue-600 transition-colors mt-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="block w-full text-left text-red-600 hover:text-red-700 transition-colors mt-2"
                  >
                    Keluar
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Masuk
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
