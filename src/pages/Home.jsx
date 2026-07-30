import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid'
import products from '../data/products.json'
import { parentCategories, categories } from '../data/categories'

// Component to display hierarchical categories with mobile responsiveness
function CategorySection({ parent, isOpen, onToggle }) {
  return (
    <div className="border-t border-gray-200 last:border-b">
      {/* Parent Category Header - clickable on mobile, always expanded on desktop */}
      <button
        onClick={() => onToggle(parent.id)}
        className="w-full flex items-center justify-between gap-4 py-4 px-4 md:px-6 hover:bg-gray-50 transition-colors md:cursor-default"
      >
        <div className="flex-1 text-left">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-2xl">{parent.icon}</span>
            <h3 className="text-xl font-semibold text-gray-900">{parent.title}</h3>
          </div>
          <p className="text-sm text-gray-600 hidden md:block">{parent.description}</p>
        </div>
        {/* Chevron icon - visible only on mobile */}
        <svg
          className={`w-6 h-6 text-gray-600 md:hidden transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {/* Subcategories Grid - hidden on mobile by default, always visible on desktop */}
      <div
        className={`overflow-hidden transition-all duration-300 md:block ${
          isOpen ? 'max-h-96' : 'max-h-0 md:max-h-screen'
        }`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 px-4 py-4 md:py-6 bg-gray-50">
          {parent.subcategories.map(subcategory => (
            <Link
              key={subcategory.slug}
              to={`/product-category/${subcategory.slug}`}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="overflow-hidden bg-gray-100 h-40 md:h-48">
                <img
                  src={subcategory.heroImage}
                  alt={subcategory.title}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-3 text-center">
                <h4 className="text-sm md:text-base font-semibold text-gray-900">{subcategory.title}</h4>
                <p className="text-xs text-gray-600 mt-1 line-clamp-1">{subcategory.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  // State to manage which parent category is expanded on mobile
  const [expandedCategory, setExpandedCategory] = useState('women')

  const arrivals = products.slice(0, 4)
  const trending = products.slice(4, 8)

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  return (
    <div className="space-y-12 md:space-y-20">
      {/* Hero Section with responsive grid */}
      <section className="grid gap-6 md:gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div className="space-y-4 md:space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full border border-green-300 bg-green-50 px-4 py-2 text-xs md:text-sm text-green-700">
            New Arrival
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight tracking-tight">
            New Arrival<br />Limited Edition
          </h1>
          <p className="text-sm md:text-base max-w-xl text-gray-700">
            Discover elegant sarees, lehengas, kurtas, and premium men's fashion.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="#arrivals" className="btn-primary px-4 md:px-6 py-2 md:py-3 text-sm md:text-base text-center">
              Shop Now
            </Link>
            <Link to="#trending" className="px-4 md:px-6 py-2 md:py-3 rounded-md border border-gray-300 text-sm md:text-base text-gray-700 text-center hover:bg-gray-50 transition-colors">
              Explore Trending
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl bg-gray-100 h-64 md:h-80 lg:h-auto">
          <img
            src="https://images.pexels.com/photos/15359601/pexels-photo-15359601.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="New Arrivals"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Categories Section - Hierarchical with Men and Women */}
      <section id="categories" className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl md:text-3xl font-serif">Shop by Category</h2>
          <p className="text-xs md:text-sm text-gray-600 ml-auto hidden sm:block">
            Tap to expand on mobile • Hover for preview
          </p>
        </div>

        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
          {/* Women's Category */}
          <CategorySection
            parent={parentCategories[0]}
            isOpen={expandedCategory === 'women'}
            onToggle={toggleCategory}
          />

          {/* Men's Category */}
          <CategorySection
            parent={parentCategories[1]}
            isOpen={expandedCategory === 'men'}
            onToggle={toggleCategory}
          />
        </div>

        <p className="text-xs text-gray-500 text-center">
          💡 Tip: Click on categories to explore all products in each subcategory
        </p>
      </section>

      {/* New Arrivals Section */}
      <section id="arrivals" className="space-y-4 md:space-y-6">
        <h2 className="text-2xl md:text-3xl font-serif">Just: New Arrival</h2>
        <div className="grid gap-3 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {arrivals.map(a => (
            <Link
              key={a.id}
              to={`/product/${a.slug}`}
              className="group overflow-hidden rounded-2xl md:rounded-3xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="overflow-hidden bg-gray-100 h-40 md:h-60 lg:h-80">
                <img
                  src={a.images[0]}
                  alt={a.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 md:p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">{a.category}</p>
                <h3 className="text-sm md:text-lg font-semibold text-gray-900 line-clamp-2">{a.title}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-green-700 font-semibold text-sm md:text-base">₹{a.price}</span>
                  {a.compare_at_price && (
                    <span className="text-xs text-gray-500 line-through">₹{a.compare_at_price}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products Section */}
      <section id="trending" className="space-y-4 md:space-y-6">
        <h2 className="text-2xl md:text-3xl font-serif">Trending Products</h2>
        <ProductGrid products={trending} />
      </section>
    </div>
  )
}
