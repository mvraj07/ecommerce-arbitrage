import React from 'react'
import ProductCard from './ProductCard'

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
