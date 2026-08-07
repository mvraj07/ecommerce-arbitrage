import React, { useRef } from "react";
import { Link } from "react-router-dom";
import products from "../data/products.json";
import AdSlot from "../components/AdSlot";
import { triggerVignette } from "../engine/adOrchestrator";

// Real category images from khedutmahiti.com
const CATEGORY_TILES = [
  {
    slug: "lehenga-choli",
    label: "Lehenga Choli",
    image: "https://khedutmahiti.com/cdn/shop/collections/Lehenga-Choli.png?v=1704437455&width=600",
  },
  {
    slug: "salwar-suit",
    label: "Salwar Suit",
    image: "https://khedutmahiti.com/cdn/shop/collections/Salwar-Suit.png?v=1704437473&width=600",
  },
  {
    slug: "saree",
    label: "Saree",
    image: "https://khedutmahiti.com/cdn/shop/collections/Sarees.png?v=1704437489&width=600",
  },
  {
    slug: "western-wear",
    label: "Western Wear",
    image: "https://khedutmahiti.com/cdn/shop/collections/Kurti.png?v=1720152640&width=600",
  },
];

// Horizontal scrollable product carousel
function ProductCarousel({ products }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 260, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll(-1)}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 bg-white border border-gray-300 rounded-full shadow items-center justify-center hover:bg-gray-50 transition-colors"
        aria-label="Scroll left"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div ref={scrollRef} className="flex gap-4 overflow-x-auto carousel-scroll pb-2">
        {products.map((p) => {
          const discount = p.compare_at_price
            ? Math.round(((p.compare_at_price - p.price) / p.compare_at_price) * 100)
            : 0;
          return (
            <Link
              key={p.id}
              to={`/product/${p.slug}`}
              onClick={triggerVignette}
              className="product-card flex-shrink-0 w-44 md:w-52 group"
            >
              <div className="img-shell aspect-[3/4] relative">
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="product-card-img w-full h-full object-cover object-center"
                  loading="lazy"
                />
                {discount > 0 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    -{discount}%
                  </span>
                )}
              </div>
              <div className="mt-2 px-0.5">
                <p className="text-xs text-gray-500 truncate capitalize">{p.category}</p>
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-snug mt-0.5 group-hover:text-gray-600 transition-colors">
                  {p.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-bold text-gray-900">
                    ₹{p.price.toLocaleString("en-IN")}
                  </span>
                  {p.compare_at_price && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹{p.compare_at_price.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <button
        onClick={() => scroll(1)}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 bg-white border border-gray-300 rounded-full shadow items-center justify-center hover:bg-gray-50 transition-colors"
        aria-label="Scroll right"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

function SectionHeading({ title, viewAllSlug, viewAllPath }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-xl md:text-2xl font-bold uppercase tracking-wide text-gray-900">
        {title}
      </h2>
      {(viewAllSlug || viewAllPath) && (
        <Link
          to={viewAllPath || `/product-category/${viewAllSlug}`}
          className="text-sm text-gray-600 border border-gray-300 px-4 py-1.5 rounded hover:bg-gray-50 transition-colors"
        >
          View all
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  const bestSelling = products.filter(p => p.category === "top-selling").slice(0, 8);
  const trending = [
    ...products.filter(p => p.category === "saree").slice(0, 4),
    ...products.filter(p => p.category === "salwar-suit").slice(0, 4),
  ];

  return (
    <div className="pb-14">
      {/* ── Hero Banner — real image from khedutmahiti.com ── */}
      <section className="w-full overflow-hidden bg-gray-100 h-auto">
        <img
          src="https://khedutmahiti.com/cdn/shop/files/bennar.jpg?v=1719409417&width=1600"
          alt="Fashion Banner"
          className="w-full object-cover object-center aspect-[16/7] md:aspect-[21/8]"
          fetchPriority="high"
        />
      </section>

      <div className="max-w-7xl mx-auto px-4">

        {/* ── Shop By Categories ── */}
        <section className="py-10 md:py-14">
          <h2 className="section-title">Shop By Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {CATEGORY_TILES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/product-category/${cat.slug}`}
                className="group relative overflow-hidden rounded-xl bg-gray-100 aspect-square"
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-end">
                  <span className="w-full text-center text-white font-semibold text-sm md:text-base py-3 md:py-4 uppercase tracking-wider">
                    {cat.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Ad after Shop by Categories (demo) ── */}
        <div className="pb-10 md:pb-14">
          <AdSlot type="banner-300x250" />
        </div>

        {/* ── Best Selling ── */}
        <section className="pb-10 md:pb-14">
          <SectionHeading title="Best Selling" viewAllPath="/best-selling" />
          <ProductCarousel products={bestSelling} />
        </section>

        {/* ── Ad after Best Selling (demo) ── */}
        <div className="pb-10 md:pb-14">
          <AdSlot type="banner-300x250" />
        </div>

        {/* ── Mid Banner — real image ── */}
        <section className="pb-10 md:pb-14">
          <Link to="/product-category/saree" className="group block rounded-xl overflow-hidden bg-gray-100">
            <img
              src="https://khedutmahiti.com/cdn/shop/files/bennar.jpg?v=1719409417&width=1600"
              alt="Shop Sarees"
              className="w-full object-cover object-center aspect-[16/6] md:aspect-[21/7] group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </Link>
        </section>

        {/* ── Ad after Mid Banner (demo) ── */}
        <div className="pb-10 md:pb-14">
          <AdSlot type="banner-300x250" />
        </div>

        {/* ── Trending Collection ── */}
        <section className="pb-12 md:pb-16">
          <SectionHeading title="Trending Collection" viewAllSlug="lehenga-choli" />
          <ProductCarousel products={trending} />
        </section>

      </div>

      {/* ── Sticky Mobile Bottom Anchor (demo, mobile only) ── */}
      <div className="lg:hidden">
        <div className="fixed bottom-0 inset-x-0 z-[90] bg-white/95 backdrop-blur border-t border-gray-200">
          <AdSlot type="anchor-320x50" className="p-2" />
        </div>
      </div>
    </div>
  );
}
