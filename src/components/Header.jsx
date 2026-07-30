import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { categories, parentCategories } from '../data/categories'

// Component to display category dropdown menu
function CategoryDropdown({ parent, isOpen, onClose }) {
  return (
    <div className="relative">
      <button className="flex items-center gap-1 hover:text-green-700 transition-colors">
        {parent.title}
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
      
      {/* Desktop dropdown menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 hidden lg:block">
          {parent.subcategories.map(subcat => (
            <Link
              key={subcat.slug}
              to={`/product-category/${subcat.slug}`}
              onClick={onClose}
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              {subcat.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// Header shows logo + category navigation and cart button with mobile support
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartTotal, setCartTotal] = useState(0)
  const [cartCount, setCartCount] = useState(0)
  const [openDropdown, setOpenDropdown] = useState(null)

  // Update cart info from localStorage whenever cart changes
  // This ensures the header always shows current cart state across page navigations
  useEffect(() => {
    const updateCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]')
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        const count = cart.reduce((sum, item) => sum + item.quantity, 0)
        setCartTotal(total)
        setCartCount(count)
      } catch (error) {
        console.error('Error reading cart from localStorage:', error)
      }
    }

    updateCart()

    // Listen for storage changes (when another tab/window updates cart)
    window.addEventListener('storage', updateCart)
    // Listen for custom events when cart is updated in the same tab
    window.addEventListener('cartUpdated', updateCart)

    return () => {
      window.removeEventListener('storage', updateCart)
      window.removeEventListener('cartUpdated', updateCart)
    }
  }, [])

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id)
  }

  const closeMenus = () => {
    setMobileMenuOpen(false)
    setOpenDropdown(null)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 md:gap-4 px-4 py-3 md:py-4 md:flex-row md:items-center md:justify-between">
        {/* Logo and Mobile Menu Button */}
        <div className="flex items-center justify-between gap-3">
          <Link to="/" onClick={closeMenus} className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity">
            <div className="h-9 md:h-11 w-9 md:w-11 rounded-full bg-green-200 flex items-center justify-center text-green-700 font-bold text-sm md:text-base">
              TB
            </div>
            <span className="text-base md:text-lg font-semibold text-gray-900">Tech Besb</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Menu
          </button>

          {/* Desktop Cart Badge */}
          <div className="hidden md:flex items-center gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2 rounded-full border border-green-300 bg-green-50 px-3 md:px-4 py-2 text-green-700 font-medium">
              <span>₹{cartTotal.toLocaleString('en-IN')}</span>
              <span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-green-700">{cartCount}</span>
            </div>
            <Link to="/cart" className="rounded-full bg-green-600 px-3 md:px-4 py-2 text-white font-medium hover:bg-green-700 transition-colors text-sm">
              Cart
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-700">
          {parentCategories.map(parent => (
            <div key={parent.id} onMouseEnter={() => setOpenDropdown(parent.id)} onMouseLeave={() => setOpenDropdown(null)}>
              <CategoryDropdown
                parent={parent}
                isOpen={openDropdown === parent.id}
                onClose={closeMenus}
              />
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <nav className="space-y-2 px-4 py-4">
            {parentCategories.map(parent => (
              <div key={parent.id} className="space-y-2">
                {/* Parent Category */}
                <button
                  onClick={() => toggleDropdown(parent.id)}
                  className="w-full flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{parent.title}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${openDropdown === parent.id ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                {/* Subcategories - Collapsible on mobile */}
                {openDropdown === parent.id && (
                  <div className="pl-4 space-y-2 bg-gray-50 rounded-lg py-2">
                    {parent.subcategories.map(subcat => (
                      <Link
                        key={subcat.slug}
                        to={`/product-category/${subcat.slug}`}
                        onClick={closeMenus}
                        className="block py-2 px-3 text-sm text-gray-700 hover:text-green-700 hover:bg-white rounded transition-colors"
                      >
                        {subcat.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Cart Info and Button */}
          <div className="border-t border-gray-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Cart Total:</span>
              <span className="font-semibold text-green-700">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Items:</span>
              <span className="font-semibold text-green-700">{cartCount}</span>
            </div>
            <Link
              to="/cart"
              onClick={closeMenus}
              className="w-full block text-center rounded-full bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-700 transition-colors text-sm"
            >
              Go to Cart
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
