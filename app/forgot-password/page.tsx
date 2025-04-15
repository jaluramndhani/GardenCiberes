"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate password reset request
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes only
      setIsSubmitted(true)
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen water-bg">
      <Header variant="booking" />

      <div className="container mx-auto px-4 py-16 max-w-md">
        <div className="glass-effect rounded-2xl shadow-2xl p-8 backdrop-blur-lg">
          <div className="text-center mb-8">
            <h1 className="cormorant text-4xl font-bold text-blue-900 mb-2">Reset Password</h1>
            <p className="text-blue-700">
              {isSubmitted
                ? "Check your email for reset instructions"
                : "Enter your email to receive password reset instructions"}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>
          )}

          {isSubmitted ? (
            <div className="text-center">
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </div>
              <p className="mb-4 text-gray-600">
                Please check your email and follow the instructions to reset your password.
              </p>
              <p className="text-gray-600">
                Didn't receive an email?{" "}
                <button onClick={() => setIsSubmitted(false)} className="text-blue-600 hover:text-blue-800 font-medium">
                  Try again
                </button>
              </p>
              <Link href="/login" className="mt-6 inline-block text-blue-600 hover:text-blue-800 font-medium">
                Return to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  <i className="fas fa-envelope text-cyan-600 mr-2"></i>Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-lg font-semibold rounded-lg
                hover:from-cyan-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300
                shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-circle-notch fa-spin mr-2"></i> Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </button>

              <div className="text-center mt-4">
                <Link href="/login" className="text-blue-600 hover:text-blue-800">
                  <i className="fas fa-arrow-left mr-2"></i> Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer variant="simple" />
    </div>
  )
}
