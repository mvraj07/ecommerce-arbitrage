import React, { useState, useEffect } from "react";
import { getCart, clearCart } from "../lib/cart";
import { useNavigate, Link } from "react-router-dom";

// Mobile-responsive checkout page with form validation
export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  // Form validation
  const isFormValid = () => {
    return (
      billing.firstName.trim() &&
      billing.lastName.trim() &&
      billing.email.trim() &&
      billing.phone.trim() &&
      billing.address.trim() &&
      billing.city.trim() &&
      billing.state.trim() &&
      billing.pin.trim()
    );
  };

  // Handle form submission
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

      // Clear cart after order placement
      clearCart();
      setLoading(false);
      setShowSuccessModal(true);

      // Navigate to order confirmation after 2 seconds
      setTimeout(() => {
        navigate(`/order/${orderId}`);
      }, 2000);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Error placing order. Please try again.');
      setLoading(false);
    }
  };

  if (cart.length === 0 && !showSuccessModal) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif">Checkout</h1>
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
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Billing Details</h2>

          {/* Name Fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="John"
                required
                value={billing.firstName}
                onChange={(e) => setBilling({ ...billing, firstName: e.target.value })}
                className="w-full rounded-lg md:rounded-xl border border-gray-300 px-3 md:px-4 py-2 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Doe"
                required
                value={billing.lastName}
                onChange={(e) => setBilling({ ...billing, lastName: e.target.value })}
                className="w-full rounded-lg md:rounded-xl border border-gray-300 px-3 md:px-4 py-2 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Email and Phone */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                required
                value={billing.email}
                onChange={(e) => setBilling({ ...billing, email: e.target.value })}
                className="w-full rounded-lg md:rounded-xl border border-gray-300 px-3 md:px-4 py-2 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="+91 XXXXX XXXXX"
                required
                value={billing.phone}
                onChange={(e) => setBilling({ ...billing, phone: e.target.value })}
                className="w-full rounded-lg md:rounded-xl border border-gray-300 px-3 md:px-4 py-2 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="123 Main Street"
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
                placeholder="New York"
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
                placeholder="NY"
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
                placeholder="10001"
                required
                value={billing.pin}
                onChange={(e) => setBilling({ ...billing, pin: e.target.value })}
                className="w-full rounded-lg md:rounded-xl border border-gray-300 px-3 md:px-4 py-2 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Order Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order Notes <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <textarea
              placeholder="Special instructions for delivery..."
              value={billing.notes || ""}
              onChange={(e) => setBilling({ ...billing, notes: e.target.value })}
              className="w-full rounded-lg md:rounded-xl border border-gray-300 px-3 md:px-4 py-2 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              rows="3"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !isFormValid()}
            className={`w-full px-4 md:px-6 py-3 md:py-4 font-bold text-white rounded-lg text-sm md:text-base transition-all duration-300 mt-6 ${
              isFormValid()
                ? 'btn-primary hover:shadow-lg'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            {loading ? 'Processing...' : 'PLACE ORDER'}
          </button>

          <p className="text-xs text-gray-600 text-center mt-4">
            By placing an order, you agree to our terms and conditions
          </p>
        </form>

        {/* Order Summary Sidebar */}
        <aside className="space-y-4 md:space-y-6 h-fit">
          {/* Order Items */}
          <div className="rounded-2xl md:rounded-3xl border border-gray-200 bg-white p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-3 pb-3 border-b border-gray-200 last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 line-clamp-2">{item.title}</p>
                    <p className="text-xs text-gray-600 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right whitespace-nowrap">
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

          {/* Payment Info */}
          <div className="rounded-2xl md:rounded-3xl border border-gray-200 bg-white p-4 md:p-6">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Payment Methods</h3>
            <ul className="space-y-2 text-xs md:text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span> Cash on Delivery (COD)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span> Bank Transfer
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">✓</span> Secure Payment Gateway
              </li>
            </ul>
          </div>
        </aside>
      </div>

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
