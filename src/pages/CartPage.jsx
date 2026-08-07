import React, { useEffect, useRef, useState } from 'react'
import { getCart, updateCartQuantity, removeFromCart, clearCart } from '../lib/cart'
import { Link } from 'react-router-dom'
import { refreshAllBanners } from '../engine/adOrchestrator'
import AdSlot from '../components/AdSlot'
import { isValidCouponCode } from '../lib/coupon'

const COUPON_MINIMUM = 249

const TRUST_POINTS = [
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
]

// Modern, responsive cart page with localStorage sync
export default function CartPage() {
  const [cart, setCart] = useState([])

  // Pincode / COD-availability demo state
  const [pincode, setPincode] = useState('')
  const [checkingCod, setCheckingCod] = useState(false)
  const [codStatus, setCodStatus] = useState(null) // null | 'available' | 'error'
  const [codChecked, setCodChecked] = useState(false) // COD verified (mandatory)
  const [pincodeFlash, setPincodeFlash] = useState(false) // highlight pincode card
  const pincodeRef = useRef(null)

  // Coupon (offerwall) demo state — persisted in localStorage so reloads keep it
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponTotal, setCouponTotal] = useState(0)
  const [couponCode, setCouponCode] = useState(null)
  const [enteredCode, setEnteredCode] = useState('')
  const [codeError, setCodeError] = useState(false)

  // Load cart from localStorage on mount and listen for updates
  useEffect(() => {
    const loadCart = () => {
      setCart(getCart())
      // Refresh checkout-gating state — a new product added to the cart resets
      // the COD + coupon flags, so this re-reads them on every cart change.
      setCouponApplied(localStorage.getItem('couponApplied') === 'true')
      setCouponTotal(Number(localStorage.getItem('couponTotal') || 0))
      setCouponCode(localStorage.getItem('couponCode'))
      setCodChecked(localStorage.getItem('codChecked') === 'true')
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

  // Clear whole cart
  const handleClearAll = () => {
    clearCart()
    setCart([])
  }

  // Pincode check — demo: simulated 8s "verification" then shows COD available
  const handleCheckCod = (e) => {
    e.preventDefault()
    if (!/^\d{6}$/.test(pincode)) {
      setCodStatus('error')
      return
    }
    setCheckingCod(true)
    setCodStatus(null)
    refreshAllBanners() // Demo: banners refresh while the spinner runs
    setTimeout(() => {
      setCheckingCod(false)
      setCodStatus('available')
      setCodChecked(true)
      localStorage.setItem('codChecked', 'true')
    }, 10000)
  }

  // PROCEED TO CHECKOUT — enforces the funnel:
  //   1. COD pincode check is MANDATORY → redirect to the pincode card.
  //   2. Applying a coupon is NOT mandatory, but we still nudge the user to it.
  const handleProceedToCheckout = () => {
    const codOk = codChecked || codStatus === 'available'
    if (!codOk) {
      // Scroll to the pincode card and highlight it
      pincodeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setPincodeFlash(true)
      setTimeout(() => setPincodeFlash(false), 2000)
      return
    }
    // COD done — nudge to the coupon offerwall if not yet visited/applied
    const couponDone = couponApplied || localStorage.getItem('couponVisited') === 'true'
    if (!couponDone) {
      localStorage.setItem('couponVisited', 'true')
      window.location.href = '/apply-coupon'
      return
    }
    // Both done (or coupon skipped via visit) → proceed
    window.location.href = '/checkout'
  }

  // Apply the generated coupon code — only the code earned from the partner
  // task works. Any other code is rejected.
  const handleApplyCode = (e) => {
    e.preventDefault()
    if (isValidCouponCode(enteredCode)) {
      setCouponApplied(true)
      setCodeError(false)
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        localStorage.setItem('couponApplied', 'true')
        localStorage.setItem('couponTotal', String(subtotal))
      } catch {
        /* ignore */
      }
      setCouponApplied(true)
    } else {
      setCodeError(true)
      setCouponApplied(false)
    }
  }

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Coupon demo: does the coupon qualify at the current cart total?
  const couponMinimum = 249
  const couponActive = couponApplied && subtotal >= couponMinimum
  const couponDiscount = couponActive ? Math.round(subtotal * 0.5) : 0
  const discountTotal = Math.max(0, subtotal - couponDiscount)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Page header */}
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-gray-900">Shopping Cart</h1>
          <p className="text-sm text-gray-500 mt-1">
            {cart.length === 0 ? 'Your cart is empty' : `${itemCount} item${itemCount !== 1 ? 's' : ''} in your cart`}
          </p>
        </div>
        {cart.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-xs md:text-sm text-gray-500 hover:text-red-600 font-medium transition-colors"
          >
            Clear cart
          </button>
        )}
      </div>
      <div className="w-16 h-1 bg-[#c8a96e] mt-4 mb-8"></div>

      {cart.length === 0 ? (
        /* ── Empty state ── */
        <div className="max-w-md mx-auto text-center py-10 md:py-16">
          <div className="w-24 h-24 mx-auto rounded-full bg-gray-50 border border-dashed border-gray-300 flex items-center justify-center">
            <svg className="w-11 h-11 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2l-3 4v15h18V6l-3-4z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <h2 className="mt-6 text-xl md:text-2xl font-bold text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-sm text-gray-500">
            Looks like you haven't added anything yet. Explore our latest collection to get started.
          </p>
          <Link to="/" className="mt-8 inline-block btn-primary px-8 py-3 font-semibold">
            Start Shopping
          </Link>
          <div className="mt-4">
            <Link
              to="/product-category/top-selling"
              className="text-sm text-gray-600 underline underline-offset-2 hover:text-gray-900 transition-colors"
            >
              Browse best sellers →
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[1.6fr_0.9fr] lg:gap-10">
          {/* ── Cart Items ── */}
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={item.slug}
                className="rounded-2xl border border-gray-200 bg-white p-4 md:p-5 hover:border-gray-300 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Product */}
                  <Link
                    to={`/product/${item.slug}`}
                    className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 group"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-xl border border-gray-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm md:text-[15px] line-clamp-2 leading-snug group-hover:text-gray-600 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 capitalize">{item.category}</p>
                      <p className="text-xs text-gray-600 mt-1.5 font-medium">
                        ₹{item.price.toLocaleString('en-IN')} <span className="text-gray-400 font-normal">each</span>
                      </p>
                    </div>
                  </Link>

                  {/* Right controls — single row: total · qty · delete */}
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <span className="font-bold text-gray-900 text-sm md:text-base whitespace-nowrap">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>

                    {/* Quantity stepper — − at qty 1 removes the item */}
                    <div className="flex items-center rounded-full border border-gray-300 overflow-hidden shrink-0">
                      <button
                        onClick={() => item.quantity <= 1 ? handleRemove(index) : handleUpdateQty(index, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={e => handleUpdateQty(index, e.target.value)}
                        className="w-9 text-center text-sm font-medium border-0 focus:outline-none focus:ring-0"
                      />
                      <button
                        onClick={() => handleUpdateQty(index, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => handleRemove(index)}
                      className="text-gray-400 hover:text-red-500 p-1.5 rounded-full hover:bg-red-50 transition-colors"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Order Summary ── */}
          <aside className="lg:sticky lg:top-24 h-fit space-y-4 md:space-y-6">

            {/* Pincode / COD availability (demo) */}
            <div
              ref={pincodeRef}
              className={`rounded-2xl border bg-white p-5 md:p-6 shadow-sm transition-all ${
                pincodeFlash ? 'border-amber-400 ring-2 ring-amber-300' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">COD Availability</h3>
                {!codChecked && codStatus !== 'available' && (
                  <span className="text-[10px] font-semibold text-red-500 uppercase">Required</span>
                )}
              </div>
              <form onSubmit={handleCheckCod} className="mt-3 flex gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={pincode}
                  onChange={e => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit pincode"
                  className="flex-1 min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="submit"
                  disabled={checkingCod}
                  className="bg-gray-900 text-white rounded-lg px-4 text-sm font-semibold hover:bg-gray-700 transition-colors disabled:opacity-60"
                >
                  Check COD
                </button>
              </form>

              {codStatus === 'error' && (
                <p className="mt-2 text-xs text-red-600">Please enter a valid 6-digit pincode.</p>
              )}
              {codStatus === 'available' && (
                <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-green-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  COD Available for {pincode}!
                </p>
              )}
            </div>

            {/* Coupon / offerwall notice (demo) */}
            {couponApplied && (
              <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm">
                {couponActive ? (
                  <div>
                    <p className="text-sm font-semibold text-green-700">
                      Coupon {couponCode || 'code'} applied! 50% OFF
                    </p>
                    <p className="mt-1 text-xs text-gray-500">Discount of ₹{couponDiscount.toLocaleString('en-IN')} reflected below.</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-semibold text-amber-600">
                      Coupon {couponCode || 'code'} Staged! Add ₹{Math.max(0, couponMinimum - subtotal).toLocaleString('en-IN')} more to reach ₹{couponMinimum} minimum order.
                    </p>
                    <Link
                      to="/"
                      className="mt-3 inline-block text-sm font-medium text-gray-900 underline underline-offset-2 hover:text-gray-600"
                    >
                      ← Add More Products to Cart
                    </Link>
                  </div>
                )}
              </div>
            )}

            <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">Order Summary</h2>

              <div className="mt-4 space-y-3 text-sm md:text-base">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                {couponActive && (
                  <div className="flex justify-between text-gray-600">
                    <span>Coupon (FLASH50)</span>
                    <span className="font-semibold text-green-600">− ₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="pt-4 border-t border-dashed border-gray-200 flex justify-between items-baseline">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-xl md:text-2xl font-bold text-gray-900">
                    ₹{discountTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Coupon offerwall CTA — hidden once a coupon is applied */}
              {couponApplied ? (
                <div className="mt-5 rounded-xl border-2 border-green-200 bg-green-50 p-4 text-sm text-green-700">
                  <p className="font-semibold flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Coupon applied — 50% OFF unlocked
                  </p>
                  <p className="text-xs text-green-600 mt-1">Code {couponCode || ''} is active on this order.</p>
                </div>
              ) : (
                <div className="mt-5 rounded-xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-yellow-50 p-4 shadow-sm">
                  <p className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4a2 2 0 00-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.22-1.05-.58-1.41zM5.5 7A1.5 1.5 0 117 5.5 1.5 1.5 0 015.5 7z" />
                    </svg>
                    Unlock 50% OFF now!
                  </p>
                  <p className="text-[11px] text-amber-600/90 mb-2.5">On orders above ₹{COUPON_MINIMUM} — takes a minute</p>
                  <Link
                    to="/apply-coupon"
                    className="w-full block text-center bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg px-4 py-3 text-sm font-bold hover:from-amber-600 hover:to-orange-600 shadow-md hover:shadow-lg transition-all relative"
                  >
                    Apply Coupon
                  </Link>
                </div>
              )}

              <button
                onClick={handleProceedToCheckout}
                className="mt-5 w-full block text-center btn-primary px-4 py-3.5 md:py-4 font-semibold text-sm md:text-base"
              >
                PROCEED TO CHECKOUT
              </button>

              {/* Demo ad below the checkout button */}
              <div className="mt-4">
                <AdSlot type="banner-300x250" />
              </div>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-500">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 018 0v4" />
                </svg>
                Secure 100% encrypted checkout
              </div>
            </div>

            {/* Trust perks */}
            <div className="grid grid-cols-2 gap-3">
              {TRUST_POINTS.map((point) => (
                <div key={point.label} className="rounded-xl border border-gray-200 bg-white p-3 flex items-start gap-2.5">
                  <span className="text-gray-700 shrink-0 mt-0.5">{point.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-900 leading-tight">{point.label}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">{point.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      )}

      {/* ── COD checking modal (demo — 8s spinner + ad) ── */}
      {checkingCod && (
        <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-sm w-full text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-full border-4 border-gray-200 border-t-green-600 animate-spin" />
            <p className="text-sm font-semibold text-gray-900">Verifying COD availability in your area...</p>
            <p className="text-xs text-gray-500">
              Checking pincode {pincode} · demo 10-second delay
            </p>

            {/* Demo ad inside the verification screen */}
            <div className="pt-2">
              <AdSlot type="in-page-push" />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
