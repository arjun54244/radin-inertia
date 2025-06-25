
import axios from "axios";

export const fetchCart = async () => {
  const { data } = await axios.get("/cart");
  return data;
};

export const addToCart = async (productId: number, quantity = 1) => {
  const { data } = await axios.post(`/cart/add/${productId}`, { quantity });
  return data;
};

export const updateCartItem = async (productId: number, quantity: number) => {
  const { data } = await axios.put(`/cart/update/${productId}`, { quantity });
  return data;
};

export const removeCartItem = async (productId: number) => {
  const { data } = await axios.delete(`/cart/remove/${productId}`);
  return data;
};

export const clearCart = async () => {
  const { data } = await axios.delete("/cart/clear");
  return data;
};
