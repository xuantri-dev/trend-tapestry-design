
// Mock data for the e-commerce application

export interface MockUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export interface MockProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  original_price?: number;
  description: string;
  images: string[];
  category_id: string;
  brand?: string;
  sku?: string;
  stock_quantity: number;
  sizes?: string[];
  colors?: string[];
  is_active: boolean;
  is_featured: boolean;
  categories?: {
    name: string;
  };
}

export interface MockCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
}

export interface MockCartItem {
  id: string;
  product_id: string;
  quantity: number;
  size?: string;
  color?: string;
  user_id: string;
}

export interface MockOrder {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  created_at: string;
  order_items: {
    id: string;
    quantity: number;
    unit_price: number;
    size?: string;
    color?: string;
    products: {
      name: string;
      images: string[];
    };
  }[];
}

// Mock user (simulating logged-in user)
export const mockUser: MockUser = {
  id: 'user-1',
  email: 'john.doe@example.com',
  first_name: 'John',
  last_name: 'Doe',
  phone: '+1 (555) 123-4567'
};

// Mock categories
export const mockCategories: MockCategory[] = [
  { id: 'cat-1', name: 'Clothing', slug: 'clothing', description: 'Stylish apparel' },
  { id: 'cat-2', name: 'Accessories', slug: 'accessories', description: 'Fashion accessories' },
  { id: 'cat-3', name: 'Shoes', slug: 'shoes', description: 'Footwear collection' },
  { id: 'cat-4', name: 'Electronics', slug: 'electronics', description: 'Tech gadgets' }
];

// Mock products
export const mockProducts: MockProduct[] = [
  {
    id: 'prod-1',
    name: 'Premium Cotton T-Shirt',
    slug: 'premium-cotton-t-shirt',
    price: 29.99,
    original_price: 39.99,
    description: 'Soft, comfortable cotton t-shirt made from premium materials. Perfect for everyday wear.',
    images: ['/placeholder.svg', '/placeholder.svg'],
    category_id: 'cat-1',
    brand: 'LUXE',
    sku: 'TSH-001',
    stock_quantity: 50,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Black', 'Navy', 'Gray'],
    is_active: true,
    is_featured: true,
    categories: { name: 'Clothing' }
  },
  {
    id: 'prod-2',
    name: 'Designer Leather Jacket',
    slug: 'designer-leather-jacket',
    price: 299.99,
    original_price: 399.99,
    description: 'Genuine leather jacket with premium craftsmanship. A timeless piece for your wardrobe.',
    images: ['/placeholder.svg', '/placeholder.svg'],
    category_id: 'cat-1',
    brand: 'LUXE',
    sku: 'JKT-001',
    stock_quantity: 15,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Brown'],
    is_active: true,
    is_featured: true,
    categories: { name: 'Clothing' }
  },
  {
    id: 'prod-3',
    name: 'Wireless Headphones',
    slug: 'wireless-headphones',
    price: 199.99,
    description: 'High-quality wireless headphones with noise cancellation and premium sound.',
    images: ['/placeholder.svg', '/placeholder.svg'],
    category_id: 'cat-4',
    brand: 'LUXE',
    sku: 'HP-001',
    stock_quantity: 25,
    colors: ['Black', 'White', 'Silver'],
    is_active: true,
    is_featured: true,
    categories: { name: 'Electronics' }
  },
  {
    id: 'prod-4',
    name: 'Classic Sneakers',
    slug: 'classic-sneakers',
    price: 89.99,
    original_price: 119.99,
    description: 'Comfortable and stylish sneakers perfect for casual wear.',
    images: ['/placeholder.svg', '/placeholder.svg'],
    category_id: 'cat-3',
    brand: 'LUXE',
    sku: 'SNK-001',
    stock_quantity: 40,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Red'],
    is_active: true,
    is_featured: false,
    categories: { name: 'Shoes' }
  },
  {
    id: 'prod-5',
    name: 'Leather Wallet',
    slug: 'leather-wallet',
    price: 49.99,
    description: 'Premium leather wallet with multiple card slots and cash compartments.',
    images: ['/placeholder.svg', '/placeholder.svg'],
    category_id: 'cat-2',
    brand: 'LUXE',
    sku: 'WLT-001',
    stock_quantity: 30,
    colors: ['Black', 'Brown', 'Tan'],
    is_active: true,
    is_featured: false,
    categories: { name: 'Accessories' }
  }
];

// Mock cart items
export let mockCartItems: MockCartItem[] = [
  {
    id: 'cart-1',
    product_id: 'prod-1',
    quantity: 2,
    size: 'M',
    color: 'Black',
    user_id: 'user-1'
  },
  {
    id: 'cart-2',
    product_id: 'prod-3',
    quantity: 1,
    color: 'Black',
    user_id: 'user-1'
  }
];

// Mock orders
export const mockOrders: MockOrder[] = [
  {
    id: 'order-1',
    order_number: 'ORD-20231201-0001',
    status: 'delivered',
    total_amount: 159.97,
    created_at: '2023-12-01T10:00:00Z',
    order_items: [
      {
        id: 'item-1',
        quantity: 2,
        unit_price: 29.99,
        size: 'M',
        color: 'Black',
        products: {
          name: 'Premium Cotton T-Shirt',
          images: ['/placeholder.svg']
        }
      },
      {
        id: 'item-2',
        quantity: 1,
        unit_price: 99.99,
        products: {
          name: 'Designer Jeans',
          images: ['/placeholder.svg']
        }
      }
    ]
  },
  {
    id: 'order-2',
    order_number: 'ORD-20231115-0002',
    status: 'shipped',
    total_amount: 299.99,
    created_at: '2023-11-15T14:30:00Z',
    order_items: [
      {
        id: 'item-3',
        quantity: 1,
        unit_price: 299.99,
        size: 'L',
        color: 'Black',
        products: {
          name: 'Designer Leather Jacket',
          images: ['/placeholder.svg']
        }
      }
    ]
  }
];

// Helper functions for cart operations
export const addToCart = (productId: string, quantity: number = 1, size?: string, color?: string) => {
  const existingItem = mockCartItems.find(
    item => item.product_id === productId && item.size === size && item.color === color
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    mockCartItems.push({
      id: `cart-${Date.now()}`,
      product_id: productId,
      quantity,
      size,
      color,
      user_id: mockUser.id
    });
  }
};

export const updateCartQuantity = (cartItemId: string, quantity: number) => {
  const item = mockCartItems.find(item => item.id === cartItemId);
  if (item && quantity > 0) {
    item.quantity = quantity;
  }
};

export const removeFromCart = (cartItemId: string) => {
  mockCartItems = mockCartItems.filter(item => item.id !== cartItemId);
};

export const clearCart = () => {
  mockCartItems = [];
};

export const getCartItemsWithProducts = () => {
  return mockCartItems.map(cartItem => {
    const product = mockProducts.find(p => p.id === cartItem.product_id);
    return {
      ...cartItem,
      products: product ? {
        id: product.id,
        name: product.name,
        price: product.price,
        images: product.images,
        stock_quantity: product.stock_quantity
      } : null
    };
  }).filter(item => item.products !== null);
};
