import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import products from '../data/products.json'
import { getCart, addToCart } from '../lib/cart'
import AdSlot from '../components/AdSlot'
import { COUPON_MINIMUM } from './CouponOfferwallPage'

export default function AddMorePage() {
  const [cart, setCart] = useState([])
  const [recommended, setRecommended] = useState([])
  const [added, setAdded] = useState({})

  // Load cart and pick affordable recommendations under the minimum
  useEffect(() => {
    setCart(getCart())
    const affordable = products
      .filter(p => p.price < COUPON_MINIMUM)
      .sort((a, b) => a.price - b.price)
      .slice(0, 8)
    setRecommended(affordable)
  }, [])

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shortfall = Math.max(0, COUPON_MINIMUM - subtotal)

  const handleAdd = (product) => {
    addToCart(product, 1)
    setCart(getCart())
    setAdded(prev => ({ ...prev, [product.slug]: true }))
    setTimeout(() => {
      setAdded(prev => ({ ...prev, [product.slug]: false }))
    }, 1500)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
      <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-gray-900">Complete Your Order</h1>
      <div className="w-16 h-1 bg-[#c8a96e] mt-4 mb-8"></div>

      {/* Shortfall notice */}
      <div className="max-w-xl mx-auto rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-yellow-50 p-6 text-center shadow-sm">
        <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 flex items-center justify-center">
          <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M4 7l2 13h12l2-13M9 10a3 3 0 006 0M7 7c0-2 2-4 5-4s5 2 5 4" />
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-bold text-gray-900">You're almost there!</h2>
        <p className="mt-2 text-sm text-gray-600">
          Your current cart is <span className="font-bold text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>.
          Add at least <span className="font-bold text-amber-600">₹{shortfall.toLocaleString('en-IN')} more</span> to unlock your 50% OFF coupon.
        </p>
        <div className="mt-4 inline-block rounded-lg bg-amber-100 px-4 py-2 text-sm font-bold text-amber-700">
          Minimum order: ₹{COUPON_MINIMUM}
        </div>
      </div>

      {/* Recommended products */}
      <h2 className="mt-10 text-xl md:text-2xl font-bold uppercase tracking-wide text-gray-900">Recommended to reach the minimum</h2>
      <div className="mt-4 grid gap-3 md:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {recommended.map((p) => (
          <div key={p.slug} className="rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
            <Link to={`/product/${p.slug}`} className="block">
              <div className="aspect-[3/4] overflow-hidden bg-gray-50">
                <img src={p.images[0]} alt={p.title} loading="lazy" className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300" />
              </div>
            </Link>
            <div className="p-3">
              <p className="text-xs text-gray-500 capitalize truncate">{p.category}</p>
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">{p.title}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="font-bold text-green-700 text-sm">₹{p.price.toLocaleString('en-IN')}</span>
                <button
                  onClick={() => handleAdd(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    added[p.slug]
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-900 text-white hover:bg-gray-700'
                  }`}
                >
                  {added[p.slug] ? '✓ Added' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/apply-coupon"
          className="w-full sm:w-auto text-center bg-green-600 text-white rounded-lg px-8 py-3 text-sm font-bold hover:bg-green-700 transition-colors"
        >
          I've Added More — Check Again
        </Link>
        <Link
          to="/cart"
          className="w-full sm:w-auto text-center border border-gray-300 text-gray-700 rounded-lg px-8 py-3 text-sm font-semibold hover:bg-gray-50 transition-colors"
        >
          Back to Cart
        </Link>
      </div>

      {/* Ad stack (demo) */}
      <div className="mt-10 space-y-6">
        <AdSlot type="banner-300x250" />
        <AdSlot type="in-page-push" />
      </div>
    </div>
  )
}
