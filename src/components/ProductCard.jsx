import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0

  return (
    <Link
      to={`/product/${product.slug}`}
      className="product-card group block"
    >
      {/* Image */}
      <div className="img-shell aspect-[3/4]">
        <img
          src={product.images[0]}
          alt={product.title}
          className="product-card-img w-full h-full object-cover object-center"
          loading="lazy"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
            -{discount}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="mt-2.5 space-y-0.5">
        <p className="text-[11px] text-gray-400 uppercase tracking-wider capitalize truncate">
          {product.category}
        </p>
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug group-hover:text-gray-600 transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-sm font-bold text-gray-900">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.compare_at_price && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.compare_at_price.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
