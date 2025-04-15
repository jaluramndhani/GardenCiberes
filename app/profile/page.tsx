"use client"

import Link from "next/link"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Profile() {
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen water-bg">
      <Header variant="booking" />

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="glass-effect rounded-2xl shadow-2xl p-8 backdrop-blur-lg">
          <div className="text-center mb-8">
            <h1 className="cormorant text-4xl font-bold text-blue-900 mb-2">My Profile</h1>
            <p className="text-blue-700">Manage your Garden Ciberes account</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex justify-center mb-4">
                  <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-5xl">
                    <i className="fas fa-user"></i>
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-center">{user.name}</h2>
                <p className="text-gray-500 text-center">{user.email}</p>
                <div className="mt-6 space-y-2">
                  <button className="w-full py-2 px-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center">
                    <i className="fas fa-edit mr-2"></i> Edit Profile
                  </button>
                  <button className="w-full py-2 px-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex items-center">
                    <i className="fas fa-key mr-2"></i> Change Password
                  </button>
                  <button
                    onClick={logout}
                    className="w-full py-2 px-4 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors flex items-center"
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i> Sign Out
                  </button>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Account Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={user.name}
                      readOnly
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Member Since</label>
                    <input
                      type="text"
                      value="April 2023"
                      readOnly
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                </div>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Recent Bookings</h2>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Weekend Premium Package</h3>
                        <p className="text-gray-600">April 15, 2023 • 2 Visitors</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Completed</span>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">Family Package</h3>
                        <p className="text-gray-600">May 20, 2023 • 4 Visitors</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Upcoming</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Link href="/my-bookings" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    View all bookings <i className="fas fa-arrow-right ml-2"></i>
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
