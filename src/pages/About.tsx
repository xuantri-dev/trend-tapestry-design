
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Award, Users, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About LUXE</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Redefining fashion with timeless elegance and contemporary sophistication. 
              We believe that luxury should be accessible, sustainable, and meaningful.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Founded in 2020, LUXE emerged from a simple belief: that exceptional quality 
                and timeless design should be the foundation of every wardrobe. Our journey 
                began with a small team of passionate designers and craftspeople who shared 
                a vision of creating clothing that transcends trends.
              </p>
              <p>
                What started as a boutique collection has grown into a globally recognized 
                brand, but our core values remain unchanged. We're committed to ethical 
                manufacturing, sustainable practices, and creating pieces that our customers 
                will treasure for years to come.
              </p>
              <p>
                Today, LUXE continues to push boundaries in fashion while staying true to 
                our heritage of craftsmanship and attention to detail. Every piece tells 
                a story of dedication, quality, and the pursuit of perfection.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8" 
              alt="LUXE Store" 
              className="rounded-lg shadow-lg w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Passion</h3>
                <p className="text-gray-600">
                  Every piece is crafted with love and dedication to excellence, 
                  ensuring the highest quality in every detail.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Quality</h3>
                <p className="text-gray-600">
                  We use only the finest materials and employ skilled artisans 
                  to create clothing that stands the test of time.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Community</h3>
                <p className="text-gray-600">
                  We believe in building lasting relationships with our customers, 
                  partners, and the communities we serve.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Globe className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                <p className="text-gray-600">
                  Environmental responsibility is at the core of our operations, 
                  from sourcing to production to packaging.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Journey</h2>
          <div className="space-y-8">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold">2020</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">The Beginning</h3>
                <p className="text-gray-600">
                  LUXE was founded with a mission to create timeless, high-quality fashion 
                  that combines elegance with sustainability.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold">2021</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">First Collection</h3>
                <p className="text-gray-600">
                  Launched our debut collection, featuring 50 carefully curated pieces 
                  that established our signature aesthetic.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-bold">2022</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Global Expansion</h3>
                <p className="text-gray-600">
                  Expanded internationally, bringing LUXE to customers in over 15 countries 
                  while maintaining our commitment to quality.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 font-bold">2023</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Sustainability Initiative</h3>
                <p className="text-gray-600">
                  Launched our comprehensive sustainability program, achieving carbon-neutral 
                  shipping and implementing circular fashion practices.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-600 font-bold">2024</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Innovation & Growth</h3>
                <p className="text-gray-600">
                  Continuing to innovate with new materials, technologies, and designs 
                  while staying true to our core values and mission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
