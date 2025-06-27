
import { Card, CardContent } from '@/components/ui/card';

const Categories = () => {
  const categories = [
    {
      name: 'Women\'s Fashion',
      description: 'Elegant pieces for the modern woman',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Men\'s Collection',
      description: 'Sophisticated styles for discerning gentlemen',
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Accessories',
      description: 'Perfect finishing touches',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your perfect style across our carefully curated collections
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={category.name}
              className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h4 className="text-2xl font-bold mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {category.name}
                    </h4>
                    <p className="text-gray-200 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                      {category.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
