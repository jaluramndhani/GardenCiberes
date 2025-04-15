import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

const packages = [
  {
    id: "weekend-premium",
    title: "Weekend Premium",
    subtitle: "Luxury Pool Experience",
    image:
      "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    time: "06:00 - 09:00",
    maxPersons: 50,
    price: 25000,
    features: ["Access to Premium Pool Area", "Luxury Loungers & Cabanas", "Towel Service"],
  },
  {
    id: "weekday-deluxe",
    title: "Weekday Deluxe",
    subtitle: "Exclusive Pool Access",
    image:
      "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    time: "08:00 - 11:00",
    maxPersons: 30,
    price: 15000,
    features: ["Access to Deluxe Pool Area", "Premium Loungers", "Basic Amenities"],
  },
  {
    id: "family-package",
    title: "Family Package",
    subtitle: "Perfect for Families",
    image:
      "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    time: "09:00 - 12:00",
    maxPersons: 40,
    price: 20000,
    features: ["Access to Family Pool Area", "Kids Pool Access", "Family Amenities"],
  },
]

export default function Packages() {
  return (
    <div>
      <Header variant="booking" />

      <main className="container mx-auto mt-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">Luxury Pool Experience</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Immerse yourself in the ultimate relaxation with our world-class swimming pools
          </p>
        </div>

        {/* Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
                  <h3 className="text-white text-2xl font-bold">{pkg.title}</h3>
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
                      <i className="fas fa-user-friends mr-2"></i>Max {pkg.maxPersons} persons
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-600">Rp {pkg.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">per person</p>
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
                <Link href={`/booking?visitors=${pkg.maxPersons}`} className="block mt-6">
                  <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Reserve Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <i className="fas fa-child text-3xl text-blue-600"></i>
              <div>
                <h3 className="text-lg font-semibold mb-2">Children Policy</h3>
                <p className="text-gray-600">
                  Children under 90cm height can enter for free when accompanied by paying adults
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <i className="fas fa-clock text-3xl text-blue-600"></i>
              <div>
                <h3 className="text-lg font-semibold mb-2">Operating Hours</h3>
                <p className="text-gray-600">Open daily from 06:00 AM to 09:00 PM. Last entry 1 hour before closing</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <i className="fas fa-umbrella-beach text-3xl text-blue-600"></i>
              <div>
                <h3 className="text-lg font-semibold mb-2">Amenities</h3>
                <p className="text-gray-600">Loungers, towels, and lockers available for all guests</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer variant="simple" />
    </div>
  )
}
