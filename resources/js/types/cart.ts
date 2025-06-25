// types/cart.ts
export interface Product {
  id: number;
  name: string;
  price: string;
  discounted_price: string;
  images: string[];
}

export interface CartItem {
  id: number;
  product_id: number;
  cart_id: number;
  quantity: number;
  price: string;
  discounted_price: string;
  product: Product;
}
