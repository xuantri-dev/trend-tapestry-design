
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Search, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import type { User as SupabaseUser } from '@supabase/supabase-js';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const { data: cartItemsCount } = useQuery({
    queryKey: ['cart-count', user?.id],
    queryFn: async () => {
      if (!user) return 0;
      
      const { data, error } = await supabase
        .from('cart_items')
        .select('quantity')
        .eq('user_id', user.id);
      
      if (error) return 0;
      return data.reduce((total, item) => total + item.quantity, 0);
    },
    enabled: !!user
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">LUXE</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/shop" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium">Shop</Link>
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
            
            {user ? (
              <div className="flex items-center space-x-2">
                <Link to="/cart">
                  <Button variant="ghost" size="icon" className="hover:bg-gray-100 relative">
                    <ShoppingBag className="h-5 w-5" />
                    {cartItemsCount && cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-gray-100"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
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
              <Link to="/shop" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium px-2">Shop</Link>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium px-2">Women</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium px-2">Men</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium px-2">Accessories</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium px-2">Sale</a>
              <div className="border-t pt-4 px-2">
                {user ? (
                  <div className="space-y-2">
                    <Link to="/cart" className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Cart {cartItemsCount && cartItemsCount > 0 && `(${cartItemsCount})`}
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link to="/auth" className="flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
