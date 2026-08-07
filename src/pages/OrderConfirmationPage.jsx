import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Get the most recent order from localStorage (keys like "order-ORD-...")
const getLatestOrder = () => {
  if (typeof window === 'undefined') return null
  try {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('order-'))
    if (keys.length === 0) return null
    const orders = keys
      .map(k => { try { return JSON.parse(localStorage.getItem(k)) } catch { return null } })
      .filter(Boolean)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
    return orders[0] || null
  } catch {
    return null
  }
}

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return ''
  }
}

export default function OrderConfirmationPage() {
  const [order, setOrder] = useState(null)

  useEffect(() => {
    setOrder(getLatestOrder())
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 pb-24">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mx-auto">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-gray-900">Order Confirmed!</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Thank you for your purchase. Your order has been placed successfully and will be delivered soon.
        </p>
      </div>

      {/* Order summary from localStorage */}
      {order && (
        <div className="max-w-lg mx-auto mt-8 rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-gray-100">
            <div>
              <p className="font-bold text-gray-900 text-sm">{order.orderId}</p>
              <p className="text-xs text-gray-500 mt-0.5">{formatDate(order.date)}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-semibold text-green-700">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Placed
            </span>
          </div>

          <div className="divide-y divide-gray-50">
            {(order.cart || []).map((item) => (
              <div key={item.slug} className="py-3 flex items-center gap-3">
                <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded-lg border border-gray-100" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm line-clamp-1">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Qty {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900 text-sm shrink-0">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-500">Total</span>
            <span className="text-lg font-bold text-gray-900">₹{(order.total ?? 0).toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}

      {/* Secondary CTA — CPA app widget (demo) */}
      <div className="max-w-lg mx-auto mt-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-gray-900">Track Delivery Status</p>
          <p className="text-xs text-gray-500 mt-0.5">Live tracking on our partner app</p>
        </div>
        <a
          href="https://play.google.com/store/apps/details?id=com.winzo.retail"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 bg-gray-900 text-white rounded-lg px-4 py-2 text-xs font-semibold hover:bg-gray-700 transition-colors"
        >
          Open App →
        </a>
      </div>

      <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/orders"
          className="inline-block bg-gray-900 text-white px-8 py-3 rounded text-sm font-medium hover:bg-gray-700 transition-colors w-full sm:w-auto"
        >
          View My Orders
        </Link>
        <Link
          to="/"
          className="inline-block border border-gray-300 text-gray-700 px-8 py-3 rounded text-sm font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto"
        >
          Continue Shopping
        </Link>
      </div>

    </div>
  )
}
