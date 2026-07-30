import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Order() {
  const router = useRouter();
  const { id } = router.query;
  const [orderId, setOrderId] = useState(id);

  useEffect(() => {
    if (id) setOrderId(id);
  }, [id]);

  if (!orderId) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-serif mb-6">Checkout</h1>
      <div className="border p-6">
        <h2 className="font-semibold">
          Thank you. Your order has been received.
        </h2>
        <div className="mt-4">
          <div>ORDER NUMBER: {orderId}</div>
          <div>TOTAL: ₹99.00</div>
        </div>
      </div>
    </div>
  );
}
