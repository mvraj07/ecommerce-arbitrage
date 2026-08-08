import React, { useEffect, useState } from "react";
import { ADSTERRA_SMARTLINK_URL } from "../lib/ads";

// Session key — the overlay appears at most once per browser session.
const DISMISS_KEY = "adsterraExitShown";

/**
 * AdExitIntent — monetizes visitors about to leave the page.
 *
 * When the pointer leaves the top of the viewport (a classic "exit intent"
 * signal) the overlay opens once per session. It invites the visitor to
 * unlock partner deals; clicking the CTA opens the Adsterra smartlink in a
 * new tab. The visitor stays on the site unless they choose to click, so it
 * never hijacks the browsing experience.
 *
 * UX / accessibility:
 *  - Disabled on touch (coarse pointer) devices — exit-intent is meaningless there.
 *  - Overlay closes on Escape, backdrop click, or the × button.
 *  - The CTA is a real <a> so it is keyboard-focusable and opens reliably.
 */
export default function AdExitIntent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Exit-intent is a desktop signal; don't wire it up on touch devices.
    if (typeof window.matchMedia !== "function") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // Show only once per browser session.
    const dismissed = (() => {
      try {
        return sessionStorage.getItem(DISMISS_KEY) === "1";
      } catch {
        return false;
      }
    })();
    if (dismissed) return;

    let shown = false;

    const handleMouseOut = (e) => {
      if (shown) return;
      const { clientY, relatedTarget } = e;
      if (relatedTarget === null && clientY <= 0) {
        shown = true;
        try {
          sessionStorage.setItem(DISMISS_KEY, "1");
        } catch {
          /* ignore */
        }
        setOpen(true);
      }
    };

    document.addEventListener("mouseout", handleMouseOut);
    return () => document.removeEventListener("mouseout", handleMouseOut);
  }, []);

  const close = () => setOpen(false);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Unlock exclusive deals"
    >
      {/* Backdrop — click to dismiss */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={close}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-2xl text-center">
        {/* Close */}
        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="mx-auto w-14 h-14 rounded-full bg-[#c8a96e]/10 flex items-center justify-center mb-4">
          <svg className="w-7 h-7 text-[#c8a96e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 17.75 5.4 21l1.26-7.33L1 8.04l7.36-1.07L12 0l3.64 6.97L23 8.04l-5.66 5.63L18.6 21 12 17.75z" />
          </svg>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 uppercase tracking-wide">
          Wait — before you go
        </h2>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          Unlock <span className="font-semibold text-gray-900">exclusive deals, coupons and offers</span> from our partners, free.
        </p>

        <a
          href={ADSTERRA_SMARTLINK_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={close}
          className="mt-5 inline-block w-full bg-gray-900 text-white rounded-lg px-6 py-3.5 text-sm font-semibold hover:bg-gray-700 transition-colors"
        >
          Unlock My Exclusive Deals
        </a>

        <p className="mt-3 text-[11px] text-gray-400">
          Opens in a new tab · Powered by our trusted partners
        </p>
      </div>
    </div>
  );
}