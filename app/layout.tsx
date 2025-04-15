import type React from "react"
import type { Metadata } from "next"
import { AuthProvider } from "@/context/auth-context"
import "./globals.css"

// Hapus import font dari next/font/google dan gunakan CSS biasa
// Kita akan menambahkan font melalui link tag

export const metadata: Metadata = {
  title: "Garden Ciberes - Premium Pool Experience",
  description: "Experience luxury pool services at Garden Ciberes",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
        {/* Tambahkan font Google melalui link tag */}
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}


import './globals.css'