"use client"

import { useState, useEffect } from "react"
import type { CartState } from "@/lib/store"
import {
  getCartFromStorage,
  saveCartToStorage,
  addToCart as addToCartUtil,
  removeFromCart as removeFromCartUtil,
  updateCartQuantity as updateCartQuantityUtil,
} from "@/lib/store"

export function useCart() {
  const [cart, setCart] = useState<CartState>({ items: [], total: 0 })
  const [isLoading, setIsLoading] = useState(true)

  // Load cart on mount
  useEffect(() => {
    const savedCart = getCartFromStorage()
    setCart(savedCart)
    setIsLoading(false)
  }, [])

  const addToCart = (productId: string, price: number, quantity = 1) => {
    const updatedCart = addToCartUtil(productId, price, quantity)
    setCart(updatedCart)
  }

  const removeFromCart = (productId: string) => {
    const updatedCart = removeFromCartUtil(productId)
    setCart(updatedCart)
  }

  const updateQuantity = (productId: string, quantity: number) => {
    const updatedCart = updateCartQuantityUtil(productId, quantity)
    setCart(updatedCart)
  }

  const clearCart = () => {
    const emptyCart: CartState = { items: [], total: 0 }
    saveCartToStorage(emptyCart)
    setCart(emptyCart)
  }

  return {
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    itemCount: cart.items.length,
    total: cart.total,
  }
}
