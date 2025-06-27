
import { useState } from 'react';
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">LUXE</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium">New Arrivals</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium">Women</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium">Men</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium">Accessories</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium">Sale</a>
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <ShoppingBag className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium px-2">New Arrivals</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium px-2">Women</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium px-2">Men</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium px-2">Accessories</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium px-2">Sale</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
