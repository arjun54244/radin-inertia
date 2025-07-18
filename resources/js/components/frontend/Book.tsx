import { useEffect, useState } from "react";
import { Bookmark, Eye, Heart, Star } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types/books";
import { useForm } from '@inertiajs/react';
import { toast } from "react-toastify";
import axios from "axios";
interface BookProps {
  product: Product;
  isAuthenticated: boolean;
}

export default function Book({ product, isAuthenticated }: BookProps) {
  const { data: cartData, isAdding, isLoading, addToCart, isLoading: cartLoading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [optionIds, setOptionIds] = useState<Record<string, number>>({});

  const items = cartData?.cartItems ?? [];
  useEffect(() => {
    if (!isLoading && items.length) {
      const existingItem = items.find((item) => item.product_id === product.id);
      if (existingItem) {
        setTotalQuantity(existingItem.quantity);
      }
    }
  }, [isLoading, cartData, product.id]);
  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      await addToCart({
        bookId: product.id,
        option_ids: optionIds,
        quantity,
        price: product.discounted_price ? parseFloat(product.discounted_price) : null,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const discountPercentage = (
    ((parseFloat(product.price) - parseFloat(product.discounted_price)) / parseFloat(product.price)) *
    100
  ).toFixed(0);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "/placeholder.jpg";
    if (imagePath.startsWith("http")) return imagePath;
    return `${apiBaseUrl}/storage/${imagePath}`;
  };

  const imageUrl = getImageUrl(Array.isArray(product.images) ? product.images[0] : "");
  const rating = Number(product.rating) || 0;

  return (
    <div className="group rounded-xl overflow-hidden shadow transition hover:shadow-xl bg-white dark:bg-slate-900">
      <div className="relative">
        <Link href={`/books/${product.slug}`}>
          <img
            src={imageUrl}
            alt={product.name}
            width={500}
            height={650}
            className="object-cover w-full h-auto rounded-t-xl transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-semibold px-2.5 py-1 rounded">
          -{discountPercentage}% Off
        </div>

        <div className="absolute top-3 right-3 space-y-2 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
          <ul className="list-none absolute top-[10px] end-4 opacity-100 group-hover:opacity-100 duration-500 space-y-1">
           { isAuthenticated && (
            <LikeButton productId={product.id} initialLiked={Boolean(product.is_liked)} initialLikes={0} />
            )}
            <li className="mt-1"><Link
              href={`/books/${product.slug}`} className="size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"> <Eye size={16} /></Link></li>
          </ul>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <Link
          href={`/books/${product.slug}`}
          className="text-lg font-semibold text-slate-800 hover:text-orange-600 dark:text-white dark:hover:text-orange-500"
        >
          {product.name.split(" ").slice(0, 8).join(" ") + "..."}
        </Link>

        <div className="flex lg:flex-row md:flex-col sm:flex-col items-stretch items-center justify-between w-full gap-2 px-4 mb-0">
          <input
            type="number"
            min="1"
            value={totalQuantity}
            readOnly
            className="w-16 px-2 py-1 text-center border border-gray-300 rounded-md focus:outline-none dark:bg-slate-800 dark:border-gray-600 text-sm"
          />
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="bg-orange-600 text-white text-sm font-medium px-4 py-1.5 rounded hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding || cartLoading ? "Adding..." : "Add to Cart"}
          </button>
        </div>


        <div className="flex items-center justify-between mt-1">
          <div className="text-base font-semibold text-orange-600">
            ₹{product.discounted_price}
            <span className="text-sm text-gray-400 line-through ms-2">₹{product.price}</span>
          </div>
          <ul className="flex space-x-1 text-amber-400">
            {[...Array(5)].map((_, index) => (
              <li key={index}>
                <Star size={16} fill={index < rating ? "currentColor" : "none"} />
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          {product.binding} | {product.pages} pages | {product.weight} | {product.dimensions}
        </p>
      </div>
    </div>
  );
}

interface LikeButtonProps {
  productId: number;
  initialLiked: boolean;
  initialLikes: number;
}

export function LikeButton({ productId, initialLiked, initialLikes }: LikeButtonProps) {
  const [liked, setLiked] = useState(initialLiked|| false);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [loading, setLoading] = useState(false);

  const handleLikeToggle = async () => {
    setLoading(true);

    try {
      const res = await axios.post(`/products/${productId}/like`);

      setLiked(res.data.liked);
      setLikesCount(res.data.likes_count);

      toast.success(res.data.liked ? 'Added to favourites' : 'Removed from favourites');
    } catch (error) {
      toast.error('Failed to update like status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <li>
      <button
        onClick={handleLikeToggle}
        disabled={loading}
        className={`size-10 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-center rounded-full shadow 
          ${liked ? 'bg-orange-400 text-white' : 'bg-white text-slate-900 hover:bg-slate-900 hover:text-white'} 
          ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Heart size={16} />
      </button>
    </li>
  );
}
