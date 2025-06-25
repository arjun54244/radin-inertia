// hooks/useCart.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { CartItem } from "@/types/cart";

interface CartResponse {
  status: string;
  data: CartItem[];
}

export function useCart() {
  const queryClient = useQueryClient();

  const cartQuery = useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await axios.get("/cart");
      return data;
    },
  });

  const addToCart  = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: number; quantity: number }) =>
      axios.post(`/cart/add/${productId}`, { quantity }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: number; quantity: number }) =>
      axios.put(`/cart/update/${productId}`, { quantity }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const removeMutation = useMutation({
    mutationFn: async (productId: number) => axios.delete(`/cart/remove/${productId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const clearMutation = useMutation({
    mutationFn: async () => axios.delete("/cart/clear"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const items = cartQuery.data?.data || [];

  const totalPrice = items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
  const discountedTotal = items.reduce((acc, item) => acc + parseFloat(item.discounted_price) * item.quantity, 0);

  return {
    items,
    totalPrice,
    discountedTotal,
    isLoading: cartQuery.isLoading,
     addToCart: (productId: number, quantity: number) =>
    addToCart.mutateAsync({ productId, quantity }),
    updateQuantity: (productId: number, quantity: number) =>
      updateMutation.mutateAsync({ productId, quantity }),
    removeFromCart: (productId: number) => removeMutation.mutateAsync(productId),
    clearCart: () => clearMutation.mutateAsync(),
  };
}
