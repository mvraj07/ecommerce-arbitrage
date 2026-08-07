import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      {/* Main footer columns */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Our Menu */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Our Menu</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/product-category/saree" className="hover:text-white transition-colors">Saree</Link></li>
            <li><Link to="/product-category/salwar-suit" className="hover:text-white transition-colors">Salwar Suit</Link></li>
            <li><Link to="/product-category/lehenga-choli" className="hover:text-white transition-colors">Lehenga Choli</Link></li>
            <li><Link to="/product-category/western-wear" className="hover:text-white transition-colors">Western Wear</Link></li>
            <li><Link to="/product-category/top-selling" className="hover:text-white transition-colors">Top Selling</Link></li>
          </ul>
        </div>

        {/* Our Policies */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Our Policies</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link to="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link></li>
          </ul>
        </div>

        {/* Our Support */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Our Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link to="/orders" className="hover:text-white transition-colors">My Orders</Link></li>
            <li><Link to="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-white transition-colors">Track Order</Link></li>
            <li><Link to="/refund-policy" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
          </ul>
        </div>

        {/* Payment Methods */}
        <div>
          <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Payment Methods</h4>
          <p className="text-sm mb-3">We accept all major payment methods</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {["UPI", "Card", "COD", "Net Banking"].map((method) => (
              <span key={method} className="bg-gray-700 text-gray-200 text-xs px-2.5 py-1 rounded">
                {method}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20v-7.21H5.5V9.25h2.79V7.31c0-2.87 1.77-4.43 4.31-4.43 1.23 0 2.28.09 2.59.13v3h-1.77c-1.39 0-1.66.66-1.66 1.63v2.14h3.32l-.43 3.54h-2.89V20h-2.81z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.646.069 4.85 0 3.204-.012 3.584-.07 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.257 0-3.667.012-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.06 1.281-.073 1.689-.073 4.948 0 3.259.013 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.06 1.69.072 4.948.072 3.259 0 3.668-.012 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.06-1.28.073-1.689.073-4.948 0-3.259-.013-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.06-1.69-.072-4.949-.072zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar — no "Powered by Shopify" */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© 2026 Bebs. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms-of-service" className="hover:text-gray-300 transition-colors">Terms</Link>
            <span>·</span>
            <Link to="/shipping-policy" className="hover:text-gray-300 transition-colors">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
