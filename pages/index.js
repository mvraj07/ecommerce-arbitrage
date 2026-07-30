import { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const perPage = 6;

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ page, per_page: perPage });
    if (q) params.set("q", q);
    fetch(`/api/products?${params.toString()}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((d) => {
        setProducts(d.items);
        setTotal(d.total);
      })
      .catch(() => {});
    return () => controller.abort();
  }, [q, page]);

  const pages = Math.max(1, Math.ceil(total / perPage));

  return (
    <div>
      <h1 className="text-3xl font-serif mb-4">Monsoon Offer</h1>

      <div className="mb-4 flex gap-3">
        <input
          placeholder="Search products..."
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-2 flex-1"
        />
      </div>

      <ProductGrid products={products} />

      <div className="mt-6 flex items-center gap-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-3 py-2 border rounded"
        >
          Prev
        </button>
        <div>
          Page {page} / {pages}
        </div>
        <button
          disabled={page >= pages}
          onClick={() => setPage((p) => Math.min(p + 1, pages))}
          className="px-3 py-2 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
