import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="border bg-white">
      <Link href={`/product/${product.slug}`}>
        <a>
          <div className="h-48 bg-gray-100 flex items-center justify-center">
            <img
              src={product.images[0]}
              alt={product.title}
              className="max-h-44 object-contain"
            />
          </div>
          <div className="p-3">
            <h3 className="text-sm font-semibold text-gray-800">
              {product.title}
            </h3>
            <div className="mt-2 flex items-center gap-3">
              <div className="text-green-700 font-bold">₹{product.price}</div>
              <div className="text-gray-400 line-through text-xs">
                ₹{product.compare_at_price}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
}
