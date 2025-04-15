"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { loginUser, logoutUser, type AuthResult } from "@/app/actions/auth-actions"

type User = {
  id: number
  name: string
  email: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (formData: FormData) => Promise<AuthResult>
  logout: () => Promise<void>
  isAuthenticated: boolean
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is logged in on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
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

  // Login function
  const login = async (formData: FormData): Promise<AuthResult> => {
    setIsLoading(true)
    try {
      const result = await loginUser(formData)

      if (result.success && result.user) {
        setUser(result.user)
        try {
          localStorage.setItem("user", JSON.stringify(result.user))
        } catch (error) {
          console.error("Error writing to localStorage:", error)
        }
      }

      return result
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, message: "An unexpected error occurred" }
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = async () => {
    try {
      await logoutUser()
      setUser(null)
      try {
        localStorage.removeItem("user")
      } catch (error) {
        console.error("Error removing from localStorage:", error)
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
    setUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
