import React, { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { categories } from '../data/categories'
import products from '../data/products.json'
import ProductGrid from '../components/ProductGrid'

function FilterSidebar({ search, setSearch, minPrice, setMinPrice, maxPrice, setMaxPrice, onClose, isOpen }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl transform transition-transform duration-300 md:sticky md:top-[100px] md:self-start md:inset-auto md:w-64 md:shadow-none md:transform-none md:z-auto md:max-h-[calc(100vh-100px)] md:overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-5 space-y-5">
          {/* Close button mobile */}
          <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Search */}
          <div className="border border-gray-200 rounded p-4 space-y-2">
            <h3 className="font-semibold text-sm text-gray-900 uppercase tracking-wide">Search</h3>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-400"
              placeholder="Search products..."
            />
          </div>

          {/* Price Filter */}
          <div className="border border-gray-200 rounded p-4 space-y-3">
            <h3 className="font-semibold text-sm text-gray-900 uppercase tracking-wide">Price Range</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Min (₹)</label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={e => setMinPrice(Number(e.target.value) || 0)}
                  className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-gray-400"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Max (₹)</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value) || 100000)}
                  className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-gray-400"
                  placeholder="100000"
                />
              </div>
            </div>
            <button
              onClick={() => { setMinPrice(0); setMaxPrice(100000); }}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Reset price
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default function CategoryPage() {
  const { slug } = useParams()
  const [search, setSearch] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(100000)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // "top-selling" shows all products; otherwise filter by category slug
  const isTopSelling = slug === 'top-selling'
  const category = isTopSelling
    ? { title: 'Top Selling', description: 'Our most popular products across all categories' }
    : categories.find(c => c.slug === slug)

  const categoryProducts = useMemo(() =>
    isTopSelling ? products : products.filter(p => p.category === slug),
    [slug, isTopSelling]
  )

  const filtered = categoryProducts.filter(
    p => p.title.toLowerCase().includes(search.toLowerCase())
      && p.price >= minPrice
      && p.price <= maxPrice
  )

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Category not found</h1>
        <p className="text-gray-500">The category you're looking for doesn't exist.</p>
        <Link to="/" className="inline-block bg-gray-900 text-white px-6 py-2.5 rounded text-sm font-medium hover:bg-gray-700 transition-colors">
          Back to Home
        </Link>
      </div>
    )
  }

  const hasFilters = minPrice > 0 || maxPrice < 100000 || search

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">

      {/* Category hero image (desktop) */}
      {!isTopSelling && category.heroImage && (
        <div className="hidden md:block w-full aspect-[21/9] rounded overflow-hidden mb-6 bg-gray-100">
          <img
            src={category.heroImage}
            alt={category.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}

      {/* Page title + mobile filter btn */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-gray-900">
            {category.title}
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden flex items-center gap-2 border border-gray-300 rounded px-3 py-2 text-sm text-gray-700"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter
        </button>
      </div>

      <div className="flex gap-6 md:gap-8">
        {/* Sidebar */}
        <FilterSidebar
          search={search} setSearch={setSearch}
          minPrice={minPrice} setMinPrice={setMinPrice}
          maxPrice={maxPrice} setMaxPrice={setMaxPrice}
          onClose={() => setSidebarOpen(false)}
          isOpen={sidebarOpen}
        />

        {/* Products */}
        <main className="flex-1 min-w-0">
          {hasFilters && (
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500">Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
              <button
                onClick={() => { setSearch(''); setMinPrice(0); setMaxPrice(100000); }}
                className="text-xs text-gray-600 underline hover:text-gray-900"
              >
                Clear filters
              </button>
            </div>
          )}

          {filtered.length > 0 ? (
            <ProductGrid products={filtered} />
          ) : (
            <div className="border border-gray-200 rounded p-12 text-center space-y-3">
              <p className="text-gray-400 text-4xl">🔍</p>
              <h3 className="font-semibold text-gray-900">No products found</h3>
              <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
              <button
                onClick={() => { setSearch(''); setMinPrice(0); setMaxPrice(100000); }}
                className="inline-block bg-gray-900 text-white px-5 py-2 rounded text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
