import React from 'react'
import { Link } from 'react-router-dom'

// Mobile-responsive ProductCard with hover effects and discount display
export default function ProductCard({ product }) {
  // Calculate discount percentage
  const discountPercent = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group overflow-hidden rounded-xl md:rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300"
    >
      {/* Product Image Container */}
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-2 md:top-3 right-2 md:right-3 bg-red-500 text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold">
            -{discountPercent}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-2 md:p-3">
        {/* Category */}
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{product.category}</p>

        {/* Title */}
        <h3 className="text-xs md:text-sm font-semibold text-gray-900 line-clamp-2 mt-1 group-hover:text-green-700 transition-colors">
          {product.title}
        </h3>

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm md:text-base font-bold text-green-700">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.compare_at_price && (
            <span className="text-xs text-gray-500 line-through">
              ₹{product.compare_at_price.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
