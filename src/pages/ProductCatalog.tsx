import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Grid, List, Star, Search } from 'lucide-react';

const ProductCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'tshirts', name: 'T-Shirts' },
    { id: 'mugs', name: 'Mugs' },
    { id: 'phone-cases', name: 'Phone Cases' }
  ];

  const products = [
    {
      id: '1',
      name: 'Premium Cotton T-Shirt',
      category: 'tshirts',
      price: 24.99,
      originalPrice: 29.99,
      image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg',
      rating: 4.8,
      reviews: 124,
      colors: ['white', 'black', 'navy', 'red'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    {
      id: '2',
      name: 'Ceramic Coffee Mug',
      category: 'mugs',
      price: 16.99,
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
      rating: 4.9,
      reviews: 89,
      colors: ['white', 'black', 'blue'],
      sizes: ['11oz', '15oz']
    },
    {
      id: '3',
      name: 'Protective Phone Case',
      category: 'phone-cases',
      price: 19.99,
      image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
      rating: 4.7,
      reviews: 156,
      colors: ['clear', 'black', 'white'],
      sizes: ['iPhone 14', 'iPhone 15', 'Samsung S24']
    },
    {
      id: '4',
      name: 'Vintage Style T-Shirt',
      category: 'tshirts',
      price: 22.99,
      image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg',
      rating: 4.6,
      reviews: 78,
      colors: ['gray', 'navy', 'green'],
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: '5',
      name: 'Travel Mug with Handle',
      category: 'mugs',
      price: 21.99,
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
      rating: 4.8,
      reviews: 92,
      colors: ['silver', 'black', 'blue'],
      sizes: ['16oz', '20oz']
    },
    {
      id: '6',
      name: 'Slim Phone Case',
      category: 'phone-cases',
      price: 15.99,
      image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg',
      rating: 4.5,
      reviews: 203,
      colors: ['clear', 'rose-gold', 'black'],
      sizes: ['iPhone 14', 'iPhone 15', 'Samsung S24']
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = priceRange === 'all' || 
      (priceRange === 'under-20' && product.price < 20) ||
      (priceRange === '20-30' && product.price >= 20 && product.price <= 30) ||
      (priceRange === 'over-30' && product.price > 30);
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popularity':
      default:
        return b.reviews - a.reviews;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Catalog</h1>
          <p className="text-xl text-gray-600">Customize any product to make it uniquely yours</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Prices</option>
                  <option value="under-20">Under $20</option>
                  <option value="20-30">$20 - $30</option>
                  <option value="over-30">Over $30</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">{sortedProducts.length} products found</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="popularity">Sort by Popularity</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                
                <div className="flex border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {sortedProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48' : ''}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                        viewMode === 'list' ? 'w-full h-full' : 'w-full h-64'
                      }`}
                    />
                    {product.originalPrice && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                        Sale
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-lg">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-xl font-bold text-blue-600">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="text-sm text-gray-600">
                        Colors: {product.colors.length}
                      </div>
                      <div className="text-sm text-gray-600">
                        Sizes: {product.sizes.length}
                      </div>
                    </div>
                    
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Customize Now
                    </button>
                  </div>
                </Link>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;