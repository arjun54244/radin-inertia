"use client";
import { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import {Link} from "@inertiajs/react";
import { useCart } from "@/hooks/useCart";

export default function Cart() {
    const { items, totalPrice, discountedTotal, isLoading, updateQuantity, removeFromCart, clearCart } = useCart();
    const [updatingItems, setUpdatingItems] = useState<{ [key: number]: boolean }>({});

    const handleQuantityChange = async (productId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        
        setUpdatingItems(prev => ({ ...prev, [productId]: true }));
        try {
            await updateQuantity(productId, newQuantity);
        } catch (error) {
            console.error("Error updating quantity:", error);
        } finally {
            setUpdatingItems(prev => ({ ...prev, [productId]: false }));
        }
    };

    const handleRemoveItem = async (productId: number) => {
        setUpdatingItems(prev => ({ ...prev, [productId]: true }));
        try {
            await removeFromCart(productId);
        } catch (error) {
            console.error("Error removing item:", error);
        } finally {
            setUpdatingItems(prev => ({ ...prev, [productId]: false }));
        }
    };

    const handleClearCart = async () => {
        try {
            await clearCart();
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };

    if (isLoading) {
        return (
            <div className="container relative">
                <div className="grid grid-cols-1">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                        <p className="mt-4">Loading cart...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="container relative">
                <div className="grid grid-cols-1">
                    <div className="text-center">
                        <h4 className="text-2xl font-semibold">Your cart is empty</h4>
                        <p className="text-gray-500 mt-2">Looks like you haven&apos;t added any items to your cart yet.</p>
                        <Link href="/books" className="mt-4 inline-block bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container relative">
            <div className="grid grid-cols-1">
                <div className="relative">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="text-start p-4">Product</th>
                                    <th className="text-start p-4">Price</th>
                                    <th className="text-start p-4">Quantity</th>
                                    <th className="text-start p-4">Total</th>
                                    <th className="text-start p-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id} className="border-t">
                                        <td className="p-4">
                                            <div className="flex items-center">
                                                <img 
                                                    src={`${import.meta.env.NEXT_PUBLIC_API_URL}/storage/${item.product.images[0]}`} 
                                                    alt={item.product.name} 
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <div className="ml-4">
                                                    <h6 className="text-lg font-semibold">{item.product.name}</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                {parseFloat(item.price) > parseFloat(item.discounted_price) && (
                                                    <span className="text-gray-500 line-through">${item.price}</span>
                                                )}
                                                <span className="text-orange-500 font-semibold">${item.discounted_price}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                                                    disabled={updatingItems[item.product.id]}
                                                    className="p-2 border rounded-l-md hover:bg-gray-100"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="px-4 py-2 border-t border-b">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                                                    disabled={updatingItems[item.product.id]}
                                                    className="p-2 border rounded-r-md hover:bg-gray-100"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                {parseFloat(item.price) > parseFloat(item.discounted_price) && (
                                                    <span className="text-gray-500 line-through">
                                                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                                                    </span>
                                                )}
                                                <span className="text-orange-500 font-semibold">
                                                    ${(parseFloat(item.discounted_price) * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => handleRemoveItem(item.product.id)}
                                                disabled={updatingItems[item.product.id]}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-8 flex justify-between items-center">
                        <button
                            onClick={handleClearCart}
                            className="text-red-500 hover:text-red-700 flex items-center"
                        >
                            <Trash2 className="w-5 h-5 mr-2" />
                            Clear Cart
                        </button>

                        <div className="text-right">
                            <div className="mb-2">
                                <span className="text-gray-600">Subtotal:</span>
                                <span className="ml-2 font-semibold">${totalPrice.toFixed(2)}</span>
                            </div>
                            {discountedTotal < totalPrice && (
                                <div className="mb-2">
                                    <span className="text-gray-600">Discount:</span>
                                    <span className="ml-2 text-green-600 font-semibold">
                                        -${(totalPrice - discountedTotal).toFixed(2)}
                                    </span>
                                </div>
                            )}
                            <div className="text-xl font-bold">
                                <span className="text-gray-600">Total:</span>
                                <span className="ml-2 text-orange-500">${discountedTotal.toFixed(2)}</span>
                            </div>
                            <Link
                                href="/checkout"
                                className="mt-4 inline-block bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 