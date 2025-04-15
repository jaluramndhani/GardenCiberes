import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

const packages = [
  {
    id: "weekend-premium",
    title: "Akhir Pekan",
    subtitle: "Pengalaman Kolam Renang Mewah",
    image:
      "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    time: "06:00 - 09:00",
    maxPersons: 50,
    price: 25000,
    features: ["Akses ke Area Kolam Premium", "Kursi Santai & Gazebo Mewah", "Layanan Handuk"],
  },
  {
    id: "weekday-deluxe",
    title: "Deluxe Hari Kerja",
    subtitle: "Akses Kolam Eksklusif",
    image:
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    time: "08:00 - 11:00",
    maxPersons: 30,
    price: 15000,
    features: ["Akses ke Area Kolam Deluxe", "Kursi Santai Premium", "Fasilitas Dasar"],
  },
]

export default function Packages() {
  return (
    <div>
      <Header variant="booking" />

      <main className="container mx-auto mt-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Pengalaman Kolam Renang Mewah
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nikmati relaksasi terbaik dengan kolam renang kelas dunia kami
          </p>
        </div>

        {/* Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          {packages.map((pkg) => (
            <div key={pkg.id} className="luxury-card rounded-2xl overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={pkg.image || "/placeholder.svg"}
                  alt={pkg.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white text-2xl font-bold">Weekend</h3>
                  <p className="text-blue-200">{pkg.subtitle}</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-gray-600">
                    <p className="text-sm">
                      <i className="far fa-clock mr-2"></i>
                      {pkg.time}
                    </p>
                    <p className="text-sm">
                      <i className="fas fa-user-friends mr-2"></i>Maks {pkg.maxPersons} orang
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-600">Rp {pkg.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">per orang</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <i className="fas fa-check-circle text-green-500 mr-3"></i>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 mb-12">
          <Link
            href="/booking"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Pesan Sekarang
          </Link>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Informasi Tambahan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <i className="fas fa-child text-3xl text-blue-600"></i>
              <div>
                <h3 className="text-lg font-semibold mb-2">Kebijakan Anak-anak</h3>
                <p className="text-gray-600">
                  Anak-anak dengan tinggi di bawah 90cm dapat masuk gratis jika didampingi orang dewasa yang membayar
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <i className="fas fa-clock text-3xl text-blue-600"></i>
              <div>
                <h3 className="text-lg font-semibold mb-2">Jam Operasional</h3>
                <p className="text-gray-600">
                  Buka setiap hari dari jam 08:00 sampai 17:00. Masuk terakhir 1 jam sebelum tutup
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <i className="fas fa-umbrella-beach text-3xl text-blue-600"></i>
              <div>
                <h3 className="text-lg font-semibold mb-2">Fasilitas</h3>
                <p className="text-gray-600">Kursi santai, handuk, dan loker tersedia untuk semua tamu</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer variant="simple" />
    </div>
  )
}
