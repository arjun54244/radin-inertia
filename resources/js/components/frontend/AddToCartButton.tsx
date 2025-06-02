"use client";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

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
  const { user } = useAuth();
  const router = useRouter();

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      router.push("/login");
      return;
    }

    try {
      await addToCart(product.id, 1);
      toast.success("Item added to cart");
    } catch (error) {
      console.error("Failed to add item to cart:", error);
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
