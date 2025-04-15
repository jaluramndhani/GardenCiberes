"use server"

import { cookies } from "next/headers"
import { sql } from "@/lib/db"
import { generateSalt, hashPassword, verifyPassword } from "@/lib/auth-utils"

export type AuthResult = {
  success: boolean
  message?: string
  user?: {
    id: number
    name: string
    email: string
  }
}

export async function registerUser(formData: FormData): Promise<AuthResult> {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!name || !email || !password) {
    return { success: false, message: "All fields are required" }
  }

  try {
    // Check if user already exists
    const existingUser = await sql`SELECT * FROM users WHERE email = ${email}`

    if (existingUser.length > 0) {
      return { success: false, message: "Email already registered" }
    }

    // Generate salt and hash password
    const salt = generateSalt()
    const hashedPassword = hashPassword(password, salt)

    // Insert new user
    const result = await sql`
      INSERT INTO users (name, email, password, salt) 
      VALUES (${name}, ${email}, ${hashedPassword}, ${salt}) 
      RETURNING id, name, email
    `

    const newUser = result[0]

    return {
      success: true,
      message: "Registration successful",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, message: "An error occurred during registration" }
  }
}

export async function loginUser(formData: FormData): Promise<AuthResult> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { success: false, message: "Email and password are required" }
  }

  try {
    // Find user by email
    const users = await sql`SELECT * FROM users WHERE email = ${email}`

    if (users.length === 0) {
      return { success: false, message: "Invalid email or password" }
    }

    const user = users[0]

    // Verify password
    const isPasswordValid = verifyPassword(password, user.password, user.salt)

    if (!isPasswordValid) {
      return { success: false, message: "Invalid email or password" }
    }

    // Set session cookie
    const sessionId = crypto.randomUUID()
    cookies().set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    // In a real app, you would store the session in a database
    // For now, we'll just return the user data

    return {
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, message: "An error occurred during login" }
  }
}

export async function logoutUser(): Promise<{ success: boolean }> {
  try {
    cookies().delete("session_id")
    return { success: true }
  } catch (error) {
    console.error("Logout error:", error)
    return { success: false }
  }
}
