import React, { useEffect, useState } from 'react'
import { getCart, updateCartQuantity, removeFromCart, clearCart } from '../lib/cart'
import { Link } from 'react-router-dom'

// Mobile-responsive cart page with localStorage sync
export default function CartPage() {
  const [cart, setCart] = useState([])

  // Load cart from localStorage on mount and listen for updates
  useEffect(() => {
    const loadCart = () => {
      setCart(getCart())
    }

    loadCart()

    // Listen for cart updates from other components or this component
    window.addEventListener('cartUpdated', loadCart)
    window.addEventListener('storage', loadCart)

    return () => {
      window.removeEventListener('cartUpdated', loadCart)
      window.removeEventListener('storage', loadCart)
    }
  }, [])

  // Update quantity for item at index
  const handleUpdateQty = (index, value) => {
    const qty = Number(value) || 1
    if (qty > 0) {
      updateCartQuantity(index, qty)
      setCart(getCart())
    }
  }

  // Remove item from cart
  const handleRemove = (index) => {
    removeFromCart(index)
    setCart(getCart())
  }

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif">Shopping Cart</h1>
        {cart.length > 0 && (
          <button
            onClick={() => {
              clearCart()
              setCart([])
            }}
            className="text-xs md:text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Clear cart
          </button>
        )}
      </div>

      <div className="grid gap-6 md:gap-8 lg:gap-10 lg:grid-cols-[1.6fr_0.9fr]">
        {/* Cart Items */}
        <div className="rounded-2xl md:rounded-3xl border border-gray-200 bg-white p-4 md:p-6">
          {cart.length === 0 ? (
            <div className="py-12 md:py-16 text-center space-y-4">
              <svg className="w-16 h-16 md:w-20 md:h-20 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Your cart is empty</h2>
              <p className="text-sm md:text-base text-gray-600">Let's add some products to get started!</p>
              <Link to="/" className="btn-primary px-6 py-2 md:py-3 inline-block">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-3 md:p-4 font-semibold text-gray-900">Product</th>
                    <th className="text-right p-3 md:p-4 font-semibold text-gray-900">Price</th>
                    <th className="text-center p-3 md:p-4 font-semibold text-gray-900">Quantity</th>
                    <th className="text-right p-3 md:p-4 font-semibold text-gray-900">Subtotal</th>
                    <th className="text-center p-3 md:p-4 font-semibold text-gray-900">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      {/* Product Info */}
                      <td className="p-3 md:p-4">
                        <Link
                          to={`/product/${item.slug}`}
                          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-16 w-16 md:h-20 md:w-20 object-cover rounded border border-gray-200"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-gray-900 line-clamp-2 text-xs md:text-sm">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-600 mt-1 capitalize">{item.category}</p>
                          </div>
                        </Link>
                      </td>

                      {/* Price */}
                      <td className="text-right p-3 md:p-4 font-medium text-gray-900">
                        ₹{item.price.toLocaleString('en-IN')}
                      </td>

                      {/* Quantity */}
                      <td className="p-3 md:p-4 text-center">
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          onChange={e => handleUpdateQty(index, e.target.value)}
                          className="w-16 md:w-20 rounded border border-gray-300 px-2 py-1 text-center text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </td>

                      {/* Subtotal */}
                      <td className="text-right p-3 md:p-4 font-semibold text-gray-900">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </td>

                      {/* Remove Button */}
                      <td className="text-center p-3 md:p-4">
                        <button
                          onClick={() => handleRemove(index)}
                          className="text-gray-500 hover:text-red-600 transition-colors font-bold text-lg"
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Cart Totals Sidebar */}
        {cart.length > 0 && (
          <aside className="space-y-4 md:space-y-6">
            <div className="rounded-2xl md:rounded-3xl border border-gray-200 bg-white p-4 md:p-6 space-y-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Order Summary</h2>

              <div className="space-y-3 text-sm md:text-base">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-medium">FREE</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between text-gray-900 font-semibold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full block text-center btn-primary px-4 py-3 md:py-4 font-semibold text-sm md:text-base"
              >
                PROCEED TO CHECKOUT
              </Link>

              <Link
                to="/"
                className="w-full block text-center px-4 py-2 md:py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm md:text-base"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Cart Info */}
            <div className="rounded-2xl md:rounded-3xl border border-gray-200 bg-white p-4 md:p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Cart Info</h3>
              <ul className="space-y-2 text-xs md:text-sm text-gray-600">
                <li>✓ All prices include taxes</li>
                <li>✓ Free shipping on all orders</li>
                <li>✓ Easy returns within 30 days</li>
                <li>✓ Secure checkout process</li>
              </ul>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
