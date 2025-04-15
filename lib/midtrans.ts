import midtransClient from "midtrans-client"

// Konfigurasi Midtrans
const isProduction = process.env.NODE_ENV === "production"

// Inisialisasi Snap API
export const createSnapInstance = () => {
  return new midtransClient.Snap({
    isProduction,
    serverKey: process.env.MIDTRANS_SERVER_KEY || "",
    clientKey: process.env.MIDTRANS_CLIENT_KEY || "",
  })
}

// Inisialisasi Core API (untuk fitur lanjutan)
export const createCoreApiInstance = () => {
  return new midtransClient.CoreApi({
    isProduction,
    serverKey: process.env.MIDTRANS_SERVER_KEY || "",
    clientKey: process.env.MIDTRANS_CLIENT_KEY || "",
  })
}

// Fungsi untuk membuat order ID unik
export const generateOrderId = (prefix = "GC") => {
  const timestamp = new Date().getTime()
  const randomNum = Math.floor(Math.random() * 1000)
  return `${prefix}-${timestamp}-${randomNum}`
}
