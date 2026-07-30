export function getCart() {
  if (typeof window === "undefined") return { items: [] };
  try {
    return JSON.parse(localStorage.getItem("cart") || '{"items":[]}');
  } catch (e) {
    return { items: [] };
  }
}

export function saveCart(cart) {
  if (typeof window === "undefined") return;
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product, qty = 1) {
  const cart = getCart();
  const idx = cart.items.findIndex((i) => i.id === product.id);
  if (idx > -1) {
    cart.items[idx].quantity += qty;
  } else {
    cart.items.push({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: qty,
      slug: product.slug,
      image: product.images[0],
    });
  }
  saveCart(cart);
  return cart;
}
