import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import CategoryPage from './pages/CategoryPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App(){
  return (
    <div className="min-h-screen bg-[#fbf9f6] text-gray-900">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/product-category/:slug" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
