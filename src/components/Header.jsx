import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "Saree", slug: "saree" },
  { label: "Salwar Suit", slug: "salwar-suit" },
  { label: "Lehenga Choli", slug: "lehenga-choli" },
  { label: "Western Wear", slug: "western-wear" },
  { label: "Best Selling", slug: "best-selling", path: "/best-selling" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const menuRef = useRef(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const updateCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(count);
      } catch {
        setCartCount(0);
      }
    };
    updateCart();
    window.addEventListener("storage", updateCart);
    window.addEventListener("cartUpdated", updateCart);
    return () => {
      window.removeEventListener("storage", updateCart);
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // Close the mobile menu when tapping outside the drawer
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [mobileMenuOpen]);

  // Close the mobile menu when swiping left (right-to-left dismiss)
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (!mobileMenuOpen || !menuRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -40) setMobileMenuOpen(false);
  };

  const closeAll = () => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">

      {/* Announcement bar */}
      <div className="bg-gray-900 text-white text-xs text-center py-1.5 px-4 hidden md:block">
        Free Shipping &nbsp;|&nbsp; 10 Days Easy Return &nbsp;|&nbsp; Cash on Delivery
      </div>

      {/* ── Single unified row: Logo | Nav | Icons ── */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 md:h-[72px] gap-6">

          {/* LEFT — Logo */}
          <div className="flex-none">
            <Link to="/" onClick={closeAll} className="flex flex-col items-center leading-none">
              <span className="text-xl md:text-3xl font-bold tracking-widest text-gray-900 uppercase">
                Bebs
              </span>
              <span className="text-[9px] md:text-[11px] tracking-[0.3em] text-gray-400 uppercase hidden sm:block mt-1">
                Premium Fashion
              </span>
            </Link>
          </div>

          {/* CENTER — Nav links (desktop only) */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-2 lg:gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.slug}
                to={link.path || `/product-category/${link.slug}`}
                className="text-[13px] xl:text-[14px] font-semibold text-gray-800 hover:text-gray-500 transition-colors uppercase tracking-wider whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT — Icons */}
          <div className="flex-none flex items-center gap-3 md:gap-4 ml-auto">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </button>

            {/* Account (desktop only) */}
            <button
              className="text-gray-600 hover:text-gray-900 transition-colors hidden md:block"
              aria-label="Account"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
              </svg>
            </button>

            {/* My Orders (desktop only) */}
            <Link
              to="/orders"
              onClick={closeAll}
              className="text-gray-600 hover:text-gray-900 transition-colors hidden md:block"
              aria-label="My Orders"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              onClick={closeAll}
              className="relative text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h12M7 13L5.4 5M10 21a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm7 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 p-1"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Search dropdown */}
      {searchOpen && (
        <div className="border-t border-gray-100 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2">
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for sarees, suits, lehengas..."
              className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-gray-500"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="bg-gray-900 text-white px-5 py-2 rounded text-sm font-medium hover:bg-gray-700 transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      )}

      {/* Mobile menu — floating drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer panel */}
          <div
            ref={menuRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="fixed inset-y-0 right-0 z-50 w-[280px] max-w-[85vw] bg-white shadow-2xl md:hidden flex flex-col"
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-5 h-14 border-b border-gray-100">
              <span className="text-sm font-bold uppercase tracking-widest text-gray-900">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1"
                aria-label="Close menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto">
              <div className="divide-y divide-gray-50">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.slug}
                    to={link.path || `/product-category/${link.slug}`}
                    onClick={closeAll}
                    className="flex items-center justify-between px-5 py-4 text-sm font-medium text-gray-700 hover:bg-gray-50 uppercase tracking-wide"
                  >
                    {link.label}
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </nav>

            {/* My Orders + Cart links */}
            <div className="border-t border-gray-100">
              <Link
                to="/orders"
                onClick={closeAll}
                className="flex items-center justify-between px-5 py-4 text-sm font-medium text-gray-700 hover:bg-gray-50 uppercase tracking-wide"
              >
                My Orders
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/cart"
                onClick={closeAll}
                className="flex items-center justify-between px-5 py-4 text-sm font-medium text-gray-700 hover:bg-gray-50 uppercase tracking-wide"
              >
                Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
            </div>
          </div>
        </>
      )}
      </header>
  );
}
