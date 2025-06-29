
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart } from 'lucide-react';
import { getSaleProducts, addToCart, addToWishlist } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

const Sale = () => {
  const [saleProducts] = useState(getSaleProducts());
  const { toast } = useToast();

  const handleAddToCart = (productId: string, productName: string) => {
    addToCart(productId, 1);
    toast({
      title: "Added to cart",
      description: `${productName} has been added to your cart.`
    });
  };

  const handleAddToWishlist = (productId: string, productName: string) => {
    addToWishlist(productId);
    toast({
      title: "Added to wishlist",
      description: `${productName} has been added to your wishlist.`
    });
  };

  const calculateDiscount = (originalPrice: number, salePrice: number) => {
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl text-white p-8 mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">🔥 WINTER SALE 🔥</h1>
            <p className="text-xl mb-2">Up to 50% off on selected items</p>
            <p className="text-lg opacity-90">Limited time offer - Shop now before it's gone!</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sale Items</h2>
          <p className="text-gray-600">
            {saleProducts.length} {saleProducts.length === 1 ? 'item' : 'items'} on sale
          </p>
        </div>

        {saleProducts.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">🛍️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No items on sale right now</h3>
              <p className="text-gray-600 mb-6">Check back soon for amazing deals!</p>
              <Link to="/shop">
                <Button>Browse All Products</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {saleProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-200">
                <div className="relative">
                  <Link to={`/product/${product.slug}`}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                  </Link>
                  <div className="absolute top-2 left-2 space-y-1">
                    <Badge className="bg-red-500">
                      -{calculateDiscount(product.original_price!, product.price)}% OFF
                    </Badge>
                    <Badge variant="outline" className="bg-white">
                      SALE
                    </Badge>
                  </div>
                  <button
                    onClick={() => handleAddToWishlist(product.id, product.name)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  >
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                <CardContent className="p-4">
                  <Link to={`/product/${product.slug}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 hover:text-gray-700 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl font-bold text-red-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.original_price!.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="text-sm text-green-600 font-medium mb-4">
                    You save ${(product.original_price! - product.price).toFixed(2)}
                  </div>

                  {product.brand && (
                    <p className="text-sm text-gray-600 mb-4">{product.brand}</p>
                  )}

                  <div className="space-y-2">
                    <Button
                      onClick={() => handleAddToCart(product.id, product.name)}
                      className="w-full bg-red-600 hover:bg-red-700"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Link to={`/product/${product.slug}`}>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Don't Miss Out!</h3>
              <p className="text-lg mb-6">Sale ends soon. Get your favorites before they're gone!</p>
              <div className="space-x-4">
                <Link to="/shop">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                    Shop All Products
                  </Button>
                </Link>
                <Link to="/wishlist">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                    View Wishlist
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Sale;
