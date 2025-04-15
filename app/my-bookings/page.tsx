"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function MyBookings() {
  const { user, isAuthenticated } = useAuth()
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
            <h1 className="cormorant text-4xl font-bold text-blue-900 mb-2">My Bookings</h1>
            <p className="text-blue-700">Manage your Garden Ciberes reservations</p>
          </div>

          <div className="space-y-6">
            {/* Upcoming Bookings */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Upcoming Bookings</h2>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900">Family Package</h3>
                      <p className="text-gray-600">May 20, 2023 • 09:00 - 12:00</p>
                      <div className="mt-2 flex items-center">
                        <i className="fas fa-users text-blue-600 mr-2"></i>
                        <span>4 Visitors</span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Upcoming</span>
                      <p className="mt-2 text-xl font-bold text-blue-600">Rp 80.000</p>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <i className="fas fa-edit mr-2"></i>Modify
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      <i className="fas fa-times mr-2"></i>Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Past Bookings */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Past Bookings</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-blue-900">Weekend Premium Package</h3>
                        <p className="text-gray-600">April 15, 2023 • 06:00 - 09:00</p>
                        <div className="mt-2 flex items-center">
                          <i className="fas fa-users text-blue-600 mr-2"></i>
                          <span>2 Visitors</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Completed</span>
                        <p className="mt-2 text-xl font-bold text-blue-600">Rp 50.000</p>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-3">
                      <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                        <i className="fas fa-redo mr-2"></i>Book Again
                      </button>
                      <button className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                        <i className="fas fa-receipt mr-2"></i>Receipt
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-blue-900">Weekday Deluxe Package</h3>
                        <p className="text-gray-600">March 10, 2023 • 08:00 - 11:00</p>
                        <div className="mt-2 flex items-center">
                          <i className="fas fa-users text-blue-600 mr-2"></i>
                          <span>3 Visitors</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Completed</span>
                        <p className="mt-2 text-xl font-bold text-blue-600">Rp 45.000</p>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-3">
                      <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                        <i className="fas fa-redo mr-2"></i>Book Again
                      </button>
                      <button className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                        <i className="fas fa-receipt mr-2"></i>Receipt
                      </button>
                    </div>
                  </div>
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
