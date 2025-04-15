"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Payment method types
type PaymentMethod = "bca" | "mandiri" | "bni" | "gopay" | "ovo" | "dana" | "shopeepay" | null

export default function Booking() {
  const searchParams = useSearchParams()
  const [visitors, setVisitors] = useState<number>(1)
  const [date, setDate] = useState<string>("")
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null)

  // Use a ref to track if we've already initialized from URL params
  const initializedRef = useRef(false)

  // Set initial visitors from URL params - ONLY ONCE
  useEffect(() => {
    if (!initializedRef.current) {
      const visitorParam = searchParams.get("visitors")
      if (visitorParam) {
        const parsedValue = Number.parseInt(visitorParam)
        if (!isNaN(parsedValue) && parsedValue > 0) {
          setVisitors(parsedValue)
        }
      }

      // Set default date to today
      const today = new Date()
      const formattedDate = today.toISOString().split("T")[0]
      setDate(formattedDate)

      // Mark as initialized so we don't reset on re-renders
      initializedRef.current = true
    }
  }, [searchParams])

  // Calculate total price when visitors or date changes
  useEffect(() => {
    if (!date) return

    const selectedDate = new Date(date)
    const day = selectedDate.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const pricePerPerson = day === 0 || day === 6 ? 25000 : 15000 // Weekend or Weekday
    const total = pricePerPerson * visitors

    setTotalPrice(total)
  }, [visitors, date])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedPayment(null)
  }

  const selectPayment = (method: PaymentMethod) => {
    setSelectedPayment(method)
  }

  const processPayment = () => {
    if (!selectedPayment) return

    // Here you would typically integrate with a payment gateway
    alert(`Processing payment with ${selectedPayment}. Thank you for your booking!`)
    closeModal()
  }

  // Simple functions to increment and decrement visitors
  const incrementVisitors = () => {
    setVisitors((prev) => prev + 1)
  }

  const decrementVisitors = () => {
    setVisitors((prev) => Math.max(1, prev - 1))
  }

  // Handle direct input change
  const handleVisitorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      setVisitors(value)
    } else if (e.target.value === "") {
      setVisitors(1)
    }
  }

  return (
    <div className="water-bg min-h-screen">
      <Header variant="booking" />

      {/* Hero Section */}
      <div className="relative h-64 sm:h-96 overflow-hidden mb-8">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1550399504-8953e1a6ac87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
            alt="Luxury Pool"
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>
        <div className="relative container mx-auto h-full flex items-center justify-center">
          <h1 className="text-4xl sm:text-6xl text-white font-bold text-center drop-shadow-lg">
            Luxury Pool Experience
          </h1>
        </div>
      </div>

      {/* Booking Form Section */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="glass-effect rounded-2xl shadow-2xl p-6 sm:p-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center">Reserve Your Ticket</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                    <i className="fas fa-user text-cyan-600 mr-2"></i>Nama Lengkap*
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                    placeholder="Your Full Name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                    <i className="fas fa-phone text-cyan-600 mr-2"></i>Nomor Telp*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                    placeholder="Your Phone Number"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                    <i className="fas fa-envelope text-cyan-600 mr-2"></i>Alamat Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                    placeholder="Your Email Address"
                  />
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="visitors">
                    <i className="fas fa-users text-cyan-600 mr-2"></i>Jumlah Pengunjung
                  </label>

                  {/* Simplified visitor counter */}
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={decrementVisitors}
                      className="px-4 py-3 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                      <i className="fas fa-minus"></i>
                    </button>

                    <input
                      type="number"
                      id="visitors"
                      min="1"
                      value={visitors}
                      onChange={handleVisitorChange}
                      className="w-full p-3 text-center text-xl font-semibold border-x border-gray-300 focus:outline-none"
                    />

                    <button
                      type="button"
                      onClick={incrementVisitors}
                      className="px-4 py-3 bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>

                  {/* Current visitor count display */}
                  <div className="mt-3 text-center">
                    <span className="text-gray-600">
                      Jumlah pengunjung saat ini: <strong>{visitors} orang</strong>
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="date">
                    <i className="fas fa-calendar text-cyan-600 mr-2"></i>Tanggal Datang
                  </label>
                  <input
                    type="date"
                    id="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-xl border border-blue-100 shadow-sm w-full">
                <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">Ringkasan Pemesanan</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">
                    <i className="fas fa-users text-cyan-600 mr-2"></i>
                    {visitors} {visitors === 1 ? "Pengunjung" : "Pengunjung"}
                  </span>
                  <span className="text-gray-700">
                    <i className="fas fa-calendar text-cyan-600 mr-2"></i>
                    {date
                      ? new Date(date).toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Pilih tanggal"}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-100">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-800">Total Harga:</span>
                    <span id="totalPrice" className="text-2xl font-bold text-blue-700">
                      Rp {totalPrice.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    <i className="fas fa-info-circle mr-1"></i>
                    {date && (new Date(date).getDay() === 0 || new Date(date).getDay() === 6)
                      ? "Tarif akhir pekan: Rp 25.000 per orang"
                      : "Tarif hari biasa: Rp 15.000 per orang"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="px-12 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-lg font-semibold rounded-lg
                hover:from-cyan-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300
                shadow-lg hover:shadow-xl"
              >
                <i className="fas fa-check-circle mr-2"></i>
                BOOK NOW
              </button>
            </div>
          </form>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          <div className="glass-effect p-6 rounded-xl text-center">
            <i className="fas fa-swimming-pool text-4xl text-cyan-600 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Premium Pool Access</h3>
            <p className="text-gray-600">Experience our world-class swimming facilities</p>
          </div>
          <div className="glass-effect p-6 rounded-xl text-center">
            <i className="fas fa-umbrella-beach text-4xl text-cyan-600 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Luxury Amenities</h3>
            <p className="text-gray-600">Enjoy premium loungers and cabanas</p>
          </div>
          <div className="glass-effect p-6 rounded-xl text-center">
            <i className="fas fa-concierge-bell text-4xl text-cyan-600 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Premium Service</h3>
            <p className="text-gray-600">Dedicated staff at your service</p>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="modal show">
          <div className="modal-content glass-effect rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Select Payment Method</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <i className="fas fa-times text-2xl"></i>
              </button>
            </div>

            {/* Bank Transfer Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                <i className="fas fa-university mr-2"></i>Bank Transfer
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  className={`payment-option border rounded-xl p-4 flex items-center space-x-4 ${selectedPayment === "bca" ? "selected" : ""}`}
                  onClick={() => selectPayment("bca")}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png"
                    alt="BCA"
                    className="h-8 object-contain"
                  />
                  <span className="font-medium">BCA</span>
                </div>
                <div
                  className={`payment-option border rounded-xl p-4 flex items-center space-x-4 ${selectedPayment === "mandiri" ? "selected" : ""}`}
                  onClick={() => selectPayment("mandiri")}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/2560px-Bank_Mandiri_logo_2016.svg.png"
                    alt="Mandiri"
                    className="h-8 object-contain"
                  />
                  <span className="font-medium">Mandiri</span>
                </div>
                <div
                  className={`payment-option border rounded-xl p-4 flex items-center space-x-4 ${selectedPayment === "bni" ? "selected" : ""}`}
                  onClick={() => selectPayment("bni")}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/2560px-BNI_logo.svg.png"
                    alt="BNI"
                    className="h-8 object-contain"
                  />
                  <span className="font-medium">BNI</span>
                </div>
              </div>
            </div>

            {/* E-Wallet Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                <i className="fas fa-wallet mr-2"></i>E-Wallet
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  className={`payment-option border rounded-xl p-4 flex items-center space-x-4 ${selectedPayment === "gopay" ? "selected" : ""}`}
                  onClick={() => selectPayment("gopay")}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/2560px-Gopay_logo.svg.png"
                    alt="GoPay"
                    className="h-8 object-contain"
                  />
                  <span className="font-medium">GoPay</span>
                </div>
                <div
                  className={`payment-option border rounded-xl p-4 flex items-center space-x-4 ${selectedPayment === "ovo" ? "selected" : ""}`}
                  onClick={() => selectPayment("ovo")}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/2560px-Logo_ovo_purple.svg.png"
                    alt="OVO"
                    className="h-8 object-contain"
                  />
                  <span className="font-medium">OVO</span>
                </div>
                <div
                  className={`payment-option border rounded-xl p-4 flex items-center space-x-4 ${selectedPayment === "dana" ? "selected" : ""}`}
                  onClick={() => selectPayment("dana")}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/2560px-Logo_dana_blue.svg.png"
                    alt="DANA"
                    className="h-8 object-contain"
                  />
                  <span className="font-medium">DANA</span>
                </div>
                <div
                  className={`payment-option border rounded-xl p-4 flex items-center space-x-4 ${selectedPayment === "shopeepay" ? "selected" : ""}`}
                  onClick={() => selectPayment("shopeepay")}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/ShopeePay_logo.svg/2560px-ShopeePay_logo.svg.png"
                    alt="ShopeePay"
                    className="h-8 object-contain"
                  />
                  <span className="font-medium">ShopeePay</span>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <div className="flex justify-center mt-6 sm:mt-8">
              <button
                type="button"
                onClick={processPayment}
                className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-base sm:text-lg font-semibold rounded-lg
                hover:from-cyan-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300
                shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedPayment}
              >
                <i className="fas fa-lock mr-2"></i>
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer variant="simple" />
    </div>
  )
}
