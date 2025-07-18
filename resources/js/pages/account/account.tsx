import { Link, useForm, usePage } from "@inertiajs/react";
import AccountLayout from "./account-layout";
import { Heart, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { FavouriteItems } from "@/components/frontend/likedProducts";

type Product = {
    id: number;
    name: string;
    slug: string;
    discounted_price: number | null;
    price: number;
    images?: string[];
};

type OrderItem = {
    quantity: number;
    unit_price: number;
    product: Product;
};

type Order = {
    id: number;
    number: string;
    created_at: string;
    status: string;
    total_price: number;
    items: OrderItem[];
};

type Props = {
    orders: Order[];
    likedProducts: Product[];
};
export default function Account({ orders, likedProducts }: Props) {

    return (
        <>
            <AccountLayout>
                <div className="lg:w-3/4 md:w-2/3 md:px-3 mt-6 md:mt-0">
                    <h5 className="text-lg font-semibold mb-6">My Orders</h5>
                    <div className="relative overflow-x-auto shadow-sm dark:shadow-gray-800 rounded-md">
                        <table className="w-full text-start text-slate-500 dark:text-slate-400">
                            <thead className="text-sm uppercase bg-slate-50 dark:bg-slate-800">
                                <tr className="text-start">
                                    <th scope="col" className="px-2 py-3 text-start">Order no.</th>
                                    <th scope="col" className="px-2 py-3 text-start">Date</th>
                                    <th scope="col" className="px-2 py-3 text-start">Status</th>
                                    <th scope="col" className="px-2 py-3 text-start">Total</th>
                                    {/* <th scope="col" className="px-2 py-3 text-start">Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="bg-white dark:bg-slate-900 text-start">
                                        <th className="px-2 py-3 text-start" scope="row">{order.number}</th>
                                        <td className="px-2 py-3 text-start">{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td className={`px-2 py-3 text-start  ${order.status == "pending" ? "text-gray-600" :
                                            order.status == "processing" ? "text-yellow-600" :
                                                order.status == "completed" ? "text-green-600" :
                                                    order.status == "declined" ? " text-red-600" :
                                                        "text-gray-600"}`}>{order.status}</td>
                                        <td className="px-2 py-3 text-start"> ₹{order.total_price}<span className="text-slate-400">for {order.items.length} items</span></td>
                                        {/* <td className="px-2 py-3 text-start"> 
                                            <Link href={`/account/orders/${order.id}`} className="text-orange-500">View <i className="mdi mdi-chevron-right"></i></Link></td> */}
                                    </tr>
                                ))}
                                {orders.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center py-4 text-slate-400">
                                            No orders found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <FavouriteItems initialLikedProducts={likedProducts} />
                </div>
            </AccountLayout>
        </>
    )
}


