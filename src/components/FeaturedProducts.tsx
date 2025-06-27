
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Silk Midi Dress',
      price: 299,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&q=80',
      category: 'Dresses'
    },
    {
      id: 2,
      name: 'Cashmere Sweater',
      price: 189,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&q=80',
      category: 'Knitwear'
    },
    {
      id: 3,
      name: 'Tailored Blazer',
      price: 449,
      image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=400&q=80',
      category: 'Blazers'
    },
    {
      id: 4,
      name: 'Designer Handbag',
      price: 799,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80',
      category: 'Accessories'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Featured Collection</h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked pieces that define this season's must-have trends
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                
                <div className="p-6 space-y-3">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500 font-medium">{product.category}</p>
                    <h4 className="text-lg font-semibold text-gray-900">{product.name}</h4>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    <Button 
                      size="sm" 
                      className="bg-black text-white hover:bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg font-medium"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
