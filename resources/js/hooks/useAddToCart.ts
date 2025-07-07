import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';


interface AddToCartPayload {
  bookId: number;
  option_ids: Record<string, number>;
  quantity: number;
  price: number | null;
}

export const useAddToCart = () => {
  return useMutation({
    mutationFn: async (payload: AddToCartPayload) => {
      const response = await axios.post(
        route('cart.store', payload.bookId),
        {
          option_ids: payload.option_ids,
          quantity: payload.quantity,
          price: payload.price,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success('Product added to cart successfully');
    },
    onError: (error: any) => {
      const messages =
        error?.response?.data?.errors
          ? Object.values(error.response.data.errors).flat().join('\n')
          : 'Something went wrong. Please try again.';
      toast.error(messages);
    },
  });
};
