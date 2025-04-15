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
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    alt: "Swim-up bar",
    category: "dining",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1551524559-8af4e6624178?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    alt: "Kids pool area",
    category: "pools",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    alt: "Poolside massage area",
    category: "amenities",
  },
]

export default function Gallery() {
  return (
    <div className="min-h-screen pool-pattern">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="cormorant text-5xl md:text-6xl font-bold text-blue-900 mb-4">Our Gallery</h1>
          <p className="text-xl text-blue-800 max-w-3xl mx-auto">
            Explore our luxurious facilities and get a glimpse of the premium experience that awaits you at Garden
            Ciberes.
          </p>
        </div>

        {/* Gallery Filter Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
            All
          </button>
          <button className="px-6 py-2 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
            Pools
          </button>
          <button className="px-6 py-2 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
            Amenities
          </button>
          <button className="px-6 py-2 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors">
            Dining
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="glass-effect rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="relative h-64">
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

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="cormorant text-3xl font-bold text-blue-900 mb-4">Ready to Experience Luxury?</h2>
          <p className="text-lg text-blue-800 mb-8">
            Book your visit to Garden Ciberes today and indulge in premium pool experiences.
          </p>
          <a
            href="/packages"
            className="glass-effect text-blue-900 text-xl font-semibold py-4 px-10 rounded-full hover:bg-blue-900 hover:text-white transition-all duration-300 luxury-shadow inline-block"
          >
            Reserve Now
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}
