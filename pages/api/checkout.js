export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });
  const body = req.body || {};
  // In a real app you'd validate, create an order in DB and call payment provider.
  const orderId = `ORD-${Date.now()}`;
  // return a simple success response
  return res.status(200).json({ orderId });
}
