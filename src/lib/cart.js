// Simple localStorage-backed cart helpers with event dispatch
// Cart is stored as an array directly: [{ id, title, price, quantity, slug, image, category }, ...]

// Get cart from localStorage - returns array for easier access
export function getCart() {
  if (typeof window === 'undefined') return []
  try {
    const cart = localStorage.getItem('cart')
    // Handle both old { items: [] } format and new [] format
    if (cart) {
      const parsed = JSON.parse(cart)
      return Array.isArray(parsed) ? parsed : (parsed.items || [])
    }
    return []
  } catch (error) {
    console.error('Error reading cart from localStorage:', error)
    return []
  }
}

// Save cart to localStorage and dispatch event so all components stay in sync
export function saveCart(cart) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('cart', JSON.stringify(cart))
    // Dispatch custom event so Header and other components can update
    // This ensures cart state syncs across the app without prop drilling
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: cart }))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

// Add product to cart with specified quantity (default 1)
// Updates existing item or creates new one
export function addToCart(product, qty = 1) {
  const cart = getCart()
  const existingIdx = cart.findIndex(i => i.id === product.id)

  if (existingIdx > -1) {
    // Product already in cart, increase quantity
    cart[existingIdx].quantity += qty
  } else {
    // New product, add to cart
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: qty,
      slug: product.slug,
      image: product.images[0],
      category: product.category
    })
  }

  saveCart(cart)
  return cart
}

// Remove item from cart by index
export function removeFromCart(index) {
  const cart = getCart()
  cart.splice(index, 1)
  saveCart(cart)
  return cart
}

// Update quantity for item at index
export function updateCartQuantity(index, quantity) {
  const cart = getCart()
  if (quantity <= 0) {
    cart.splice(index, 1)
  } else {
    cart[index].quantity = quantity
  }
  saveCart(cart)
  return cart
}

// Clear entire cart
export function clearCart() {
  saveCart([])
  return []
}

// Get cart totals
export function getCartTotals(cart = null) {
  const items = cart || getCart()
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const count = items.reduce((sum, item) => sum + item.quantity, 0)
  return { subtotal, count, items: items.length }
}
