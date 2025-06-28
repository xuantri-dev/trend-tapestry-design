
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ShoppingBag, CreditCard, Truck } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

interface CartItem {
  id: string;
  quantity: number;
  size: string | null;
  color: string | null;
  products: {
    id: string;
    name: string;
    price: number;
    images: string[];
  };
}

interface Address {
  first_name: string;
  last_name: string;
  company: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

const Checkout = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [shippingAddress, setShippingAddress] = useState<Address>({
    first_name: '',
    last_name: '',
    company: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US'
  });

  const [billingAddress, setBillingAddress] = useState<Address>({
    first_name: '',
    last_name: '',
    company: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US'
  });

  const [useSameAddress, setUseSameAddress] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      setUser(user);
      
      // Load cart items
      const { data: items } = await supabase
        .from('cart_items')
        .select(`
          id,
          quantity,
          size,
          color,
          products (
            id,
            name,
            price,
            images
          )
        `)
        .eq('user_id', user.id);

      if (items) {
        setCartItems(items as CartItem[]);
      }

      // Load user profile for pre-filling
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profile) {
        setShippingAddress(prev => ({
          ...prev,
          first_name: profile.first_name || '',
          last_name: profile.last_name || ''
        }));
        setBillingAddress(prev => ({
          ...prev,
          first_name: profile.first_name || '',
          last_name: profile.last_name || ''
        }));
      }

      setLoading(false);
    };

    getUser();
  }, [navigate]);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.products.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async () => {
    if (!user) return;

    setProcessing(true);
    try {
      // Create shipping address
      const { data: shippingAddr } = await supabase
        .from('addresses')
        .insert({
          ...shippingAddress,
          user_id: user.id,
          type: 'shipping'
        })
        .select()
        .single();

      // Create billing address
      const billingAddrData = useSameAddress ? shippingAddress : billingAddress;
      const { data: billingAddr } = await supabase
        .from('addresses')
        .insert({
          ...billingAddrData,
          user_id: user.id,
          type: 'billing'
        })
        .select()
        .single();

      // Generate order number
      const { data: orderNumberResult } = await supabase.rpc('generate_order_number');
      
      // Create order
      const { data: order } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          order_number: orderNumberResult,
          subtotal,
          shipping_cost: shipping,
          tax_amount: tax,
          total_amount: total,
          shipping_address_id: shippingAddr?.id,
          billing_address_id: billingAddr?.id,
          status: 'confirmed'
        })
        .select()
        .single();

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: order?.id,
        product_id: item.products.id,
        quantity: item.quantity,
        unit_price: item.products.price,
        total_price: item.products.price * item.quantity,
        size: item.size,
        color: item.color
      }));

      await supabase.from('order_items').insert(orderItems);

      // Clear cart
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      toast({
        title: "Order placed successfully!",
        description: `Order ${orderNumberResult} has been confirmed.`
      });

      navigate('/profile?tab=orders');
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to your cart to continue</p>
          <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="shipping_first_name">First Name</Label>
                    <Input
                      id="shipping_first_name"
                      value={shippingAddress.first_name}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, first_name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="shipping_last_name">Last Name</Label>
                    <Input
                      id="shipping_last_name"
                      value={shippingAddress.last_name}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, last_name: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="shipping_company">Company (Optional)</Label>
                  <Input
                    id="shipping_company"
                    value={shippingAddress.company}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="shipping_address_1">Address Line 1</Label>
                  <Input
                    id="shipping_address_1"
                    value={shippingAddress.address_line_1}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, address_line_1: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="shipping_address_2">Address Line 2 (Optional)</Label>
                  <Input
                    id="shipping_address_2"
                    value={shippingAddress.address_line_2}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, address_line_2: e.target.value }))}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="shipping_city">City</Label>
                    <Input
                      id="shipping_city"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="shipping_state">State</Label>
                    <Input
                      id="shipping_state"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, state: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="shipping_postal_code">Postal Code</Label>
                    <Input
                      id="shipping_postal_code"
                      value={shippingAddress.postal_code}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, postal_code: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="shipping_country">Country</Label>
                    <Select
                      value={shippingAddress.country}
                      onValueChange={(value) => setShippingAddress(prev => ({ ...prev, country: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="US">United States</SelectItem>
                        <SelectItem value="CA">Canada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Billing Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={useSameAddress}
                      onChange={(e) => setUseSameAddress(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Same as shipping address</span>
                  </label>
                </div>

                {!useSameAddress && (
                  <div className="space-y-4">
                    {/* Same form fields as shipping but for billing */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="billing_first_name">First Name</Label>
                        <Input
                          id="billing_first_name"
                          value={billingAddress.first_name}
                          onChange={(e) => setBillingAddress(prev => ({ ...prev, first_name: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="billing_last_name">Last Name</Label>
                        <Input
                          id="billing_last_name"
                          value={billingAddress.last_name}
                          onChange={(e) => setBillingAddress(prev => ({ ...prev, last_name: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    {/* Add other billing address fields similar to shipping */}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.products.name}</h4>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                        {item.size && ` • Size: ${item.size}`}
                        {item.color && ` • Color: ${item.color}`}
                      </p>
                    </div>
                    <p className="font-medium">${(item.products.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  onClick={handlePlaceOrder}
                  disabled={processing}
                  className="w-full"
                  size="lg"
                >
                  {processing ? 'Processing...' : `Place Order • $${total.toFixed(2)}`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
