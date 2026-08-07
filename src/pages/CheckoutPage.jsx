import React, { useState, useEffect } from "react";
import { getCart, clearCart } from "../lib/cart";
import { useNavigate, Link } from "react-router-dom";

// Mobile-responsive checkout page with form validation
export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [billing, setBilling] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    landmark: "",
    altPhone: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Placing-order (truck animation) state
  const [placingOrder, setPlacingOrder] = useState(false);

  // Load cart on mount
  useEffect(() => {
    const loadedCart = getCart();
    setCart(loadedCart);
    if (loadedCart.length === 0) {
      // Redirect to cart if empty
      navigate('/cart');
    }
  }, [navigate]);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  // Form validation (email is optional)
  const isFormValid = () => {
    return (
      billing.fullName.trim() &&
      billing.phone.trim() &&
      billing.address.trim() &&
      billing.city.trim() &&
      billing.state.trim() &&
      billing.pin.trim()
    );
  };

  // Handle form submission — 10s "placing order" hold with truck animation + ad
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call (or replace with actual backend endpoint)
      const orderId = `ORD-${Date.now()}`;

      // TODO: Send billing data to your backend/email service
      // For now, we just store order info in localStorage
      const orderData = {
        orderId,
        date: new Date().toISOString(),
        billing,
        cart,
        total,
        status: 'pending'
      };

      localStorage.setItem(`order-${orderId}`, JSON.stringify(orderData));

      // 10s "placing order" truck animation + ad, then confirm
      setTimeout(() => {
        // Clear cart after order placement
        clearCart();
        setLoading(false);
        setPlacingOrder(false);
        setShowSuccessModal(true);

        // Navigate to order confirmation after 2 seconds
        setTimeout(() => {
          navigate(`/order-confirmation`);
        }, 2000);
      }, 10000);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Error placing order. Please try again.');
      setLoading(false);
      setPlacingOrder(false);
    }
  };

if (cart.length === 0 && !showSuccessModal) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-gray-900">Checkout</h1>
          <div className="w-16 h-1 bg-[#c8a96e] mb-6"></div>
        </div>
        <Link to="/cart" className="text-sm text-gray-600 hover:text-gray-900">
          ← Back to Cart
        </Link>
      </div>

      <div className="grid gap-6 md:gap-8 lg:grid-cols-[1.45fr_0.95fr]">
        {/* Billing Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl md:rounded-3xl border border-gray-200 bg-white p-4 md:p-6 lg:p-8 space-y-4"
        >
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0112 6a5.5 5.5 0 019.5 6c-2.5 4.4-9.5 9-9.5 9z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Delivery Details</h2>
              <p className="text-xs text-gray-500 mt-0.5">Where should we send your order?</p>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              required
              value={billing.fullName}
              onChange={(e) => setBilling({ ...billing, fullName: e.target.value })}
              className="w-full rounded-lg md:rounded-xl border border-gray-300 px-3 md:px-4 py-2 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              required
              value={billing.phone}
              onChange={(e) => setBilling({ ...billing, phone: e.target.value })}
              className="w-full rounded-lg md:rounded-xl border border-gray-300 px-3 md:px-4 py-2 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Address (house no. + area) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="House No., Flat / Apartment, Area — e.g. B-204, Green Park Extension"
              required
              value={billing.address}
              onChange={(e) => setBilling({ ...billing, address: e.target.value })}
              className="w-full rounded-lg md:rounded-xl border border-gray-300 px-3 md:px-4 py-2 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* City, State, PIN */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Mumbai"
                required
                value={billing.city}
                onChange={(e) => setBilling({ ...billing, city: e.target.value })}
                className="w-full rounded-lg md:rounded-xl border border-gray-300 px-3 md:px-4 py-2 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Maharashtra"
                required
                value={billing.state}
                onChange={(e) => setBilling({ ...billing, state: e.target.value })}
                className="w-full rounded-lg md:rounded-xl border border-gray-300 px-3 md:px-4 py-2 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PIN Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="e.g. 400001"
                required
                value={billing.pin}
                onChange={(e) => setBilling({ ...billing, pin: e.target.value.replace(/\D/g, '') })}
                className="w-full rounded-lg md:rounded-xl border border-gray-300 px-3 md:px-4 py-2 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Landmark */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Landmark <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Near HDFC Bank, Opposite Metro Station"
              value={billing.landmark || ""}
              onChange={(e) => setBilling({ ...billing, landmark: e.target.value })}
              className="w-full rounded-lg md:rounded-xl border border-gray-300 px-3 md:px-4 py-2 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Alternate phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alternate Mobile Number <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={billing.altPhone || ""}
              onChange={(e) => setBilling({ ...billing, altPhone: e.target.value })}
              className="w-full rounded-lg md:rounded-xl border border-gray-300 px-3 md:px-4 py-2 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email (optional, before order notes) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={billing.email}
              onChange={(e) => setBilling({ ...billing, email: e.target.value })}
              className="w-full rounded-lg md:rounded-xl border border-gray-300 px-3 md:px-4 py-2 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Order Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order Notes <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <textarea
              placeholder="Any delivery instructions — e.g. call before delivery, leave with security guard"
              value={billing.notes || ""}
              onChange={(e) => setBilling({ ...billing, notes: e.target.value })}
              className="w-full rounded-lg md:rounded-xl border border-gray-300 px-3 md:px-4 py-2 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              rows="3"
            />
          </div>

        </form>

        {/* Order Summary Sidebar */}
        <aside className="space-y-4 md:space-y-6 h-fit">
          {/* Order Items */}
          <div className="rounded-2xl md:rounded-3xl border border-gray-200 bg-white p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.slug} className="flex items-start justify-between gap-3 pb-3 border-b border-gray-200 last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 line-clamp-2">{item.title}</p>
                    <p className="text-xs text-gray-600 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-semibold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                    <p className="text-xs text-gray-600">
                      ₹{item.price.toLocaleString('en-IN')} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="rounded-2xl md:rounded-3xl border border-gray-200 bg-white p-4 md:p-6 space-y-3 md:space-y-4">
            <div className="flex justify-between text-sm text-gray-700">
              <span>Subtotal</span>
              <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Shipping</span>
              <span className="font-medium text-green-600">FREE</span>
            </div>
            <div className="pt-3 border-t border-gray-200 flex justify-between text-base md:text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="rounded-2xl md:rounded-3xl border border-gray-200 bg-white p-4 md:p-6">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Payment Methods</h3>

            {/* COD — selected */}
            <div className="flex items-center gap-3 rounded-xl border-2 border-green-500 bg-green-50 p-3">
              <span className="w-5 h-5 rounded-full border-2 border-green-600 flex items-center justify-center shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-green-600" />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-green-700">Cash on Delivery (COD)</p>
                <p className="text-xs text-green-600">Pay in cash when your order arrives</p>
              </div>
              <span className="text-[10px] font-bold uppercase text-green-600 bg-green-100 rounded px-2 py-0.5 shrink-0">Selected</span>
            </div>

            {/* Other payment modes — disabled */}
            <div className="mt-2 space-y-2">
              {[
                { name: 'UPI', sub: 'Google Pay, PhonePe, Paytm' },
                { name: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay' },
                { name: 'Net Banking', sub: 'All major banks' },
              ].map((method) => (
                <div key={method.name} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 opacity-55 cursor-not-allowed">
                  <span className="w-5 h-5 rounded-full border-2 border-gray-300 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 line-through">{method.name}</p>
                    <p className="text-xs text-gray-400">{method.sub}</p>
                  </div>
                  <span className="text-[10px] font-semibold uppercase text-gray-400 bg-gray-200 rounded px-2 py-0.5 shrink-0">Unavailable</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Place Order — after the order summary */}
      <div className="max-w-lg mx-auto">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full px-4 md:px-6 py-3 md:py-4 font-bold text-white rounded-lg text-sm md:text-base transition-all duration-300 mt-4 ${
            isFormValid()
              ? 'btn-primary hover:shadow-lg'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {loading ? 'Processing...' : 'PLACE ORDER'}
        </button>
        <p className="text-xs text-gray-600 text-center mt-3">
          By placing an order, you agree to our terms and conditions
        </p>
      </div>

      {/* Placing-order modal — truck animation + ad */}
      {placingOrder && (
        <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center space-y-5">
            <div className="w-16 h-16 mx-auto relative">
              <svg className="w-16 h-16 text-green-600 truck-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 3h15v13H1z" />
                <path d="M16 8h4l3 3v5h-7z" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              {/* Fill sweeps 0% -> 100% linearly over the 10s order hold */}
              <div className="h-full bg-green-600 rounded-full origin-left order-progress-fill" />
            </div>
            <p className="text-sm font-semibold text-gray-900">Placing your order...</p>
            <p className="text-xs text-gray-500">Your package is being prepared for delivery 🚚</p>

            {/* Animated delivery dots */}
            <div className="flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '0.15s' }} />
              <span className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '0.3s' }} />
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-sm text-center space-y-4 animate-in">
            <svg className="w-16 h-16 md:w-20 md:h-20 mx-auto text-green-600 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">Order Placed!</h3>
              <p className="text-sm text-gray-600 mt-2">
                Your order has been confirmed. Redirecting to order details...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
