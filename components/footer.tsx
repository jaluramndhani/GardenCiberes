export default function Footer({ variant = "default" }: { variant?: "default" | "simple" }) {
  if (variant === "simple") {
    return (
      <footer className="water-ripple text-white text-center py-6 mt-16">
        <p>&copy; 2023 Garden Ciberes. All rights reserved.</p>
      </footer>
    )
  }

  return (
    <footer className="water-ripple text-white text-center py-8 mt-16 relative z-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="cormorant text-2xl font-bold mb-4">Contact</h4>
            <p>info@gardenciberes.com</p>
            <p>+62 123 456 789</p>
          </div>
          <div>
            <h4 className="cormorant text-2xl font-bold mb-4">Hours</h4>
            <p>Monday - Sunday</p>
            <p>6:00 AM - 9:00 PM</p>
          </div>
          <div>
            <h4 className="cormorant text-2xl font-bold mb-4">Follow Us</h4>
            <div className="flex justify-center space-x-4">
              <a href="#" className="hover:text-blue-200 transition-colors">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a href="#" className="hover:text-blue-200 transition-colors">
                <i className="fab fa-facebook text-2xl"></i>
              </a>
              <a href="#" className="hover:text-blue-200 transition-colors">
                <i className="fab fa-twitter text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-400 pt-8">
          <p>&copy; 2023 Garden Ciberes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
