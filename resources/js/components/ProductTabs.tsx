import React, { useState } from "react";
import { ReviewList } from "./ReviewList";
import { CommentForm } from "./CommentForm";
import { Product } from "@/types/books";

type Tab = "description" | "addinfo" | "review";
interface ProductTabsProps {
    book: Product;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({ book }) => {
    const [activeTab, setActiveTab] = useState<Tab>("addinfo");

    return (
        <div className="grid md:grid-cols-12 grid-cols-1 mt-6 gap-6">
            {/* Tab Menu */}
            <div className="lg:col-span-3 md:col-span-5">
                <div className="sticky top-20">
                    <ul className="flex-column p-6 bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-800 rounded-md">
                        <li>
                            <button
                                onClick={() => setActiveTab("addinfo")}
                                className={`px-4 py-2 text-start text-base font-semibold rounded-md w-full hover:text-orange-500 duration-500 ${activeTab === "addinfo" ? "text-orange-500" : ""
                                    }`}
                            >
                                Additional Information
                            </button>
                        </li>
                        <li className="mt-3">
                            <button
                                onClick={() => setActiveTab("description")}
                                className={`px-4 py-2 text-start text-base font-semibold rounded-md w-full hover:text-orange-500 duration-500 ${activeTab === "description" ? "text-orange-500" : ""
                                    }`}
                            >
                                Description
                            </button>
                        </li>
                        {/* <li className="mt-3">
                            <button
                                onClick={() => setActiveTab("review")}
                                className={`px-4 py-2 text-start text-base font-semibold rounded-md w-full hover:text-orange-500 duration-500 ${activeTab === "review" ? "text-orange-500" : ""
                                    }`}
                            >
                                Review
                            </button>
                        </li> */}
                    </ul>
                </div>
            </div>

            {/* Tab Content */}
            <div className="lg:col-span-9 md:col-span-7">
                <div className="p-6 bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-800 rounded-md">
                    {activeTab === "description" && (
                        <div>
                            <p className="text-slate-400">
                                {book.description}
                            </p>
                        </div>
                    )}

                    {activeTab === "addinfo" && (
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border border-gray-300 text-sm text-left">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 border-b border-gray-300">Field</th>
                                        <th className="px-4 py-2 border-b border-gray-300">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-gray-200">ISBN</td>
                                        <td className="px-4 py-2 border-b border-gray-200">{book.isbn}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-gray-200">SKU</td>
                                        <td className="px-4 py-2 border-b border-gray-200">{book.sku}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-gray-200">Tags</td>
                                        <td className="px-4 py-2 border-b border-gray-200">{book.tags ? book.tags.join(", ") : "-"}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-gray-200">Weight</td>
                                        <td className="px-4 py-2 border-b border-gray-200">{book.weight} g</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-gray-200">Dimensions</td>
                                        <td className="px-4 py-2 border-b border-gray-200">{book.dimensions} cm</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-gray-200">Binding</td>
                                        <td className="px-4 py-2 border-b border-gray-200">{book.binding}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border-b border-gray-200">Author</td>
                                        <td className="px-4 py-2 border-b border-gray-200">Radian Book Company</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    )}

                    {activeTab === "review" && (
                        <div>
                            {/* Reviews and Comment Form */}
                            {/* <ReviewList /> */}
                            {/* <CommentForm /> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductTabs;
