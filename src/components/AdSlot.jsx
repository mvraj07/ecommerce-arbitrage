import React, { useEffect, useState } from 'react'

const SIZES = {
  'banner-300x250': { h: 250, label: 'Banner 300×250' },
  'anchor-320x50': { h: 50, label: 'Anchor 320×50' },
  'social-bar': { h: 60, label: 'Social Bar' },
  'in-page-push': { h: 100, label: 'In-Page Push' },
}

/**
 * AdSlot — DEMO-ONLY mock ad placeholder.
 *
 * Renders an "ADVERTISEMENT" label and a clearly-fake ad box. Used in the
 * cyber-fraud prototype to demonstrate where and how ads are injected. It
 * intentionally loads NO real ad network — real Monetag/Adsterra tags are NOT
 * included in this prototype.
 *
 * delayedShift: expands the box height after 1.2s to simulate the deceptive
 * CLS pattern (highlighted in the seminar as the accidental-click trick).
 */
export default function AdSlot({ type = 'banner-300x250', delayedShift = false, className = '' }) {
  const [grown, setGrown] = useState(delayedShift ? false : true)
  const size = SIZES[type] || SIZES['banner-300x250']

  useEffect(() => {
    if (!delayedShift) return
    const t = setTimeout(() => setGrown(true), 1200)
    return () => clearTimeout(t)
  }, [delayedShift])

  return (
    <div className={`w-full ${className}`}>
      <p className="text-[10px] text-gray-400 text-center mb-1">ADVERTISEMENT</p>
      <div
        className="mx-auto border border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden transition-all duration-700 ease-in-out"
        style={{ width: '100%', maxWidth: '100%', height: grown ? size.h : 32 }}
      >
        <div className="text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">[ Demo Ad Slot ]</p>
          <p className="text-[11px] text-gray-300 mt-0.5">{size.label} · no real ad loads</p>
        </div>
      </div>
    </div>
  )
}
