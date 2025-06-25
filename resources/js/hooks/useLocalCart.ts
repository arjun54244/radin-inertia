// hooks/useLocalCart.ts
import { useEffect, useState } from 'react'
import { CartItem } from '@/types/cart'

export const useLocalCart = () => {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('guest-cart')
    if (stored) setItems(JSON.parse(stored))
  }, [])

  const updateStorage = (newItems: CartItem[]) => {
    setItems(newItems)
    localStorage.setItem('guest-cart', JSON.stringify(newItems))
  }

  const addItem = (item: CartItem) => {
    const updated = [...items, item]
    updateStorage(updated)
  }

  const clearCart = () => {
    updateStorage([])
  }

  return { items, addItem, clearCart }
}
