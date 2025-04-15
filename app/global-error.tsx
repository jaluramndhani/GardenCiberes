"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex items-center justify-center bg-blue-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">500</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Kesalahan Server</h2>
            <p className="text-gray-600 mb-6">Maaf, terjadi kesalahan pada server kami. Silakan coba lagi nanti.</p>
            <button
              onClick={() => reset()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
