import React, { useMemo, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import products from '../data/products.json'
import { addToCart, getCart } from '../lib/cart'

import { getProductReviews, getProductRating } from '../data/reviews'

// Star rating display (supports half stars via filled/partial)
function Stars({ rating, className = '' }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star
        const partial = rating > star - 1 && rating < star
        return (
          <svg key={star} className="w-4 h-4" viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`star-${star}`}>
                <stop offset={partial ? `${(rating - (star - 1)) * 100}%` : '100%'} stopColor="#f59e0b" />
                <stop offset={partial ? `${(rating - (star - 1)) * 100}%` : '100%'} stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <path
              fill={filled ? '#f59e0b' : partial ? `url(#star-${star})` : '#d1d5db'}
              d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.42 4.37a1 1 0 00.95.69h4.6c.97 0 1.37 1.24.59 1.81l-3.72 2.7a1 1 0 00-.36 1.12l1.42 4.37c.3.92-.75 1.68-1.54 1.12l-3.72-2.7a1 1 0 00-1.18 0l-3.72 2.7c-.79.56-1.84-.2-1.54-1.12l1.42-4.37a1 1 0 00-.36-1.12L2.2 9.8c-.78-.57-.38-1.81.6-1.81h4.6a1 1 0 00.95-.69l1.4-4.37z"
            />
          </svg>
        )
      })}
    </div>
  )
}

// Mobile-responsive product detail page with add to cart functionality
export default function ProductPage() {
  const { slug } = useParams()
  const product = products.find(p => p.slug === slug)
  const [qty, setQty] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const goToCartRef = useRef(null)

  const related = useMemo(
    () => product ? products.filter(p => p.category === product.category && p.slug !== product.slug).slice(0, 4) : [],
    [product]
  )

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-gray-900">Product not found</h1>
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
    setAddedToCart(true)
    setQty(1)

    // Auto-hide confirmation after 2 seconds
    setTimeout(() => setIsAdded(false), 2000)

    // Auto-scroll to the "Go to Cart" button (and Related Products below it)
    // after the button has faded in (1.2s delay + animation).
    setTimeout(() => {
      goToCartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 1300)
  }

  // Calculate discount percentage
  const discountPercent = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0

  const currentCart = getCart()
  const cartItemCount = currentCart.length

  // Ratings & reviews (deterministic per product)
  const reviews = product ? getProductReviews(product) : []
  const rating = product ? getProductRating(product) : { avg: 0, count: 0 }
  const [showAllReviews, setShowAllReviews] = useState(false)
  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 md:space-y-12">
      {/* Product Details Section */}
      <div className="grid gap-6 md:gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Product Images - responsive */}
        <div className="space-y-3">
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#fafafa] border border-gray-100 aspect-square">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover object-center"
              fetchPriority="high"
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
                <div key={idx} className="img-shell aspect-square">
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover object-center" loading="lazy" />
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
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            {product.title}
          </h1>

          {/* Rating summary */}
          {rating.count > 0 && (
            <a href="#reviews" className="flex items-center gap-2 group w-fit">
              <Stars rating={rating.avg} />
              <span className="text-sm font-semibold text-gray-900">{rating.avg}</span>
              <span className="text-xs text-gray-500 group-hover:text-gray-700">
                ({rating.count} review{rating.count !== 1 ? 's' : ''})
              </span>
            </a>
          )}

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
          <div className="space-y-3">
            <h2 className="text-xs uppercase tracking-[0.2em] text-gray-500">Description</h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

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

            {/* Go to Cart Button - only shown once product is added to cart.
                Appears after a 1.2s delay with a light fade-in. */}
            {addedToCart && (
              <Link
                ref={goToCartRef}
                to="/cart"
                style={{ animationDelay: '1.2s' }}
                className="block w-full py-3 md:py-4 px-4 border-2 border-green-600 text-green-600 font-bold rounded-lg text-center hover:bg-green-50 transition-colors text-sm md:text-base fade-in-up"
              >
                Go to Cart ({cartItemCount})
              </Link>
            )}

</div>

          {/* Trust Badges — matching cart page icon tiles */}
          <div className="pt-4 md:pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: 'Cash on Delivery',
                  sub: 'Available nationwide',
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="6" width="20" height="12" rx="2" />
                      <circle cx="12" cy="12" r="2.5" />
                      <path d="M6 12h.01M18 12h.01" />
                    </svg>
                  ),
                },
                {
                  label: '10-Day Returns',
                  sub: 'Easy & hassle-free',
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 14L4 9l5-5" />
                      <path d="M4 9h10a6 6 0 016 6v0a6 6 0 01-6 6H7" />
                    </svg>
                  ),
                },
                {
                  label: 'Free Shipping',
                  sub: 'On all orders',
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 3h15v13H1z" />
                      <path d="M16 8h4l3 3v5h-7z" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  ),
                },
                {
                  label: 'Secure Checkout',
                  sub: '100% protected',
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="11" width="16" height="10" rx="2" />
                      <path d="M8 11V7a4 4 0 018 0v4" />
                    </svg>
                  ),
                },
              ].map((point) => (
                <div key={point.label} className="rounded-xl border border-gray-200 bg-white p-3 flex items-start gap-2.5">
                  <span className="text-gray-700 shrink-0 mt-0.5">{point.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-900 leading-tight">{point.label}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">{point.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Ratings & Reviews Section */}
      {reviews.length > 0 && (
        <section id="reviews" className="border-t border-gray-200 pt-8 md:pt-12">
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-gray-900">Ratings & Reviews</h2>

          {/* Summary */}
          <div className="mt-6 flex flex-wrap items-center gap-4 md:gap-6">
            <div className="text-center px-4 py-3 rounded-xl border border-gray-200 bg-gray-50">
              <p className="text-3xl font-bold text-gray-900">{rating.avg}</p>
              <Stars rating={rating.avg} className="mt-1" />
              <p className="text-xs text-gray-500 mt-1">{rating.count} review{rating.count !== 1 ? 's' : ''}</p>
            </div>
            <div className="flex-1 min-w-[200px]">
              {/* Rating distribution bars */}
              {[5, 4, 3, 2, 1].map(star => {
                const share = reviews.filter(r => Math.round(r.rating) === star).length / reviews.length
                return (
                  <div key={star} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="w-6 shrink-0">{star}★</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${share * 100}%` }} />
                    </div>
                    <span className="w-8 shrink-0 text-right">{Math.round(share * 100)}%</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Review cards */}
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {visibleReviews.map((review, idx) => (
              <div key={idx} className="rounded-2xl border border-gray-200 bg-white p-4 md:p-5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-semibold shrink-0">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{review.name}</p>
                      <p className="text-[11px] text-gray-400">{review.verified || 'Customer'}</p>
                    </div>
                  </div>
                  <Stars rating={review.rating} />
                </div>
                <h4 className="mt-3 text-sm font-semibold text-gray-900">{review.title}</h4>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>

          {/* Show more / less */}
          {reviews.length > 3 && (
            <button
              onClick={() => setShowAllReviews(v => !v)}
              className="mt-6 mx-auto block border border-gray-300 text-gray-700 rounded-lg px-6 py-2.5 text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              {showAllReviews ? 'Show fewer reviews' : `Show all ${reviews.length} reviews`}
            </button>
          )}
        </section>
      )}

      {/* Related Products Section */}
      {related.length > 0 && (
        <section className="space-y-4 md:space-y-6 border-t border-gray-200 pt-8 md:pt-12">
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-gray-900">Related Products</h2>
          <div className="grid gap-3 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map(r => (
              <Link
                key={r.slug}
                to={`/product/${r.slug}`}
                className="group overflow-hidden rounded-2xl md:rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="img-shell aspect-[3/4]">
                  <img
                    src={r.images[0]}
                    alt={r.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
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
