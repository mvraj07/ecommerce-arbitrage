import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

// Read all orders stored in localStorage (keys like "order-ORD-...")
const loadOrders = () => {
  if (typeof window === 'undefined') return []
  try {
    return Object.keys(localStorage)
      .filter(key => key.startsWith('order-'))
      .map(key => {
        try {
          return JSON.parse(localStorage.getItem(key))
        } catch {
          return null
        }
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // newest first
  } catch (error) {
    console.error('Error reading orders from localStorage:', error)
    return []
  }
}

// Format ISO date as "7 Aug 2026"
const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    })
  } catch {
    return ''
  }
}

// Short order id, e.g. "ORD-172..." -> "#172..."
const shortId = (orderId) => orderId ? orderId.replace(/^ORD-/, '#') : '#—'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const refresh = () => setOrders(loadOrders())
    refresh()
    window.addEventListener('storage', refresh)
    window.addEventListener('ordersUpdated', refresh)
    return () => {
      window.removeEventListener('storage', refresh)
      window.removeEventListener('ordersUpdated', refresh)
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      {/* Page header */}
      <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-gray-900">My Orders</h1>
      <p className="text-sm text-gray-500 mt-1">
        {orders.length === 0
          ? 'Your order history will appear here'
          : `${orders.length} order${orders.length !== 1 ? 's' : ''} placed`}
      </p>
      <div className="w-16 h-1 bg-[#c8a96e] mt-4 mb-8"></div>

      {orders.length === 0 ? (
        /* ── Empty state ── */
        <div className="max-w-md mx-auto text-center py-10 md:py-16">
          <div className="w-24 h-24 mx-auto rounded-full bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center">
            <svg className="w-11 h-11 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7h18M4 7l2 13h12l2-13M9 10a3 3 0 006 0" />
              <path d="M7 7c0-2 2-4 5-4s5 2 5 4" />
            </svg>
          </div>
          <h2 className="mt-6 text-xl md:text-2xl font-bold text-gray-900">No orders yet</h2>
          <p className="mt-2 text-sm text-gray-500">
            When you place an order, it will show up here with its status and details.
          </p>
          <Link to="/" className="mt-8 inline-block btn-primary px-8 py-3 font-semibold">
            Start Shopping
          </Link>
        </div>
      ) : (
        /* ── Order list ── */
        <div className="space-y-5">
          {orders.map((order) => (
            <div key={order.orderId} className="rounded-2xl border border-gray-200 bg-white p-4 md:p-6 hover:shadow-md transition-shadow">
              {/* Order header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-gray-100">
                <div>
                  <p className="font-bold text-gray-900 text-sm md:text-base">{shortId(order.orderId)}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{formatDate(order.date)}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-semibold text-green-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Confirmed
                </span>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-50">
                {(order.cart || []).map((item) => (
                  <div key={item.slug} className="py-3 flex items-center gap-3">
                    <Link to={`/product/${item.slug}`} className="shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-lg border border-gray-100"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm line-clamp-2">{item.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Qty {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm whitespace-nowrap shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Delivered to {order.billing?.city || 'your address'}
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-base md:text-lg font-bold text-gray-900">
                    Total: ₹{(order.total ?? 0).toLocaleString('en-IN')}
                  </p>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.winzo.retail"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gray-900 text-white font-semibold rounded-lg px-4 py-2 text-xs md:text-sm hover:bg-gray-700 transition-colors whitespace-nowrap"
                  >
                    Track Order
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
