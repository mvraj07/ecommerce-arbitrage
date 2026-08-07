import React, { useEffect, useState } from 'react'
import { adEvents } from '../engine/adOrchestrator'

/**
 * PopunderOverlay — DEMO-ONLY mock popunder.
 * Real popunders open a new tab behind the current one; in this prototype we
 * render a small "popunder triggered" toast instead of opening anything.
 */
export default function PopunderOverlay() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const onPopunder = () => setCount(c => c + 1)
    window.addEventListener(adEvents.popunder, onPopunder)
    return () => window.removeEventListener(adEvents.popunder, onPopunder)
  }, [])

  // Auto-hide the toast after 3s
  useEffect(() => {
    if (count === 0) return
    const t = setTimeout(() => setCount(0), 3000)
    return () => clearTimeout(t)
  }, [count])

  if (count === 0) return null

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white text-xs px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2">
      <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.4-1.4A8 8 0 1021 11H5m10 6l-5 5 5-5" />
      </svg>
      <span>Demo: popunder triggered (60s cooldown active)</span>
    </div>
  )
}
