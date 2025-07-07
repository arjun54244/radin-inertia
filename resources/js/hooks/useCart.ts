import { CartItem } from '@/types/cart';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

interface CartResponse {
  cartItems: CartItem[];
  totalPrice: number;
}
export function useCart() {
  const queryClient = useQueryClient();

  const cartQuery = useQuery<CartResponse>({
    queryKey: ['cart'],
    queryFn: async () => {
      const { data } = await axios.get(route('cart.index'), {
        headers: { Accept: 'application/json' },
      });
      return data;
    },
    placeholderData: () => queryClient.getQueryData(['cart']), // Reuse cached data
  });

  interface AddToCartPayload {
    bookId: number;
    option_ids?: Record<string, number>;
    quantity: number;
    price: number | null;
  }
  
  const addToCart = useMutation({
    mutationFn: (payload: AddToCartPayload) =>
      axios.post(route('cart.store', payload.bookId), {
        option_ids: payload.option_ids,
        quantity: payload.quantity,
        price: payload.price,
      }),
    onSuccess: () => {
      toast.success('Product added to cart');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
    onError: (error: any) => {
      const messages =
        error?.response?.data?.errors
          ? Object.values(error.response.data.errors).flat().join('\n')
          : 'Something went wrong.';
      toast.error(messages);
    },
  });

  const updateCartItem = useMutation({
    mutationFn: ({ productId, quantity }: { productId: number; quantity: number }) =>
      axios.put(route('cart.update', productId), { quantity }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
    onError: () => toast.error('Failed to update quantity.'),
  });

  const updateQuantity = (productId: number, quantity: number) => {
    updateCartItem.mutate({ productId, quantity });
  };


  const removeFromCart = async (productId: number) => {
    try {
      await axios.delete(route('cart.delete', productId));
      toast.success('Item removed');
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    } catch (error) {
      toast.error('Failed to remove item.');
    }
  };

  return {
    ...cartQuery,
    addToCart: addToCart.mutateAsync,
    isAdding: addToCart.isPending,
    updateQuantity,
    removeFromCart,
  };
}
