"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Tipe data untuk user
type User = {
  id: string
  name: string
  email: string
  phone_number?: string
  profile_image?: string
  created_at?: string
}

// Tipe data untuk context autentikasi
type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  updateProfile: (data: Partial<User>) => Promise<boolean>
}

// Membuat context untuk autentikasi
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider untuk context autentikasi
export function AuthProvider({ children }: { children: ReactNode }) {
  // State untuk menyimpan data user dan status loading
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Cek apakah user sudah login saat aplikasi dimuat
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // Ambil data user dari localStorage
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Error reading from localStorage:", error)
      }
      setIsLoading(false)
    }
  }, [])

  // Fungsi untuk login
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // Kirim request ke API login
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Login failed")
      }

      // Simpan data user ke state dan localStorage
      const userData = await response.json()
      setUser(userData)
      try {
        localStorage.setItem("user", JSON.stringify(userData))
      } catch (error) {
        console.error("Error writing to localStorage:", error)
      }
      return true
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Fungsi untuk logout
  const logout = () => {
    // Hapus data user dari state dan localStorage
    setUser(null)
    try {
      localStorage.removeItem("user")
    } catch (error) {
      console.error("Error removing from localStorage:", error)
    }
  }

  // Fungsi untuk update profil user
  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false

    try {
      // Kirim request ke API update profil
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id, ...data }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update profile")
      }

      // Update data user di state dan localStorage
      const updatedUser = await response.json()
      setUser(updatedUser)
      try {
        localStorage.setItem("user", JSON.stringify(updatedUser))
      } catch (error) {
        console.error("Error writing to localStorage:", error)
      }
      return true
    } catch (error) {
      console.error("Update profile error:", error)
      return false
    }
  }

  // Nilai yang akan disediakan oleh context
  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook untuk menggunakan context autentikasi
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
