import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-gray-900 mb-2">Contact Us</h1>
      <div className="w-16 h-1 bg-[#c8a96e] mb-8"></div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <p className="text-gray-600 text-sm leading-relaxed">
            We're here to help! Reach out to us and we'll respond within 24 hours.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">📍</span>
              <div>
                <p className="font-semibold text-sm text-gray-900">Address</p>
                <p className="text-sm text-gray-600">199, Kashi Textile Market, Opp. STM,<br />Ring Road, Surat, Gujarat-395002</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">📧</span>
              <div>
                <p className="font-semibold text-sm text-gray-900">Email</p>
                <a href="mailto:support@bebs.com" className="text-sm text-gray-600 underline hover:text-gray-900">support@bebs.com</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">📞</span>
              <div>
                <p className="font-semibold text-sm text-gray-900">Phone</p>
                <a href="tel:+917984158999" className="text-sm text-gray-600 underline hover:text-gray-900">+91-7984158999</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5">🕐</span>
              <div>
                <p className="font-semibold text-sm text-gray-900">Response Time</p>
                <p className="text-sm text-gray-600">Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          {sent ? (
            <div className="border border-green-200 bg-green-50 rounded p-6 text-center space-y-2">
              <p className="text-2xl">✅</p>
              <p className="font-semibold text-gray-900">Message Sent!</p>
              <p className="text-sm text-gray-600">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">Name *</label>
                <input
                  type="text" required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">Email *</label>
                <input
                  type="email" required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1 uppercase tracking-wide">Message *</label>
                <textarea
                  required rows={4}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500 resize-none"
                  placeholder="How can we help you?"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 rounded text-sm font-semibold hover:bg-gray-700 transition-colors uppercase tracking-wide"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200">
        <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">← Back to Home</Link>
      </div>
    </div>
  )
}
