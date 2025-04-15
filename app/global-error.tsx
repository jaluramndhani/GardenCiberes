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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#f0f9ff",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "2rem",
              backgroundColor: "white",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              maxWidth: "28rem",
            }}
          >
            <h1
              style={{
                fontSize: "2.25rem",
                fontWeight: "bold",
                color: "#1e3a8a",
                marginBottom: "1rem",
              }}
            >
              Error
            </h1>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#4b5563",
                marginBottom: "1rem",
              }}
            >
              Terjadi Kesalahan
            </h2>
            <p
              style={{
                color: "#6b7280",
                marginBottom: "1.5rem",
              }}
            >
              Maaf, terjadi kesalahan saat memuat aplikasi. Silakan coba lagi.
            </p>
            <button
              onClick={() => reset()}
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
              }}
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
