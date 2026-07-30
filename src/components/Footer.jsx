import React from 'react'
import { Link } from 'react-router-dom'

// Mobile-responsive footer component with navigation and info
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 md:py-12 mt-12 md:mt-16">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand & About */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold mb-4">Tech Besb</h3>
            <p className="text-sm text-gray-400 mb-4">
              Your destination for premium fashion & lifestyle products.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20v-7.21H5.5V9.25h2.79V7.31c0-2.87 1.77-4.43 4.31-4.43 1.23 0 2.28.09 2.59.13v3h-1.77c-1.39 0-1.66.66-1.66 1.63v2.14h3.32l-.43 3.54h-2.89V20h-2.81z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.646.069 4.85 0 3.204-.012 3.584-.07 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.257 0-3.667.012-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.06 1.281-.073 1.689-.073 4.948 0 3.259.013 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.06 1.69.072 4.948.072 3.259 0 3.668-.012 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.06-1.28.073-1.689.073-4.948 0-3.259-.013-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.06-1.69-.072-4.949-.072zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/product-category/saree" className="hover:text-white transition-colors">Saree</Link></li>
              <li><Link to="/product-category/kurta" className="hover:text-white transition-colors">Kurta</Link></li>
              <li><Link to="/product-category/lehenga" className="hover:text-white transition-colors">Lehenga</Link></li>
              <li><Link to="/product-category/ethnic-dress" className="hover:text-white transition-colors">Ethnic Wear</Link></li>
            </ul>
          </div>

          {/* Men's */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Men's Fashion</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/product-category/jackets" className="hover:text-white transition-colors">Jackets</Link></li>
              <li><Link to="/product-category/shirts" className="hover:text-white transition-colors">Shirts</Link></li>
              <li><Link to="/product-category/tshirts" className="hover:text-white transition-colors">T-Shirts</Link></li>
              <li><Link to="/product-category/pants" className="hover:text-white transition-colors">Pants</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold mb-3 text-sm">Customer Care</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-400">
          <p>&copy; 2024 Tech Besb. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
