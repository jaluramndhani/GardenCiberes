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
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#EFF6FF",
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
                color: "#1E3A8A",
                marginBottom: "1rem",
              }}
            >
              Error
            </h1>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#4B5563",
                marginBottom: "1rem",
              }}
            >
              Terjadi Kesalahan
            </h2>
            <p
              style={{
                color: "#6B7280",
                marginBottom: "1.5rem",
              }}
            >
              Maaf, terjadi kesalahan saat memuat halaman ini.
            </p>
            <button
              onClick={() => reset()}
              style={{
                display: "inline-block",
                backgroundColor: "#2563EB",
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
