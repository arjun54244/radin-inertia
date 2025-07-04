import { useState } from "react";
import { Bookmark, Eye, Heart, Star } from "lucide-react";
import { Link } from "@inertiajs/react";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types/books";

interface BookProps {
  product: Product;
}

export default function Book({ product }: BookProps) {
  const { addToCart, isLoading: cartLoading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      await addToCart(product.id, quantity);
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

        <div className="absolute top-3 right-3 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow">
            <Heart size={16} />
          </button>
          <Link
            href={`/books/${product.slug}`}
            className="p-2 rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow"
          >
            <Eye size={16} />
          </Link>
          <button className="p-2 rounded-full bg-white text-slate-900 hover:bg-slate-900 hover:text-white shadow">
            <Bookmark size={16} />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <Link
          href={`/books/${product.slug}`}
          className="text-lg font-semibold text-slate-800 hover:text-orange-600 dark:text-white dark:hover:text-orange-500"
        >
          {product.name.split(" ").slice(0, 8).join(" ") + "..."}
        </Link>

        <div className="flex items-center gap-2 mt-2">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-16 px-2 py-1 text-center border border-gray-300 rounded-md focus:outline-none dark:bg-slate-800 dark:border-gray-600 text-sm"
          />
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || cartLoading}
            className="bg-orange-600 text-white text-sm font-medium px-4 py-1.5 rounded hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAddingToCart || cartLoading ? "Adding..." : "Add to Cart"}
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