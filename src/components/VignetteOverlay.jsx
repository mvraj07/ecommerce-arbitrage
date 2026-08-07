import React, { useEffect, useState } from 'react'
import { adEvents } from '../engine/adOrchestrator'

/**
 * VignetteOverlay — DEMO-ONLY full-screen mock ad overlay.
 *
 * Listens for the orchestrator's "vignette" event and shows a full-screen,
 * clearly-labeled placeholder that the user must dismiss. Demonstrates the
 * interceptor pattern without loading any real ad network.
 */
export default function VignetteOverlay() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const show = () => setOpen(true)
    window.addEventListener(adEvents.vignette, show)
    return () => window.removeEventListener(adEvents.vignette, show)
  }, [])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Mock ad header */}
        <div className="bg-gray-900 text-white px-4 py-2 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-gray-400">Ad</span>
          <button
            onClick={() => setOpen(false)}
            className="text-white text-lg leading-none px-2 py-1 rounded hover:bg-white/10"
            aria-label="Close ad"
          >
            ✕
          </button>
        </div>
        <div className="p-8 text-center">
          <p className="text-sm font-bold text-gray-800">[ Full-Screen Vignette Ad — Demo ]</p>
          <p className="text-xs text-gray-500 mt-2">
            In production this would load a real Monetag/Adsterra vignette.
            This prototype shows the interceptor pattern only.
          </p>
          <button
            onClick={() => setOpen(false)}
            className="mt-6 bg-gray-900 text-white px-6 py-2.5 rounded text-sm font-semibold hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
