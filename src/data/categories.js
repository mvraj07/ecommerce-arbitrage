// Categories matching khedutmahiti.com nav structure
export const categories = [
  // Women's Categories — matching the nav links exactly
  {
    slug: 'saree',
    title: 'Saree',
    category: 'women',
    description: 'Traditional and modern sarees with elegant designs',
    heroImage: 'https://khedutmahiti.com/cdn/shop/collections/Sarees.png?v=1704437489&width=1500'
  },
  {
    slug: 'salwar-suit',
    title: 'Salwar Suit',
    category: 'women',
    description: 'Shop flowing salwar suits with embroidery, prints and modern silhouettes.',
    heroImage: 'https://khedutmahiti.com/cdn/shop/collections/Salwar-Suit.png?v=1704437473&width=1500'
  },
  {
    slug: 'lehenga-choli',
    title: 'Lehenga Choli',
    category: 'women',
    description: 'Elegant lehengas crafted for celebrations, weddings, and festive nights.',
    heroImage: 'https://khedutmahiti.com/cdn/shop/collections/Lehenga-Choli.png?v=1704437455&width=1500'
  },
  {
    slug: 'western-wear',
    title: 'Western Wear',
    category: 'women',
    description: 'Modern western wear featuring dresses, jumpsuits, and evening separates.',
    heroImage: 'https://khedutmahiti.com/cdn/shop/collections/Kurti.png?v=1720152640&width=1500'
  },
  {
    slug: 'kurta',
    title: 'Kurta',
    category: 'women',
    description: 'Comfortable and stylish kurtas for everyday wear',
    heroImage: 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    slug: 'ethnic-dress',
    title: 'Ethnic Dress',
    category: 'women',
    description: 'Traditional ethnic wear and fusion designs',
    heroImage: 'https://images.pexels.com/photos/1388622/pexels-photo-1388622.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    slug: 'top-selling',
    title: 'Top Selling',
    category: 'all',
    description: 'Our most popular products across all categories',
    heroImage: 'https://images.pexels.com/photos/15359601/pexels-photo-15359601.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },

  // Men's Categories
  {
    slug: 'jackets',
    title: 'Jackets',
    category: 'men',
    description: 'Stylish jackets for all seasons and occasions',
    heroImage: 'https://images.pexels.com/photos/2769274/pexels-photo-2769274.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    slug: 'shirts',
    title: 'Shirts',
    category: 'men',
    description: 'Premium quality casual and formal shirts',
    heroImage: 'https://images.pexels.com/photos/999474/pexels-photo-999474.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    slug: 'tshirts',
    title: 'T-Shirts',
    category: 'men',
    description: 'Comfortable and trendy t-shirts for everyday wear',
    heroImage: 'https://images.pexels.com/photos/3621607/pexels-photo-3621607.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    slug: 'pants',
    title: 'Pants',
    category: 'men',
    description: 'Versatile pants for work and casual occasions',
    heroImage: 'https://images.pexels.com/photos/2050994/pexels-photo-2050994.jpeg?auto=compress&cs=tinysrgb&w=1200'
  }
];

// Parent categories for hierarchical display on home page
export const parentCategories = [
  {
    id: 'women',
    title: 'Women',
    description: 'Explore our collection of women\'s ethnic and casual wear',
    icon: '👗',
    subcategories: categories.filter(c => c.category === 'women')
  },
  {
    id: 'men',
    title: 'Men',
    description: 'Discover stylish men\'s fashion and accessories',
    icon: '👔',
    subcategories: categories.filter(c => c.category === 'men')
  }
];
