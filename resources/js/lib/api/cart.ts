// lib/api/cart.ts
import { CartItem } from '@/types/cart';
import axios from 'axios';
interface CartResponse {
  cartItems: CartItem[];
  totalPrice: number;
}

export const fetchCart = async (): Promise<CartResponse> => {
  const { data } = await axios.get(route('cart.index'), {
    headers: { Accept: 'application/json' },
  });
  return data;
};
