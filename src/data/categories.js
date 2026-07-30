// Hierarchical category structure with parent and subcategories
// This helps organize products by gender and type for better navigation

export const categories = [
  // Women's Categories
  {
    slug: 'saree',
    title: 'Saree',
    category: 'women',
    description: 'Traditional and modern sarees with elegant designs',
    heroImage: 'https://images.pexels.com/photos/15359601/pexels-photo-15359601.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    slug: 'kurta',
    title: 'Kurta',
    category: 'women',
    description: 'Comfortable and stylish kurtas for everyday wear',
    heroImage: 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    slug: 'lehenga',
    title: 'Lehenga',
    category: 'women',
    description: 'Festive and party wear lehengas',
    heroImage: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    slug: 'ethnic-dress',
    title: 'Ethnic Dress',
    category: 'women',
    description: 'Traditional ethnic wear and fusion designs',
    heroImage: 'https://images.pexels.com/photos/1388622/pexels-photo-1388622.jpeg?auto=compress&cs=tinysrgb&w=1200'
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
