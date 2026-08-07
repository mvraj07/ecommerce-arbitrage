import React from 'react'

/**
 * SocialBar — DEMO-ONLY floating chat-style ad widget (Adsterra social bar).
 * A small button that bounces in the corner and opens a mock ad card.
 * No real ad network loads.
 */
export default function SocialBar() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 right-3 z-[100] w-12 h-12 rounded-full bg-gray-900 text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        aria-label="Chat"
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.4-4 8-9 8-1 0-2-.1-2.8-.3L4 21l1.5-3.5C3.9 16 3 14 3 12c0-4.4 4-8 9-8s9 3.6 9 8z" />
          </svg>
        )}
      </button>

      {/* Mock ad card */}
      {open && (
        <div className="fixed bottom-32 right-3 z-[100] w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-100 px-3 py-2 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-gray-500">Ad · Social Bar</span>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700 text-sm leading-none" aria-label="Close">✕</button>
          </div>
          <div className="p-4 text-center">
            <p className="text-xs font-semibold text-gray-800">[ Chat-Style Ad — Demo ]</p>
            <p className="text-[11px] text-gray-500 mt-1">Looks like a support chat, it's an ad.</p>
          </div>
        </div>
      )}
    </>
  )
}
