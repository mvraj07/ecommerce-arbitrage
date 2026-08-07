import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import products from '../data/products.json'
import ProductCard from '../components/ProductCard'

// Dedicated "Best Selling" page — lists every top-selling product
export default function BestSellingPage() {
  const [sort, setSort] = useState('featured')

  const bestSelling = useMemo(() => {
    const list = products.filter(p => p.category === 'top-selling')
    switch (sort) {
      case 'price-low':
        return [...list].sort((a, b) => a.price - b.price)
      case 'price-high':
        return [...list].sort((a, b) => b.price - a.price)
      case 'discount':
        return [...list].sort((a, b) => {
          const da = a.compare_at_price ? (a.compare_at_price - a.price) / a.compare_at_price : 0
          const db = b.compare_at_price ? (b.compare_at_price - b.price) / b.compare_at_price : 0
          return db - da
        })
      default:
        return list
    }
  }, [sort])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {/* Page header */}
      <div className="text-center">
        <span className="inline-block bg-red-50 text-red-600 border border-red-200 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest">
          Hot Right Now
        </span>
        <h1 className="mt-3 text-2xl md:text-4xl font-bold uppercase tracking-wide text-gray-900">Best Selling</h1>
        <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
          Our most loved products — up to 90% off, handpicked by thousands of happy customers.
        </p>
        <div className="w-16 h-1 bg-[#c8a96e] mx-auto mt-4"></div>
      </div>

      {/* Sort + count */}
      <div className="mt-8 flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-gray-500">
          <span className="font-bold text-gray-900">{bestSelling.length}</span> products
        </p>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="featured">Sort: Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="discount">Discount: High to Low</option>
        </select>
      </div>

      {/* Products grid */}
      <div className="mt-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {bestSelling.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* Back link */}
      <div className="mt-10 text-center">
        <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 underline underline-offset-2">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
