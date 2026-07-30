import React, { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import products from '../data/products.json'
import { addToCart, getCart } from '../lib/cart'

// Mobile-responsive product detail page with add to cart functionality
export default function ProductPage() {
  const { slug } = useParams()
  const product = products.find(p => p.slug === slug)
  const [qty, setQty] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const related = useMemo(
    () => product ? products.filter(p => p.category === product.category && p.slug !== product.slug).slice(0, 4) : [],
    [product]
  )

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-4xl font-serif">Product not found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          <Link to="/" className="btn-primary px-6 py-3 inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  // Handle add to cart - uses localStorage to preserve cart and shows confirmation
  const handleAddToCart = () => {
    addToCart(product, qty)
    setIsAdded(true)
    setQty(1)

    // Auto-hide confirmation after 2 seconds
    setTimeout(() => setIsAdded(false), 2000)
  }

  // Calculate discount percentage
  const discountPercent = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0

  const currentCart = getCart()
  const cartItemCount = currentCart.length

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Product Details Section */}
      <div className="grid gap-6 md:gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Product Images - responsive */}
        <div className="space-y-3">
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-gray-100 aspect-square">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {discountPercent > 0 && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                -{discountPercent}%
              </div>
            )}
          </div>

          {/* Additional images if available */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, idx) => (
                <div key={idx} className="rounded-lg overflow-hidden bg-gray-100 aspect-square">
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Information Sidebar */}
        <aside className="space-y-4 md:space-y-6 flex flex-col">
          {/* Category Badge */}
          <div>
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif leading-tight">
            {product.title}
          </h1>

          {/* Price Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl font-bold text-green-700">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.compare_at_price && (
                <span className="text-lg text-gray-500 line-through">
                  ₹{product.compare_at_price.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {discountPercent > 0 && (
              <p className="text-sm text-red-600 font-semibold">Save ₹{(product.compare_at_price - product.price).toLocaleString('en-IN')}</p>
            )}
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            {product.description}
          </p>

          {/* Add to Cart Section */}
          <div className="space-y-3 mt-auto pt-4 md:pt-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={e => setQty(Math.max(1, Number(e.target.value) || 1))}
                  className="w-16 text-center border-0 py-2 focus:outline-none focus:ring-0"
                />
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-600">({qty} items)</span>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-3 md:py-4 px-4 font-bold text-white rounded-lg transition-all duration-300 text-sm md:text-base ${
                isAdded
                  ? 'bg-green-700'
                  : 'btn-primary hover:shadow-lg'
              }`}
            >
              {isAdded ? '✓ Added to Cart!' : 'ADD TO CART'}
            </button>

            {/* Go to Cart Button */}
            <Link
              to="/cart"
              className="w-full py-3 md:py-4 px-4 border-2 border-green-600 text-green-600 font-bold rounded-lg text-center hover:bg-green-50 transition-colors text-sm md:text-base"
            >
              Go to Cart ({cartItemCount})
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="pt-4 md:pt-6 border-t border-gray-200 space-y-2 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span> Free shipping on all orders
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span> 30-day easy returns
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-600 font-bold">✓</span> Secure checkout
            </p>
          </div>
        </aside>
      </div>

      {/* Related Products Section */}
      {related.length > 0 && (
        <section className="space-y-4 md:space-y-6 border-t border-gray-200 pt-8 md:pt-12">
          <h2 className="text-2xl md:text-3xl font-serif">Related Products</h2>
          <div className="grid gap-3 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map(r => (
              <Link
                key={r.slug}
                to={`/product/${r.slug}`}
                className="group overflow-hidden rounded-2xl md:rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="overflow-hidden bg-gray-100 aspect-square">
                  <img
                    src={r.images[0]}
                    alt={r.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{r.category}</p>
                  <h3 className="text-sm md:text-base font-semibold text-gray-900 line-clamp-2 mt-1">
                    {r.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-green-700 text-sm md:text-base">
                      ₹{r.price.toLocaleString('en-IN')}
                    </span>
                    {r.compare_at_price && (
                      <span className="text-xs text-gray-500 line-through">
                        ₹{r.compare_at_price.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
