// Simple cart state management
export interface CartItem {
  productId: string
  quantity: number
  price: number
}

export interface CartState {
  items: CartItem[]
  total: number
}

export const getCartFromStorage = (): CartState => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("captainShopCart")
    return cart ? JSON.parse(cart) : { items: [], total: 0 }
  }
  return { items: [], total: 0 }
}

export const saveCartToStorage = (cart: CartState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("captainShopCart", JSON.stringify(cart))
  }
}

export const addToCart = (productId: string, price: number, quantity = 1): CartState => {
  const cart = getCartFromStorage()
  const existingItem = cart.items.find((item) => item.productId === productId)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.items.push({ productId, quantity, price })
  }

  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  saveCartToStorage(cart)
  return cart
}

export const removeFromCart = (productId: string): CartState => {
  const cart = getCartFromStorage()
  cart.items = cart.items.filter((item) => item.productId !== productId)
  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  saveCartToStorage(cart)
  return cart
}

export const updateCartQuantity = (productId: string, quantity: number): CartState => {
  const cart = getCartFromStorage()
  const item = cart.items.find((item) => item.productId === productId)
  if (item) {
    item.quantity = quantity
    if (quantity <= 0) {
      return removeFromCart(productId)
    }
  }
  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  saveCartToStorage(cart)
  return cart
}
