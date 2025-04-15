"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/context/auth-context"

interface HeaderProps {
  variant?: "default" | "booking" | "auth"
}

export default function Header({ variant = "default" }: HeaderProps) {
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleLoginClick = () => {
    router.push("/login")
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuRef])

  return (
    <header
      className={`${variant === "booking" || variant === "auth" ? "luxury-gradient" : "water-ripple"} ${variant === "default" ? "py-8" : "py-3"} px-6 md:px-12 relative z-10 text-white`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-6 md:mb-0">
          <Link href="/">
            <Image
              src="/images/GARDEN-CIBERES-LOGO-PPKD1-1.png"
              alt="Garden Ciberes Logo"
              width={variant === "default" ? 112 : 64}
              height={variant === "default" ? 112 : 64}
              unoptimized
              className={`${variant === "default" ? "h-20 md:h-28" : "h-12 sm:h-16"} w-auto filter drop-shadow-lg`}
            />
          </Link>
        </div>
        <nav className="flex items-center space-x-8">
          {variant === "default" ? (
            <>
              <Link
                href="/"
                className="text-white hover:text-blue-200 transition-all duration-300 text-lg tracking-wide"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-blue-200 transition-all duration-300 text-lg tracking-wide"
              >
                About
              </Link>
              <Link
                href="/gallery"
                className="text-white hover:text-blue-200 transition-all duration-300 text-lg tracking-wide"
              >
                Gallery
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-blue-200 transition-all duration-300 text-lg tracking-wide"
              >
                Contact
              </Link>
              <Link
                href="/packages"
                className="glass-effect text-white hover:bg-white hover:text-blue-900 transition-all duration-300 font-semibold py-3 px-8 rounded-full luxury-shadow"
              >
                Book Now
              </Link>
              {isAuthenticated ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={toggleMenu}
                    className="text-white hover:text-blue-200 transition-all duration-300 text-lg tracking-wide flex items-center"
                  >
                    <i className="fas fa-user-circle mr-2"></i>
                    {user?.name?.split(" ")[0]}
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-[999] max-h-[300px] overflow-y-auto">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/my-bookings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        My Bookings
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout()
                          closeMenu()
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="glass-effect text-white hover:bg-white hover:text-blue-900 transition-all duration-300 font-semibold py-3 px-8 rounded-full luxury-shadow"
                >
                  Login
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                href={variant === "booking" ? "/packages" : "/"}
                className="text-white hover:text-yellow-200 transition-colors text-sm sm:text-base font-medium"
              >
                {variant === "booking" ? "Back to Schedule" : "Home"}
              </Link>
              <Link
                href="/my-bookings"
                className="text-white hover:text-yellow-200 transition-colors text-sm sm:text-base font-medium"
              >
                My Bookings
              </Link>
              {isAuthenticated ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={toggleMenu}
                    className="text-white hover:text-yellow-200 transition-colors flex items-center"
                  >
                    <i className="fas fa-user-circle text-white text-2xl sm:text-3xl mr-2"></i>
                    {user?.name?.split(" ")[0]}
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-[999] max-h-[300px] overflow-y-auto">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/my-bookings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={closeMenu}
                      >
                        My Bookings
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout()
                          closeMenu()
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="glass-effect text-white hover:bg-white hover:text-blue-900 transition-all duration-300 font-semibold py-3 px-8 rounded-full luxury-shadow"
                >
                  Login
                </Link>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
