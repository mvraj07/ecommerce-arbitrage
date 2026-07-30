import React, { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { categories } from '../data/categories'
import products from '../data/products.json'
import ProductGrid from '../components/ProductGrid'

// Mobile-responsive sidebar that collapses on small screens
function FilterSidebar({ search, setSearch, minPrice, setMinPrice, maxPrice, setMaxPrice, onClose, isOpen }) {
  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - slides in on mobile, fixed on desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white transform transition-transform duration-300 md:relative md:inset-auto md:w-auto md:transform-none md:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-4 md:p-0 space-y-6 md:space-y-6">
          {/* Close button on mobile */}
          <button
            onClick={onClose}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Search Box */}
          <div className="rounded-2xl md:rounded-3xl border border-gray-200 bg-white p-4 md:p-6">
            <h3 className="font-semibold text-sm md:text-base">Search products</h3>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="mt-3 w-full rounded-lg md:rounded-xl border border-gray-200 px-3 md:px-4 py-2 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search products..."
            />
          </div>

          {/* Price Filter */}
          <div className="rounded-2xl md:rounded-3xl border border-gray-200 bg-white p-4 md:p-6">
            <h3 className="font-semibold text-sm md:text-base">Filter by price</h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-600">Min Price</label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={e => setMinPrice(Number(e.target.value) || 0)}
                  className="w-full rounded-lg md:rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Min"
                />
              </div>
              <div>
                <label className="text-xs text-gray-600">Max Price</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value) || 100000)}
                  className="w-full rounded-lg md:rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Max"
                />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default function CategoryPage() {
  const { slug } = useParams()
  const category = categories.find(c => c.slug === slug)
  const [search, setSearch] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(100000)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const categoryProducts = useMemo(() => products.filter(p => p.category === slug), [slug])
  const filtered = categoryProducts.filter(
    p => p.title.toLowerCase().includes(search.toLowerCase()) && p.price >= minPrice && p.price <= maxPrice
  )

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl md:text-4xl font-serif">Category not found</h1>
          <p className="text-gray-600">The category you're looking for doesn't exist.</p>
          <Link to="/" className="btn-primary px-6 py-3 inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden flex items-center justify-between">
        <h1 className="text-xl font-serif">{category.title}</h1>
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter
        </button>
      </div>

      <div className="grid gap-4 md:gap-6 lg:gap-10 lg:grid-cols-[280px_1fr]">
        {/* Sidebar - collapsible on mobile, always visible on desktop */}
        <FilterSidebar
          search={search}
          setSearch={setSearch}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          onClose={() => setSidebarOpen(false)}
          isOpen={sidebarOpen}
        />

        {/* Main Content */}
        <main className="space-y-4 md:space-y-6">
          {/* Category Header - hidden on mobile due to space constraints */}
          <div className="hidden md:block rounded-2xl md:rounded-3xl border border-gray-200 bg-white p-4 md:p-6">
            <h1 className="text-3xl md:text-4xl font-serif">{category.title}</h1>
            <p className="mt-2 text-sm md:text-base text-gray-700">{category.description}</p>
          </div>

          {/* Results Count and Sorting Info */}
          <div className="flex items-center justify-between px-4 md:px-0">
            <p className="text-xs md:text-sm text-gray-600">
              Showing <span className="font-semibold">{filtered.length}</span> product{filtered.length !== 1 ? 's' : ''}
            </p>
            {minPrice > 0 || maxPrice < 100000 || search && (
              <button
                onClick={() => {
                  setSearch('')
                  setMinPrice(0)
                  setMaxPrice(100000)
                }}
                className="text-xs md:text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Products Grid */}
          {filtered.length > 0 ? (
            <ProductGrid products={filtered} />
          ) : (
            <div className="rounded-2xl md:rounded-3xl border border-gray-200 bg-white p-8 md:p-12 text-center">
              <svg className="w-16 h-16 md:w-20 md:h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.325 3.635A2.423 2.423 0 0018.477 3c-1.036 0-2.021.505-2.61 1.355l-.007.01L9.773 15.1a4.968 4.968 0 00-.92 2.607l-.052.736a.75.75 0 00.936.735l.736-.052a4.968 4.968 0 002.607-.92l10.853-5.909.009-.007c.85-.589 1.355-1.574 1.355-2.61 0-.547-.15-1.07-.476-1.521M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
              </svg>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-sm md:text-base text-gray-600 mb-4">
                Try adjusting your search or filters
              </p>
              <button
                onClick={() => {
                  setSearch('')
                  setMinPrice(0)
                  setMaxPrice(100000)
                }}
                className="btn-primary px-4 py-2 md:px-6 md:py-3 text-sm md:text-base"
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
