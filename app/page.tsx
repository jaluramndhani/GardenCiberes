import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header variant="transparent" />

      {/* Hero Section - Improved responsiveness */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src="/images/garden-ciberes-entrance.png"
            alt="Garden Ciberes Entrance"
            fill
            unoptimized
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6 sm:px-8">
            <div className="max-w-2xl animate-fade-in-up mx-auto sm:mx-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Liburan Seru & Segar di Garden Ciberes, Yuk!
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 leading-relaxed">
                Nikmati momen liburan bersama keluarga dan teman di kolam renang premium dengan suasana yang menyegarkan
                dan menyenangkan.
              </p>
              <div className="flex justify-center sm:justify-start">
                <Link
                  href="/booking"
                  className="bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 inline-block text-center shadow-lg"
                >
                  Booking Tiket
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-8 h-12 rounded-full border-2 border-white flex items-start justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section - Improved spacing and responsiveness */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 relative inline-block">
              Mengapa Memilih Kami?
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-1 bg-blue-600 rounded-full"></span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mt-6">
              Kami menawarkan pengalaman berenang terbaik untuk Anda dan keluarga
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-6xl mx-auto">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="bg-blue-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <i className="fas fa-swimming-pool text-xl sm:text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Kolam Premium</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Kolam renang berkualitas dengan air yang bersih dan segar untuk kenyamanan berenang Anda.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="bg-blue-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <i className="fas fa-umbrella-beach text-xl sm:text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Fasilitas Lengkap</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Berbagai fasilitas pendukung untuk memastikan kenyamanan selama kunjungan Anda.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 sm:col-span-2 md:col-span-1 sm:max-w-md mx-auto md:max-w-none">
              <div className="bg-blue-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <i className="fas fa-user-shield text-xl sm:text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Keamanan Terjamin</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Sistem keamanan dan pengawasan untuk menjamin keselamatan pengunjung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Price List Section - Improved spacing and responsiveness, removed button */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 relative inline-block">
              Price List
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-1 bg-blue-600 rounded-full"></span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mt-6">
              Harga terjangkau untuk pengalaman berenang terbaik
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
              <div className="relative h-48 sm:h-56 md:h-64">
                <Image
                  src="/images/merlion-fountain.png"
                  alt="Premium Akhir Pekan - Patung Merlion"
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Weekend</span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white text-xl font-bold">Weekend</h3>
                </div>
              </div>
              <div className="p-6 text-center">
                <div className="mb-4">
                  <p className="text-gray-600 flex items-center justify-center">
                    <i className="far fa-clock mr-2 text-blue-600"></i>08:00 - 17:00
                  </p>
                </div>
                <p className="font-bold text-blue-600 text-2xl mb-4">
                  Rp 25.000 <span className="text-sm font-normal">/orang</span>
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
              <div className="relative h-48 sm:h-56 md:h-64">
                <Image
                  src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8A%3D%3D&auto=format&fit=crop&w=870&q=80"
                  alt="Deluxe Hari Kerja"
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">Weekday</span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white text-xl font-bold">Weekday</h3>
                </div>
              </div>
              <div className="p-6 text-center">
                <div className="mb-4">
                  <p className="text-gray-600 flex items-center justify-center">
                    <i className="far fa-clock mr-2 text-blue-600"></i>08:00 - 17:00
                  </p>
                </div>
                <p className="font-bold text-blue-600 text-2xl mb-4">
                  Rp 15.000 <span className="text-sm font-normal">/orang</span>
                </p>
              </div>
            </div>
          </div>

          {/* Removed the "Booking Sekarang" button as requested */}
        </div>
      </section>

      {/* CTA Section - Enhanced Design and improved responsiveness */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 sm:p-8 md:p-12 text-center text-white shadow-xl transform transition-all duration-300 hover:shadow-2xl">
            {/* Decorative water-like elements */}
            <div className="absolute top-0 left-0 w-full h-16 bg-white/10 rounded-full transform -translate-y-1/2 scale-150"></div>
            <div className="absolute bottom-0 right-0 w-full h-16 bg-white/10 rounded-full transform translate-y-1/2 scale-150"></div>
            <div className="absolute top-1/4 right-1/4 w-16 sm:w-24 h-16 sm:h-24 bg-blue-400/20 rounded-full animate-pulse"></div>
            <div
              className="absolute bottom-1/4 left-1/4 w-20 sm:w-32 h-20 sm:h-32 bg-blue-400/20 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>

            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Siap untuk Berenang?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 max-w-3xl mx-auto">
                Pesan sekarang dan nikmati pengalaman berenang terbaik di kolam renang premium kami
              </p>
              <Link
                href="/booking"
                className="inline-block bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-md text-base sm:text-lg"
              >
                <i className="fas fa-ticket-alt mr-2"></i> Pesan Sekarang
              </Link>
            </div>

            {/* Swimming icon - responsive size */}
            <div className="absolute -bottom-6 -right-6 text-blue-400/30 text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
              <i className="fas fa-swimming-pool"></i>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
