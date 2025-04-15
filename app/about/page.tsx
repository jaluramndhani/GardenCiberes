import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function About() {
  return (
    <div className="min-h-screen pool-pattern">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="cormorant text-5xl md:text-6xl font-bold text-blue-900 mb-4">About Garden Ciberes</h1>
          <p className="text-xl text-blue-800 max-w-3xl mx-auto">
            Discover the story behind Bandung's premier luxury pool destination.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="cormorant text-4xl font-bold text-blue-900 mb-6">Our Story</h2>
            <p className="text-blue-800 mb-4">
              Garden Ciberes was founded in 2015 with a vision to create an oasis of tranquility and luxury in the heart
              of Bandung. What started as a small family-owned pool has grown into the premier destination for those
              seeking a premium aquatic experience.
            </p>
            <p className="text-blue-800 mb-4">
              Our founder, Mr. Budi Santoso, combined his passion for hospitality with his love for aquatic recreation
              to create a space where guests could escape the hustle and bustle of city life and immerse themselves in
              pure relaxation.
            </p>
            <p className="text-blue-800">
              Today, Garden Ciberes stands as a testament to our commitment to excellence, offering world-class
              facilities and unparalleled service to our valued guests.
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-3xl transform rotate-3 opacity-20"></div>
            <div className="relative z-10">
              <Image
                src="https://images.unsplash.com/photo-1572331165267-854da2b10ccc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                alt="Garden Ciberes Pool"
                width={600}
                height={400}
                unoptimized
                className="rounded-3xl luxury-shadow w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="glass-effect p-8 rounded-2xl luxury-shadow text-center mb-20">
          <h2 className="cormorant text-4xl font-bold text-blue-900 mb-6">Our Mission</h2>
          <p className="text-xl text-blue-800 max-w-3xl mx-auto">
            "To provide an exceptional aquatic experience that rejuvenates the body, refreshes the mind, and restores
            the spirit through impeccable service, pristine facilities, and a commitment to luxury and excellence."
          </p>
        </div>

        {/* Our Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="glass-effect p-8 rounded-2xl text-center luxury-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-blue-600 text-2xl mx-auto mb-4">
              <i className="fas fa-gem"></i>
            </div>
            <h3 className="cormorant text-2xl font-bold text-blue-900 mb-3">Excellence</h3>
            <p className="text-blue-800">
              We strive for excellence in every aspect of our service, from the cleanliness of our pools to the
              attentiveness of our staff.
            </p>
          </div>
          <div className="glass-effect p-8 rounded-2xl text-center luxury-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-blue-600 text-2xl mx-auto mb-4">
              <i className="fas fa-heart"></i>
            </div>
            <h3 className="cormorant text-2xl font-bold text-blue-900 mb-3">Hospitality</h3>
            <p className="text-blue-800">
              We believe in treating every guest like family, providing warm, personalized service that makes everyone
              feel welcome.
            </p>
          </div>
          <div className="glass-effect p-8 rounded-2xl text-center luxury-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-blue-600 text-2xl mx-auto mb-4">
              <i className="fas fa-leaf"></i>
            </div>
            <h3 className="cormorant text-2xl font-bold text-blue-900 mb-3">Sustainability</h3>
            <p className="text-blue-800">
              We are committed to environmentally responsible practices, using eco-friendly cleaning products and
              energy-efficient systems.
            </p>
          </div>
        </div>

        {/* Our Team Section */}
        <div className="mb-20">
          <h2 className="cormorant text-4xl font-bold text-blue-900 mb-6 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-effect rounded-xl overflow-hidden text-center">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                  alt="Budi Santoso - Founder & CEO"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="cormorant text-xl font-bold text-blue-900">Budi Santoso</h3>
                <p className="text-blue-600">Founder & CEO</p>
              </div>
            </div>
            <div className="glass-effect rounded-xl overflow-hidden text-center">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                  alt="Maya Wijaya - Operations Manager"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="cormorant text-xl font-bold text-blue-900">Maya Wijaya</h3>
                <p className="text-blue-600">Operations Manager</p>
              </div>
            </div>
            <div className="glass-effect rounded-xl overflow-hidden text-center">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                  alt="Adi Nugroho - Head of Maintenance"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="cormorant text-xl font-bold text-blue-900">Adi Nugroho</h3>
                <p className="text-blue-600">Head of Maintenance</p>
              </div>
            </div>
            <div className="glass-effect rounded-xl overflow-hidden text-center">
              <div className="relative h-64">
                <Image
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=461&q=80"
                  alt="Siti Rahayu - Guest Relations"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="cormorant text-xl font-bold text-blue-900">Siti Rahayu</h3>
                <p className="text-blue-600">Guest Relations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="cormorant text-3xl font-bold text-blue-900 mb-4">Experience Garden Ciberes</h2>
          <p className="text-lg text-blue-800 mb-8">
            Join us for a day of luxury and relaxation at Bandung's premier pool destination.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/packages"
              className="glass-effect text-blue-900 text-xl font-semibold py-4 px-10 rounded-full hover:bg-blue-900 hover:text-white transition-all duration-300 luxury-shadow"
            >
              View Packages
            </Link>
            <Link
              href="/contact"
              className="text-blue-900 text-xl font-semibold py-4 px-10 rounded-full hover:bg-blue-100 transition-all duration-300 flex items-center justify-center"
            >
              <i className="fas fa-envelope mr-2"></i> Contact Us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
