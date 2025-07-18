import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";

const categories = [
    "JNV-Sainik-RMS",
    "Books-All-Competitions",
    "SSC-Exams",
    "Defence",
    "Railway-Exams",
    "CUET-Exams"
];

const states = [
    "UP", "Haryana", "Bihar", "Rajasthan", "MP", "Delhi", "Uttarakhand"
];

export function Brands({ title, items, filterKey }: { title: string, items: string[], filterKey: string }) {
    const searchParams = new URLSearchParams(location.search);
    const active = searchParams.get(filterKey);

    return (
        <div className="mt-4">
            <h5 className="font-medium">{title}:</h5>
            <ul className="list-none mt-2">
                {items.map((label) => {
                    const query = new URLSearchParams();
                    query.set(filterKey, label);
                    return (
                        <li key={label}>
                            <Link
                                href={`?${query.toString()}`}
                                className={`block px-2 py-1 rounded ${active === label ? 'bg-orange-500 text-white' : 'text-slate-800 dark:text-gray-100'
                                    }`}
                            >
                                <i className={`mdi mdi-bookmark-outline text-orange-500 me-2 ${active === label ? 'bg-orange-500 text-white' : 'text-slate-800 dark:text-gray-100'}`}></i> {label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default function Sidebar() {
    return (
        <div className="rounded shadow-sm dark:shadow-gray-800 p-4 sticky top-20">
            <h5 className="text-xl font-medium">Shopping Options</h5>

            <SearchBox />

            <Brands title="Book Category" items={categories} filterKey="category" />
            <Brands title="State Category" items={states} filterKey="state" />
        </div>
    );
}
interface Product {
    id: number;
    name: string;
    slug: string;
    sku: string;
}

export function SearchBox() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        if (query.trim().length <= 1) {
            setResults([]);
            return;
        }

        const delayDebounce = setTimeout(() => {
            setLoading(true);
            axios
                .get(`/api/search-products?q=${encodeURIComponent(query)}`)
                .then((res) => setResults(res.data))
                .catch(() => setResults([]))
                .finally(() => setLoading(false));
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query]);
    useEffect(() => {
        setShowResults(isFocused && results.length > 0);
    }, [isFocused, results]);
    return (
        <div className="relative mt-4">
            <label htmlFor="searchItem" className="font-medium">Search:</label>
            <div className="relative mt-2">
                <i className="absolute size-4 top-[9px] end-4 mdi mdi-magnify"></i>
                <input
                    type="text"
                    id="searchItem"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)} // delayed to allow link click
                    className="h-9 pe-10 rounded px-3 w-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 focus:ring-0 outline-none"
                    placeholder="Search for books or SKU..."
                />

                {loading && (
                    <div className="absolute top-full left-0 w-full bg-white text-sm px-3 py-1 border dark:bg-slate-800 dark:text-white">
                        Searching...
                    </div>
                )}

                {showResults && (
                    <ul className="absolute top-full left-0 z-10 w-full bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 mt-1 rounded shadow max-h-60 overflow-y-auto scroll-smooth">
                        {results.map((product) => (
                            <li key={product.id}>
                                <a
                                    href={`/books/${product.slug}`}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    {product.name} <span className="text-xs text-gray-400">({product.sku})</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}