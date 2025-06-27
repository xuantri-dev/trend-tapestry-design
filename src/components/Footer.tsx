
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h4 className="text-2xl font-bold text-white">LUXE</h4>
            <p className="text-gray-400">
              Redefining fashion with timeless elegance and contemporary sophistication.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-white">Shop</h5>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="hover:text-white transition-colors duration-200">New Arrivals</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Women</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Men</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Accessories</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Sale</a>
            </nav>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-white">Customer Care</h5>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="hover:text-white transition-colors duration-200">Contact Us</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Size Guide</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Shipping & Returns</a>
              <a href="#" className="hover:text-white transition-colors duration-200">FAQ</a>
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-white">Company</h5>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="hover:text-white transition-colors duration-200">About Us</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Careers</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Press</a>
              <a href="#" className="hover:text-white transition-colors duration-200">Sustainability</a>
            </nav>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2024 LUXE. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
