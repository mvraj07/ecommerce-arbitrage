import products from "../../data/products.json";
import { addToCart } from "../../lib/cart";
import { useRouter } from "next/router";

export default function ProductPage({ product }) {
  const router = useRouter();
  if (!product) return <div>Product not found</div>;

  const handleAdd = () => {
    addToCart(product, 1);
    router.push("/cart");
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full object-contain"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <div className="mt-4">
            <div className="text-green-700 text-xl font-bold">
              ₹{product.price}
            </div>
            <div className="text-gray-400 line-through">
              ₹{product.compare_at_price}
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm text-gray-700">{product.description}</p>
          </div>
          <div className="mt-6">
            <button onClick={handleAdd} className="btn-primary">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="font-semibold">Product Details</h3>
        <ul className="list-disc pl-5 text-sm mt-2 text-gray-700">
          <li>Material: Nylon</li>
          <li>Waterproof membrane</li>
          <li>Lightweight</li>
        </ul>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = products.map((p) => ({ params: { slug: p.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = products.find((p) => p.slug === params.slug) || null;
  return { props: { product } };
}
