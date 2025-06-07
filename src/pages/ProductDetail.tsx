import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Upload, Type, Palette, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedColor, setSelectedColor] = useState('white');
  const [selectedSize, setSelectedSize] = useState('M');
  const [customText, setCustomText] = useState('');
  const [selectedFont, setSelectedFont] = useState('Arial');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Mock product data
  const product = {
    id: id || '1',
    name: 'Premium Cotton T-Shirt',
    price: 24.99,
    originalPrice: 29.99,
    image: 'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg',
    rating: 4.8,
    reviews: 124,
    description: 'High-quality 100% cotton t-shirt perfect for custom designs. Soft, comfortable, and durable.',
    colors: [
      { name: 'White', value: 'white', hex: '#FFFFFF' },
      { name: 'Black', value: 'black', hex: '#000000' },
      { name: 'Navy', value: 'navy', hex: '#1e3a8a' },
      { name: 'Red', value: 'red', hex: '#dc2626' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    fonts: ['Arial', 'Helvetica', 'Times New Roman', 'Georgia', 'Verdana']
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: Date.now().toString(),
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      customization: {
        text: customText,
        image: uploadedImage || undefined,
        color: selectedColor,
        size: selectedSize,
        font: selectedFont
      },
      image: product.image
    };

    dispatch({ type: 'ADD_ITEM', payload: cartItem });
    navigate('/cart');
  };

  const getPreviewStyle = () => {
    const colorMap: { [key: string]: string } = {
      white: '#FFFFFF',
      black: '#000000',
      navy: '#1e3a8a',
      red: '#dc2626'
    };

    return {
      backgroundColor: colorMap[selectedColor] || '#FFFFFF',
      color: selectedColor === 'white' ? '#000000' : '#FFFFFF'
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="relative aspect-square">
                <div
                  className="w-full h-full flex items-center justify-center relative"
                  style={getPreviewStyle()}
                >
                  {/* Base product image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover opacity-80"
                  />
                  
                  {/* Custom overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      {uploadedImage && (
                        <img
                          src={uploadedImage}
                          alt="Custom design"
                          className="max-w-32 max-h-32 mx-auto rounded-lg shadow-lg"
                        />
                      )}
                      {customText && (
                        <div
                          className="text-2xl font-bold px-4 py-2 rounded"
                          style={{
                            fontFamily: selectedFont,
                            color: selectedColor === 'white' ? '#000000' : '#FFFFFF',
                            textShadow: selectedColor === 'white' ? 'none' : '1px 1px 2px rgba(0,0,0,0.5)'
                          }}
                        >
                          {customText}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
              <p className="text-gray-600">
                Your design will appear on the product above. Upload an image or add text to see the preview.
              </p>
            </div>
          </div>

          {/* Product Details & Customization */}
          <div className="space-y-8">
            {/* Product Info */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="h-6 w-6" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <Share2 className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-blue-600">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>
            </div>

            {/* Customization Options */}
            <div className="bg-white p-8 rounded-2xl shadow-sm space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Customize Your Product</h2>

              {/* Upload Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Your Design
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Click to upload image or drag and drop</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Custom Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add Custom Text
                </label>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Enter your text here..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <select
                    value={selectedFont}
                    onChange={(e) => setSelectedFont(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {product.fonts.map(font => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Color
                </label>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-12 h-12 rounded-full border-2 ${
                        selectedColor === color.value ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Size
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 border rounded-lg text-center font-medium transition-colors ${
                        selectedSize === size
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;