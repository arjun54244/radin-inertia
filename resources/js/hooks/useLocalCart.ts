// hooks/useLocalCart.ts
import { useEffect, useState } from "react";

export interface CartItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  discounted_price: number;
  image: string;
}

export function useLocalCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Omit<CartItem, "quantity">, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === product.productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalPrice = items.reduce((total, item) => total + item.quantity * item.price, 0);
  const discountedTotal = items.reduce(
    (total, item) => total + item.quantity * item.discounted_price,
    0
  );

  return {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
    discountedTotal,
  };
}
