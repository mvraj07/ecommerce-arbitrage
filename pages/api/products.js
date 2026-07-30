import products from "../../../data/products.json";

export default function handler(req, res) {
  const { q, page = "1", per_page = "12", min_price, max_price } = req.query;
  let items = products.slice();
  if (q) {
    const term = q.toLowerCase();
    items = items.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(term)),
    );
  }
  if (min_price) items = items.filter((p) => p.price >= Number(min_price));
  if (max_price) items = items.filter((p) => p.price <= Number(max_price));

  const pageNum = Math.max(1, Number(page));
  const perPage = Math.max(1, Number(per_page));
  const start = (pageNum - 1) * perPage;
  const paged = items.slice(start, start + perPage);

  res
    .status(200)
    .json({
      total: items.length,
      page: pageNum,
      per_page: perPage,
      items: paged,
    });
}
