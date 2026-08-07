/**
 * adOrchestrator.js — DEMO-ONLY ad flow simulator.
 *
 * This module MOCKS the behavior of Monetag / Adsterra ad-network triggers for
 * a cyber-fraud awareness prototype. It deliberately loads NO real third-party
 * scripts and renders no real ad impressions. All "ads" are clearly-labeled
 * placeholders rendered by <AdSlot />.
 *
 * Exposes the same surface a real orchestration layer would so the demo flow
 * can be demonstrated: popunder cooldown, vignette overlay, banner refresh.
 */

const DEMO_MODE = true;

// Custom event names used to drive the demo UI
const EVENTS = {
  vignette: 'adOrchestrator:vignette',
  popunder: 'adOrchestrator:popunder',
  refresh: 'adOrchestrator:refresh',
};

/** Fire a popunder mock. Enforces a 60s cooldown via sessionStorage. */
export function triggerPopunder() {
  if (typeof window === 'undefined') return
  const key = 'demo-popunder-last'
  const last = Number(sessionStorage.getItem(key) || 0)
  const now = Date.now()
  if (now - last < 60_000) {
    console.info('[adOrchestrator:demo] popunder suppressed (cooldown active)')
    return false
  }
  sessionStorage.setItem(key, String(now))
  window.dispatchEvent(new CustomEvent(EVENTS.popunder, { detail: { demo: DEMO_MODE } }))
  return true
}

/** Show a full-screen vignette mock. */
export function triggerVignette() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(EVENTS.vignette, { detail: { demo: DEMO_MODE } }))
}

/** Re-render inline ad containers (simulated by forcing a refresh event). */
export function refreshAllBanners() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(EVENTS.refresh, { detail: { demo: DEMO_MODE } }))
}

export const adEvents = EVENTS
