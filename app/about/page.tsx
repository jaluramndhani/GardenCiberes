import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Gallery images data
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    alt: "Luxury swimming pool with lounge chairs",
    category: "pools",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    alt: "Infinity pool with ocean view",
    category: "pools",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    alt: "Family pool area",
    category: "pools",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1540539234-c14a20fb7c7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    alt: "Poolside cabanas",
    category: "amenities",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1621275471769-e6aa344546d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    alt: "Luxury pool loungers",
    category: "amenities",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    alt: "Poolside dining area",
    category: "dining",
  },
]

export default function About() {
  return (
    <div className="min-h-screen pool-pattern">
      <Header />

      <main className="pt-32 pb-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="cormorant text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 mb-4">Tentang Kami</h1>
            <p className="text-lg md:text-xl text-blue-800 max-w-3xl mx-auto">
              Selamat datang di Garden Ciberes, tempat liburan seru dan segar untuk Anda dan keluarga.
            </p>
          </div>

          {/* About Us Section */}
          <div className="glass-effect rounded-xl p-8 mb-16 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">Garden Ciberes</h2>
                <p className="text-blue-800 mb-4">
                  Garden Ciberes adalah destinasi kolam renang premium yang menawarkan pengalaman berenang terbaik di
                  kota. Dengan fasilitas modern dan pelayanan yang ramah, kami berkomitmen untuk memberikan pengalaman
                  liburan yang menyegarkan dan menyenangkan bagi seluruh keluarga.
                </p>
                <p className="text-blue-800">
                  Didirikan pada tahun 2015, Garden Ciberes telah menjadi tujuan favorit bagi mereka yang mencari tempat
                  bersantai dan bersenang-senang di kolam renang berkualitas tinggi dengan harga terjangkau.
                </p>
              </div>
              <div className="relative h-64 md:h-80">
                <Image
                  src="/images/garden-ciberes-entrance.png"
                  alt="Garden Ciberes"
                  fill
                  unoptimized
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-blue-900 mb-2">Galeri Kami</h2>
              <p className="text-blue-800">Lihat keindahan dan fasilitas Garden Ciberes melalui galeri foto kami</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="glass-effect rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="relative h-48 sm:h-56 md:h-64">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-blue-900 font-medium">{image.alt}</p>
                    <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                      {image.category.charAt(0).toUpperCase() + image.category.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-blue-900 mb-2">Hubungi Kami</h2>
              <p className="text-blue-800">Ada pertanyaan atau ingin informasi lebih lanjut? Hubungi kami sekarang</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="glass-effect p-6 rounded-xl">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Informasi Kontak</h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                      <i className="fas fa-map-marker-alt text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold">Lokasi</h4>
                      <p className="text-blue-800">Jl. Ciberes No. 123, Bandung, Indonesia</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                      <i className="fas fa-phone-alt text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold">Telepon</h4>
                      <p className="text-blue-800">+62 123 456 789</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                      <i className="fas fa-envelope text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-blue-800">info@gardenciberes.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                      <i className="fas fa-clock text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold">Jam Operasional</h4>
                      <p className="text-blue-800">Senin - Minggu: 08:00 - 17:00</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Ikuti Kami</h4>
                  <div className="flex space-x-3">
                    <a
                      href="#"
                      className="bg-blue-100 p-2 rounded-full text-blue-600 hover:bg-blue-200 transition-colors"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                      href="#"
                      className="bg-blue-100 p-2 rounded-full text-blue-600 hover:bg-blue-200 transition-colors"
                    >
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a
                      href="#"
                      className="bg-blue-100 p-2 rounded-full text-blue-600 hover:bg-blue-200 transition-colors"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="glass-effect p-6 rounded-xl">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Kirim Pesan</h3>

                <form className="space-y-4">
                  <div>
                    <label className="block text-blue-900 font-medium mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>

                  <div>
                    <label className="block text-blue-900 font-medium mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full p-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Masukkan email"
                    />
                  </div>

                  <div>
                    <label className="block text-blue-900 font-medium mb-1">Pesan</label>
                    <textarea
                      rows={4}
                      className="w-full p-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tulis pesan Anda di sini"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Kirim Pesan
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="glass-effect p-4 rounded-xl">
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">
                  <i className="fas fa-map-marked-alt text-4xl mb-4 block"></i>
                  Peta lokasi akan ditampilkan di sini
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
