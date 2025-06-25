
import { useCart } from "@/hooks/useCart";
import { router, usePage } from "@inertiajs/react";
import { toast } from "react-hot-toast";
import { SharedData } from "@/types";

interface AddToCartButtonProps {
  product: {
    id: number;
    name: string;
    images: string[];
    price: string;
  };
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const { addToCart } = useCart();
  const { auth } = usePage<SharedData>().props;

  const handleAddToCart = async () => {
    if (!auth?.user) {
      toast.error("Please login to add items to cart");
      router.visit("/login");
      return;
    }

    try {
      await addToCart(product.id, 1);
      toast.success("Item added to cart");
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error("Something went wrong. Try again.");
    }
  };
  
  return (
    <button 
      className="py-2 px-5 cursor-pointer inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-slate-900 text-white w-full rounded-md"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
