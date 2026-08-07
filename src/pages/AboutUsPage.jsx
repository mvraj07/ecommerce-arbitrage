import React from 'react'
import { Link } from 'react-router-dom'

export default function AboutUsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-gray-900 mb-2">About Us</h1>
      <div className="w-16 h-1 bg-[#c8a96e] mb-8"></div>

      {/* Hero image */}
      <div className="w-full rounded overflow-hidden mb-8 bg-gray-100 h-56 md:h-72">
        <img
          src="https://khedutmahiti.com/cdn/shop/files/bennar.jpg?v=1719409417&width=1200"
          alt="Bebs - Premium Fashion"
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="space-y-6 text-gray-700">
        <p className="text-lg font-medium text-gray-900">
          One Of The Leading Brands In Women's Ethnic Wear Available Online.
        </p>
        <p>
          Bebs is a women's ethnic wear brand focused on quality and customer satisfaction. We believe in continuous improvement in products and services, with a personalized approach tailored to individual customer needs, balancing value, quality, and delivery.
        </p>
        <p>
          We serve as a go-to destination for Indian ethnic fashion, aiming to serve customers worldwide by providing the latest and the best in Indian ethnic wear through our online platform.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
          {[
            {
              label: 'Sarees',
              icon: (
                <svg className="w-9 h-9 mx-auto text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  {/* Draped saree: broad pleat flowing down */}
                  <path d="M7 3l5 2 5-2" />
                  <path d="M12 5v3" />
                  <path d="M5 5c1 3 3 5 7 5s6-2 7-5" />
                  <path d="M6 5l-3 7 4 2 1-4" />
                  <path d="M18 5l3 7-4 2-1-4" />
                  <path d="M9 12c.5 3 1.5 5 3 8" />
                  <path d="M15 12c-.5 3-1.5 5-3 8" />
                  <path d="M12 20c2 1 5 1.5 7 1" />
                </svg>
              ),
            },
            {
              label: 'Salwar Suits',
              icon: (
                <svg className="w-9 h-9 mx-auto text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  {/* Kurta / salwar kameez: top + flowing bottoms */}
                  <path d="M8 3h8v4c0 2-1 3-4 3s-4-1-4-3V3z" />
                  <path d="M8 3L5 6v4l3 1" />
                  <path d="M16 3l3 3v4l-3 1" />
                  <path d="M12 10v4" />
                  <path d="M8 14c.5 4 1.5 6 2 8" />
                  <path d="M16 14c-.5 4-1.5 6-2 8" />
                  <path d="M10 22c1-.7 2-1 2-1s1 .3 2 1" />
                </svg>
              ),
            },
            {
              label: 'Lehenga Choli',
              icon: (
                <svg className="w-9 h-9 mx-auto text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  {/* Full-flare lehenga skirt */}
                  <path d="M8 5c-1 1-2 2.5-2 4 0 2 2 3.5 6 3.5s6-1.5 6-3.5c0-1.5-1-3-2-4" />
                  <path d="M9.5 5c-.5 2.5.5 4.5 2.5 5" />
                  <path d="M14.5 5c.5 2.5-.5 4.5-2.5 5" />
                  <path d="M4 13c1 4 3.5 6 8 7s7-3 8-7c-3 1-5.5 2.5-8 2.5S7 14 4 13z" />
                  <path d="M12 20v-6" />
                  <path d="M9 7l-1 2" />
                  <path d="M15 7l1 2" />
                </svg>
              ),
            },
            {
              label: 'Western Wear',
              icon: (
                <svg className="w-9 h-9 mx-auto text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                  {/* Top / blouse */}
                  <path d="M9 3c0 2-1.5 3-3 3l-2 3 2 1 1-1v12h10V9l1 1 2-1-2-3c-1.5 0-3-1-3-3H9z" />
                  <path d="M9 3c0 1.5 1 3 3 3s3-1.5 3-3" />
                  <path d="M12 6v6" />
                </svg>
              ),
            },
          ].map(item => (
            <div key={item.label} className="border border-gray-200 rounded p-4 text-center">
              <div className="mb-2">{item.icon}</div>
              <p className="text-sm font-medium text-gray-900">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded p-6 space-y-2">
          <h3 className="font-semibold text-gray-900">Get In Touch</h3>
          <p className="text-sm">📧 <a href="mailto:support@bebs.com" className="underline hover:text-gray-900">support@bebs.com</a></p>
          <p className="text-sm">📞 <a href="tel:+917984158999" className="underline hover:text-gray-900">+91-7984158999</a></p>
          <p className="text-sm">📍 199, Kashi Textile Market, Ring Road, Surat, Gujarat-395002</p>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-gray-200">
        <Link to="/" className="text-sm text-gray-500 hover:text-gray-900">← Back to Home</Link>
      </div>
    </div>
  )
}
