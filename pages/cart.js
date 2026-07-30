import { useEffect, useState } from "react";
import Link from "next/link";
import { getCart, saveCart } from "../lib/cart";

export default function Cart() {
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    setCart(getCart());
  }, []);

  const updateQty = (idx, val) => {
    const c = { ...cart };
    c.items[idx].quantity = Number(val);
    setCart(c);
    saveCart(c);
  };

  const subtotal = cart.items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div>
      <h1 className="text-2xl font-serif mb-6">Cart</h1>
      <div className="space-y-4">
        {cart.items.length === 0 && <div>Your cart is empty.</div>}
        {cart.items.map((it, idx) => (
          <div key={it.id} className="border p-3 flex gap-4 items-center">
            <img src={it.image} className="w-20 h-20 object-contain" />
            <div className="flex-1">
              <div className="text-sm font-semibold">{it.title}</div>
              <div className="text-sm">₹{it.price}</div>
            </div>
            <div>
              <input
                type="number"
                value={it.quantity}
                min="1"
                onChange={(e) => updateQty(idx, e.target.value)}
                className="w-20 border rounded px-2 py-1"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 border p-4">
        <div className="flex justify-between">
          <div>Subtotal</div>
          <div>₹{subtotal.toFixed(2)}</div>
        </div>
        <div className="mt-4">
          <Link href="/checkout">
            <a className="btn-primary inline-block mt-2">PROCEED TO CHECKOUT</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
