import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { generateCouponCode, setCouponCode } from '../lib/coupon'
import { ADSTERRA_SMARTLINK_URL } from '../lib/ads'

export const COUPON_MINIMUM = 249

// Minimum elapsed time (seconds) between the install/try-again click and the
// "Check Task Completion" click before the coupon can be applied.
const MIN_TASK_SECONDS = 60

/**
 * CouponOfferwallPage — DEMO-ONLY.
 * Recreates a realistic offerwall flow:
 *   1. User is asked to install a partner app (inert placeholder in this demo).
 *   2. Clicking it simulates "leaving" to the app store; returning shows the
 *      "task not completed" state with a Try Again link.
 *   3. Try Again reveals a "Check Task Completion" button.
 *   4. Clicking it runs a silent 60-second validation (user sees no countdown),
 *      then generates + shows the unique coupon code.
 */
export default function CouponOfferwallPage() {
  const navigate = useNavigate()

  // Flow state machine.
  //   returned      — true after Install completes its 1.6s redirect simulation.
  //   checkFailed   — true after a "Check Task Completion" click that was rejected
  //                   (too soon / task not completed). Controls the warning + Try Again.
  //   validating    — 60s check in progress.
  //   validated     — task confirmed, coupon code issued.
  const [installing, setInstalling] = useState(false)
  // `returned` always starts false on a fresh page visit — the Check button
  // only appears AFTER the user clicks Install in the current visit. It is NOT
  // restored from storage, so re-entering the page resets to Install-only.
  const [returned, setReturned] = useState(false)
  // `checkFailed` restores so the warning + Try Again survive the refresh that
  // fires when a check is rejected.
  const [checkFailed, setCheckFailed] = useState(() =>
    sessionStorage.getItem('taskCheckFailed') === 'true'
  )
  const [validating, setValidating] = useState(false)
  const [validated, setValidated] = useState(false)
  const [couponCode, setCouponCodeState] = useState(null)
  const timerRef = useRef(null)
  const taskStartRef = useRef(Number(sessionStorage.getItem('taskStartTime') || 0))

  // Clear the timeout on unmount
  useEffect(() => () => clearTimeout(timerRef.current), [])

  // Step 2: "Install & Open Partner App" — simulate redirecting away and back.
  // In this demo we don't actually leave; we show a brief "Returning..." state
  // to mimic coming back from the app store, then the "not completed" screen.
  const handleInstall = () => {
    if (installing || validating || validated) return
    // Record when the user clicked install — the task timer starts here.
    const now = Date.now()
    taskStartRef.current = now
    sessionStorage.setItem('taskStartTime', String(now))
    sessionStorage.setItem('taskStarted', 'true')
    sessionStorage.removeItem('taskCheckFailed')
    setInstalling(true)
    timerRef.current = setTimeout(() => {
      setInstalling(false)
      setReturned(true)
    }, 1600)
  }

  // "Try Again" — re-simulate leaving to the app store and coming back, so the
  // user goes through the install step again before checking completion.
  const handleTryAgain = () => {
    if (installing || validated) return
    // Restart the task timer on a retry.
    const now = Date.now()
    taskStartRef.current = now
    sessionStorage.setItem('taskStartTime', String(now))
    sessionStorage.setItem('taskStarted', 'true')
    sessionStorage.removeItem('taskCheckFailed')
    setCheckFailed(false)
    setReturned(false)
    setInstalling(true)
    timerRef.current = setTimeout(() => {
      setInstalling(false)
      setReturned(true)
    }, 1600)
  }

  // Step 4: "Check Task Completion" — only succeeds if enough time has passed
  // since the install/try-again click. Otherwise the page refreshes back to the
  // "task not completed" message with the same error and freshly reloaded ads.
  const handleCheckCompletion = () => {
    if (validating || validated) return

    const elapsed = (Date.now() - taskStartRef.current) / 1000
    if (elapsed < MIN_TASK_SECONDS) {
      // Too soon / not completed — remember the failure so the refresh shows
      // the same error, then reload (which also re-fires the ad stack).
      sessionStorage.setItem('taskCheckFailed', 'true')
      window.location.reload()
      return
    }

    setValidating(true)
    timerRef.current = setTimeout(() => {
      const code = generateCouponCode()
      setCouponCode(code)
      setCouponCodeState(code)
      setValidating(false)
      setValidated(true)
    }, 2000)
  }

  // "Apply Coupon" — only after validation completes, and only if the cart
  // meets the minimum order. Otherwise redirect to "add more" recommendations.
  const handleApplyCoupon = () => {
    if (!validated) return
    let subtotal = 0
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    } catch {
      /* ignore */
    }

    if (subtotal < COUPON_MINIMUM) {
      navigate('/add-more')
      return
    }

    try {
      localStorage.setItem('couponApplied', 'true')
      localStorage.setItem('couponTotal', String(subtotal))
    } catch {
      /* ignore */
    }
    navigate('/cart')
  }

  // Close the offerwall and go back to the cart (refreshing it)
  const handleClose = () => {
    window.location.href = '/cart'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
      {/* Page header with close button */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-gray-900">Unlock Your Coupon</h1>
          <div className="w-16 h-1 bg-[#c8a96e] mt-4"></div>
        </div>
        <button
          onClick={handleClose}
          className="shrink-0 text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close and back to cart"
          title="Back to cart"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="mb-8"></div>

      <div className="grid gap-6 md:gap-8 lg:grid-cols-[1fr_0.8fr] lg:gap-10">
        {/* Offerwall task */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm space-y-5">
          <div className="text-center space-y-2">
            <span className="inline-block bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wide">
              Limited Time Offer
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Get 50% OFF</h2>
            <p className="text-sm text-gray-500">
              Complete 1 partner task to unlock a <span className="font-semibold text-gray-900">50% OFF coupon code</span>
            </p>
            <p className="text-xs text-gray-400">Minimum order ₹{COUPON_MINIMUM}</p>
          </div>

          {/* Step 1 — Install & Open Partner App */}
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-5 text-center space-y-3">
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Partner Task</p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { e.preventDefault(); handleInstall() }}
              className="inline-block w-full bg-gray-900 text-white rounded-lg px-6 py-3.5 text-sm font-semibold hover:bg-gray-700 transition-colors"
            >
              Install & Open Partner App
            </a>
            <p className="text-[11px] text-gray-400">
              Demo placeholder — no real app redirects in this prototype.
            </p>
          </div>

          {/* Step 2 — "Returning from app store" (brief) */}
          {installing && (
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center space-y-2">
              <div className="w-8 h-8 mx-auto rounded-full border-3 border-blue-200 border-t-blue-600 animate-spin" />
              <p className="text-sm font-semibold text-blue-800">Opening partner app…</p>
              <p className="text-xs text-blue-600">Returning to verify your task…</p>
            </div>
          )}

          {/* Step 2b — "Task not completed" warning (only after a failed check) */}
          {checkFailed && !validating && !validated && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 space-y-2">
              <p className="font-semibold flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Task not completed
              </p>
              <p className="text-xs text-amber-700">
                We couldn't detect a completed install. Make sure the app is opened once, then click below to try again.
              </p>
            </div>
          )}

          {/* Step 3 — Check Task Completion (after install/return) */}
          {returned && !checkFailed && !validating && !validated && (
            <button
              onClick={handleCheckCompletion}
              className="w-full bg-amber-500 text-white rounded-lg px-6 py-3.5 text-sm font-bold hover:bg-amber-600 transition-colors"
            >
              Check Task Completion
            </button>
          )}

          {/* Try Again button (only after a failed check) */}
          {checkFailed && !validating && !validated && (
            <button
              onClick={handleTryAgain}
              className="w-full border-2 border-amber-500 text-amber-600 rounded-lg px-6 py-3.5 text-sm font-bold hover:bg-amber-50 transition-colors"
            >
              Try Again
            </button>
          )}

          {/* Step 4 — Silent 60s validation */}
          {validating && (
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center space-y-2">
              <div className="w-8 h-8 mx-auto rounded-full border-3 border-blue-200 border-t-blue-600 animate-spin" />
              <p className="text-sm font-semibold text-blue-800">Verifying task completion…</p>
              <p className="text-xs text-blue-600">Checking your app install</p>
            </div>
          )}

          {/* Step 5 — Validated: coupon issued */}
          {validated && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700 space-y-2">
              <p className="font-semibold flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Task verified! Your coupon is ready.
              </p>
              <p className="text-xs text-green-600">Your coupon code:</p>
              <p className="text-lg font-bold tracking-widest text-gray-900 bg-white border border-green-200 rounded-lg px-4 py-2 text-center select-all">
                {couponCode}
              </p>
              <button
                onClick={handleApplyCoupon}
                className="w-full bg-green-600 text-white rounded-lg px-6 py-3.5 text-sm font-bold hover:bg-green-700 transition-colors mt-1"
              >
                Apply Coupon & Go to Cart
              </button>
            </div>
          )}

          <p className="text-xs text-gray-500 leading-relaxed">
            Your coupon will be saved and applied at checkout once your order total
            reaches ₹{COUPON_MINIMUM}.
          </p>
        </div>

        {/* Back to cart */}
        <div className="space-y-6">
          <div className="flex justify-between text-sm">
            <Link to="/cart" className="text-gray-600 hover:text-gray-900 underline underline-offset-2">
              ← Back to Cart
            </Link>
          </div>

          {/* Partner deals — monetized outbound via Adsterra smartlink */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm space-y-3">
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
              More Ways to Save
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Looking for extra cashback or vouchers on top of your coupon? Check out deals from our trusted partners.
            </p>
            <a
              href={ADSTERRA_SMARTLINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full border-2 border-gray-900 text-gray-900 rounded-lg px-6 py-3 text-sm font-semibold hover:bg-gray-50 transition-colors text-center"
            >
              Explore Partner Offers
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
