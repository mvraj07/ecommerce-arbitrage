import React from 'react'
import { Link } from 'react-router-dom'

export default function PolicyLayout({ title, children }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-gray-900 mb-2">{title}</h1>
      <div className="w-16 h-1 bg-[#c8a96e] mb-8"></div>
      <div className="space-y-4 text-gray-700">
        {children}
      </div>
      <div className="mt-10 pt-6 border-t border-gray-200">
        <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">← Back to Home</Link>
      </div>
    </div>
  )
}
