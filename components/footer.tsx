import Link from "next/link"

interface FooterProps {
  variant?: "default" | "simple"
}

export default function Footer({ variant = "default" }: FooterProps) {
  const currentYear = new Date().getFullYear()

  if (variant === "simple") {
    return (
      <footer className="bg-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">
            <p>&copy; {currentYear} Garden Ciberes. Seluruh hak cipta dilindungi.</p>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-blue-900 text-white py-10 sm:py-12 mt-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Garden Ciberes</h3>
            <p className="text-blue-200 mb-4 text-sm sm:text-base">
              Pengalaman berenang terbaik dengan fasilitas premium dan pelayanan yang luar biasa.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-300 transition-colors text-xl">
                <i className="fab fa-facebook-f"></i>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link href="/" className="text-blue-200 hover:text-white transition-colors flex items-center">
                  <i className="fas fa-chevron-right text-xs mr-2"></i> Beranda
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-blue-200 hover:text-white transition-colors flex items-center">
                  <i className="fas fa-chevron-right text-xs mr-2"></i> Booking Tiket
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-200 hover:text-white transition-colors flex items-center">
                  <i className="fas fa-chevron-right text-xs mr-2"></i> Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-blue-200 hover:text-white transition-colors flex items-center">
                  <i className="fas fa-chevron-right text-xs mr-2"></i> Booking
                </Link>
              </li>
            </ul>
          </div>
          <div className="sm:col-span-2 md:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-sm sm:text-base text-blue-200">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-2"></i>
                <span>Jl. Ciberes No. 123, Bandung</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone mr-2"></i>
                <span>+62 123 4567 890</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2"></i>
                <span>info@gardenciberes.com</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-clock mr-2"></i>
                <span>Buka: 08:00 - 17:00 (Setiap Hari)</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-blue-300 text-sm">
          <p>&copy; {currentYear} Garden Ciberes. Seluruh hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
