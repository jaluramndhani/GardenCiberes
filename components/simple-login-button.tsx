"use client"

import Link from "next/link"

interface SimpleLoginButtonProps {
  variant?: "icon" | "text"
  className?: string
}

export default function SimpleLoginButton({ variant = "text", className = "" }: SimpleLoginButtonProps) {
  return (
    <Link
      href="/login"
      className={`cursor-pointer ${className}`}
      style={{ display: "inline-flex", alignItems: "center" }}
    >
      {variant === "text" ? (
        <>
          <i className="fas fa-user-circle mr-2"></i>Login
        </>
      ) : (
        <i className="fas fa-user-circle text-white text-2xl sm:text-3xl"></i>
      )}
    </Link>
  )
}
