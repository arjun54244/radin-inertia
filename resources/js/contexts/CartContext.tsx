// resources/js/contexts/CartContext.tsx

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { usePage, router } from '@inertiajs/react';

interface CartItem {
  id: number;
  product: {
    id: number;
    name: string;
    images: string[];
    price: string;
    discounted_price: string;
  };
  quantity: number;
  price: string;
  discounted_price: string;
}

interface CartContextType {
  items: CartItem[];
  totalPrice: number;
  discountedTotal: number;
  isLoading: boolean;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { props } = usePage();
  const user = props.auth;

  const fetchCart = useCallback(async () => {
    if (!user) {
      setItems([]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.get(`/api/v1/cart`);
      setItems(response.data?.data || []);
    } catch (error: any) {
      console.error("Error fetching cart:", error);
      if (error?.response?.status === 401) {
        toast.error("Please login to view your cart");
        router.visit("/login");
      } else {
        toast.error("Failed to fetch cart items");
      }
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const addToCart = async (productId: number, quantity: number) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      router.visit("/login");
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(`/api/v1/cart/products/${productId}`, { quantity });
      await fetchCart();
      toast.success("Item added to cart");
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      if (error?.response?.status === 401) {
        toast.error("Please login to add items to cart");
        router.visit("/login");
      } else {
        toast.error("Failed to add item to cart");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (!user) {
      toast.error("Please login to update cart");
      router.visit("/login");
      return;
    }

    try {
      setIsLoading(true);
      await axios.put(`/api/v1/cart/products/${productId}`, { quantity });
      await fetchCart();
      toast.success("Cart updated");
    } catch (error: any) {
      console.error("Error updating cart:", error);
      if (error?.response?.status === 401) {
        toast.error("Please login to update cart");
        router.visit("/login");
      } else {
        toast.error("Failed to update cart");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: number) => {
    if (!user) {
      toast.error("Please login to remove items");
      router.visit("/login");
      return;
    }

    try {
      setIsLoading(true);
      await axios.delete(`/api/v1/cart/products/${productId}`);
      await fetchCart();
      toast.success("Item removed from cart");
    } catch (error: any) {
      console.error("Error removing from cart:", error);
      if (error?.response?.status === 401) {
        toast.error("Please login to remove items");
        router.visit("/login");
      } else {
        toast.error("Failed to remove item from cart");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    if (!user) {
      toast.error("Please login to clear cart");
      router.visit("/login");
      return;
    }

    try {
      setIsLoading(true);
      await axios.delete(`/api/v1/cart`);
      setItems([]);
      toast.success("Cart cleared");
    } catch (error: any) {
      console.error("Error clearing cart:", error);
      if (error?.response?.status === 401) {
        toast.error("Please login to clear cart");
        router.visit("/login");
      } else {
        toast.error("Failed to clear cart");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    const total = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
    const discounted = items.reduce((sum, item) => sum + parseFloat(item.discounted_price) * item.quantity, 0);

    setTotalPrice(total);
    setDiscountedTotal(discounted);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        totalPrice,
        discountedTotal,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
