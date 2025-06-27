
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Newsletter = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h3 className="text-4xl font-bold text-white">Stay in Style</h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and style inspiration.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 transition-colors duration-200"
              />
              <Button 
                className="bg-white text-black hover:bg-gray-100 px-8 font-medium transition-all duration-200 hover:scale-105"
              >
                Subscribe
              </Button>
            </div>
          </div>

          <p className="text-sm text-gray-400">
            Join over 50,000 fashion enthusiasts. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
