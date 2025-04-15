"use client"

import { useRouter } from "next/navigation"

interface LoginButtonProps {
  variant?: "icon" | "text"
  className?: string
}

export default function LoginButton({ variant = "text", className = "" }: LoginButtonProps) {
  const router = useRouter()

  const handleClick = () => {
    console.log("Login button clicked")
    router.push("/login")
  }

  return (
    <button
      onClick={handleClick}
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
    </button>
  )
}
