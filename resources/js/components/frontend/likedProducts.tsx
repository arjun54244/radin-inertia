import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number | string;
    discounted_price?: number | string | null;
    images?: string[];
    rating?: string;
    quantity?: number;
    pivot?: {
        user_id: number;
        product_id: number;
        created_at: string;
        updated_at: string;
    };
}

interface FavouriteItemsProps {
    initialLikedProducts: Product[];
}

export function FavouriteItems({ initialLikedProducts }: FavouriteItemsProps) {
    const [likedProducts, setLikedProducts] = useState<Product[]>(initialLikedProducts);

    const handleUnlike = (productId: number) => {
        setLikedProducts(prev => prev.filter(product => product.id !== productId));
    };

    return (
        <>
            <h5 className="text-lg font-semibold my-6">My Favourite Items</h5>

            <div className="rounded-md shadow-sm dark:shadow-gray-800 p-6">
                {likedProducts.length > 0 ? (
                    <ul>
                        {likedProducts.map((product) => (
                            <li key={product.id} className="flex justify-between items-center pb-6">
                                <div className="flex items-center">
                                    <img
                                        src={
                                            product.images && product.images.length > 0
                                                ? `/storage/${product.images[0]}`
                                                : "/images/no-image.png"
                                        }
                                        className="rounded shadow-sm dark:shadow-gray-800 w-16"
                                        alt=""
                                    />

                                    <div className="ms-4">
                                        <Link href={`/products/${product.slug}`} className="font-semibold hover:text-orange-500">
                                            {product.name}
                                        </Link>
                                        <p className="text-green-600 text-sm mt-1">
                                            ₹{product.discounted_price ?? product.price}
                                            {product.discounted_price && product.discounted_price < product.price && (
                                                <del className="text-red-600 ms-2">₹{product.price}</del>
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <LikeButton
                                        productId={product.id}
                                        initialLiked={true}
                                        initialLikes={0}
                                        onUnlike={handleUnlike}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-slate-400">You haven’t liked any products yet.</p>
                )}
            </div>
        </>
    );
}

interface LikeButtonProps {
    productId: number;
    initialLiked: boolean;
    initialLikes: number;
    onUnlike?: (productId: number) => void;
}

export function LikeButton({ productId, initialLiked, initialLikes, onUnlike }: LikeButtonProps) {
    const [liked, setLiked] = useState(initialLiked);
    const [likesCount, setLikesCount] = useState(initialLikes);
    const [loading, setLoading] = useState(false);

    const handleLikeToggle = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`/products/${productId}/like`);
            const newLiked = response.data.liked;
            setLiked(newLiked);
            setLikesCount(response.data.likes_count);
            toast.success(newLiked ? 'Liked!' : 'Removed from liked!');

            // If unliked and callback exists, inform parent
            if (!newLiked && onUnlike) {
                onUnlike(productId);
            }
        } catch (error) {
            toast.error('Failed to update like status');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleLikeToggle}
            disabled={loading}
            className={`size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center 
          ${liked ? 'bg-red-600 text-white' : 'bg-red-600/5 text-red-600 hover:bg-red-600 hover:text-white'}
          rounded-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            <Trash2 className="h-4 w-4" />
        </button>
    );
}