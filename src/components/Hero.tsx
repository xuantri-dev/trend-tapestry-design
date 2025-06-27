
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                Discover Your
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"> Style</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Elevate your wardrobe with our curated collection of premium fashion pieces that blend timeless elegance with contemporary trends.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg font-medium transition-all duration-200 hover:scale-105"
              >
                Shop Collection
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg font-medium transition-all duration-200"
              >
                View Lookbook
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-scale-in">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80"
                alt="Fashion model"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-pink-100 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-100 rounded-full opacity-40 animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
