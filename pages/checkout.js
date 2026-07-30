import { useState } from "react";
import { getCart, saveCart } from "../lib/cart";
import { useRouter } from "next/router";

export default function Checkout() {
  const router = useRouter();
  const [cart] = useState(() => getCart());
  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pin: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ cart, billing }),
    });
    const data = await res.json();
    // clear cart
    saveCart({ items: [] });
    setLoading(false);
    router.push(`/order/${data.orderId}`);
  };

  const subtotal = cart.items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div>
      <h1 className="text-2xl font-serif mb-6">Checkout</h1>
      <form onSubmit={submit} className="grid grid-cols-1 gap-4 max-w-xl">
        <input
          placeholder="First name*"
          required
          value={billing.firstName}
          onChange={(e) =>
            setBilling({ ...billing, firstName: e.target.value })
          }
          className="border px-3 py-2"
        />
        <input
          placeholder="Last name*"
          required
          value={billing.lastName}
          onChange={(e) => setBilling({ ...billing, lastName: e.target.value })}
          className="border px-3 py-2"
        />
        <input
          placeholder="Street address*"
          required
          value={billing.address}
          onChange={(e) => setBilling({ ...billing, address: e.target.value })}
          className="border px-3 py-2"
        />
        <input
          placeholder="City*"
          required
          value={billing.city}
          onChange={(e) => setBilling({ ...billing, city: e.target.value })}
          className="border px-3 py-2"
        />
        <input
          placeholder="State*"
          required
          value={billing.state}
          onChange={(e) => setBilling({ ...billing, state: e.target.value })}
          className="border px-3 py-2"
        />
        <input
          placeholder="PIN Code*"
          required
          value={billing.pin}
          onChange={(e) => setBilling({ ...billing, pin: e.target.value })}
          className="border px-3 py-2"
        />
        <input
          placeholder="Phone*"
          required
          value={billing.phone}
          onChange={(e) => setBilling({ ...billing, phone: e.target.value })}
          className="border px-3 py-2"
        />
        <input
          placeholder="Email*"
          required
          type="email"
          value={billing.email}
          onChange={(e) => setBilling({ ...billing, email: e.target.value })}
          className="border px-3 py-2"
        />

        <div className="border p-4">
          <h4 className="font-semibold">Your order</h4>
          <div className="mt-2 text-sm">
            {cart.items.map((i) => (
              <div key={i.id} className="flex justify-between">
                <div>
                  {i.title} × {i.quantity}
                </div>
                <div>₹{(i.price * i.quantity).toFixed(2)}</div>
              </div>
            ))}
            <div className="mt-2 flex justify-between font-bold">
              {" "}
              <div>Total</div>
              <div>₹{subtotal.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Placing order..." : "PLACE ORDER"}
        </button>
      </form>
    </div>
  );
}
