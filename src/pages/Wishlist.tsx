
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { getWishlistItemsWithProducts, removeFromWishlist, addToCart } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState(getWishlistItemsWithProducts());
  const { toast } = useToast();

  const handleRemoveFromWishlist = (wishlistItemId: string, productName: string) => {
    removeFromWishlist(wishlistItemId);
    setWishlistItems(getWishlistItemsWithProducts());
    toast({
      title: "Removed from wishlist",
      description: `${productName} has been removed from your wishlist.`
    });
  };

  const handleAddToCart = (productId: string, productName: string) => {
    addToCart(productId, 1);
    toast({
      title: "Added to cart",
      description: `${productName} has been added to your cart.`
    });
  };

  const handleMoveToCart = (wishlistItemId: string, productId: string, productName: string) => {
    addToCart(productId, 1);
    removeFromWishlist(wishlistItemId);
    setWishlistItems(getWishlistItemsWithProducts());
    toast({
      title: "Moved to cart",
      description: `${productName} has been moved to your cart.`
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-600 mb-6">Start adding items you love to your wishlist</p>
              <Link to="/shop">
                <Button>Browse Products</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow duration-200">
                <div className="relative">
                  <Link to={`/product/${item.products.slug}`}>
                    <img
                      src={item.products.images[0]}
                      alt={item.products.name}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                  </Link>
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id, item.products.name)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-gray-600" />
                  </button>
                  {item.products.original_price && item.products.original_price > item.products.price && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      Sale
                    </Badge>
                  )}
                </div>

                <CardContent className="p-4">
                  <Link to={`/product/${item.products.slug}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 hover:text-gray-700 transition-colors">
                      {item.products.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-lg font-bold text-gray-900">
                      ${item.products.price.toFixed(2)}
                    </span>
                    {item.products.original_price && item.products.original_price > item.products.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ${item.products.original_price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={() => handleMoveToCart(item.id, item.products.id, item.products.name)}
                      className="w-full"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Move to Cart
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleAddToCart(item.products.id, item.products.name)}
                      className="w-full"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {wishlistItems.length > 0 && (
          <div className="mt-12 text-center">
            <Link to="/shop">
              <Button variant="outline" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
