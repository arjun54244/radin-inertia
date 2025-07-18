import { Link, router, usePage } from "@inertiajs/react";
import { ShoppingCart, Search, Heart, User, HelpCircle, Settings, LogOut, DollarSign, Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavUser } from "../nav-user";
import { useCart } from "@/hooks/useCart";
import { SharedData } from "@/types";
import { useMobileNavigation } from "@/hooks/use-mobile-navigation";
import axios from "axios";
import clsx from "clsx";
import GoogleTranslateSelector from "./GoogleTranslateSelector";


export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };


    useEffect(() => {
        const handleScroll = () => {
            if (typeof window !== "undefined") {
                windowScroll();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    function windowScroll() {
        if (typeof window === "undefined") return;

        const navbar = document.getElementById("topnav");
        if (navbar) {
            if (
                document.body.scrollTop >= 50 ||
                document.documentElement.scrollTop >= 50
            ) {
                navbar.classList.add("nav-sticky");
            } else {
                navbar.classList.remove("nav-sticky");
            }
        }
    }

    return (
        <>
            <div className="tagline bg-slate-900">
                <div className="container relative">
                    <div className="bg-slate-900 overflow-hidden">
                        <style>
                            {`
                            @keyframes marquee {
                                0% { transform: translateX(100%); }
                                100% { transform: translateX(-100%); }
                            }

                            .marquee {
                                display: inline-block;
                                white-space: nowrap;
                                animation: marquee 15s linear infinite;
                            }
                            `}
                        </style>
                        <div className="">
                            <div className="marquee text-white font-medium text-center">
                                Refer a friend & get 30% in credits each 🎉 &nbsp;&nbsp; Refer a friend & get 30% in credits each 🎉 &nbsp;&nbsp;
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <nav id="topnav" className="defaultscroll is-sticky tagline-height" style={{ fontFamily: "Rufina, serif"}}>
                <div className="mx-auto md:px-12 px-4  relative">
                    <Link className="logo" href="/">
                        <div>
                            <img src="/assets/images/logo-dark.svg" className="inline-block dark:hidden w-36 sm:w-44 md:w-52 lg:w-72 max-w-full h-auto" alt="Logo Dark" />
                            <img src="/assets/images/logo-dark.svg" className="hidden dark:inline-block" alt="Logo White" />
                        </div>
                    </Link>
                    <div className="menu-extras">
                        <div className="menu-item">
                            <button className={clsx("navbar-toggle", { open: isOpen })}
                                onClick={toggleMenu} aria-label="Toggle navigation">
                                <div className="lines">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <ul className="buy-button list-none mt-5 flex items-center gap-2">
                         {/* <GoogleTranslateSelector /> */}
                        {/* Search Button */}

                        <ProductSearchDropdown />

                        {/* Cart Button */}
                        <CartDropdown />

                        {/* Wishlist Button */}
                        <li className="inline-block ps-0.5">
                            <Link href="/account/account" className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-orange-500 text-white">
                                <Heart className="w-4 h-4" />
                            </Link>
                        </li>
                        {/* User Menu */}
                        <UserMenu />
                    </ul>
                    <div id="navigation"
                        className={clsx(
                            "transition-all duration-300 w-full",
                            {
                                'block': isOpen,
                                'hidden': !isOpen,
                                'md:block': true 
                            }
                        )} >
                        <ul className="navigation-menu">
                            <li><Link className="sub-menu-item" href="/">Home</Link></li>
                            <li className="has-submenu parent-menu-item">
                                <Link href="/about">About Us</Link>
                            </li>
                            <li className="sub-menu-item">
                                <Link href="/books">All Books</Link>
                            </li>
                            <li className="has-submenu parent-menu-item">
                                <Link href="/current-affairs">Current Affairs</Link>
                            </li>
                            <li className="has-submenu parent-menu-item">
                                <Link href="/blogs">Blogs</Link>
                            </li>
                            <li><Link className="sub-menu-item" href="/contact">Contact</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}




export function CartDropdown() {
    const { data, isLoading, updateQuantity, removeFromCart } = useCart();
    const cartItems = data?.cartItems ?? [];
    const totalPrice = data?.totalPrice ?? 0;
    const countItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { url } = usePage(); // Detect route changes
    const [isCartOpen, setCartOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setCartOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setCartOpen(false);
    }, [url]);

    return (
        <li className="dropdown inline-block relative ps-0.5">
            <button
                onClick={() => setCartOpen(!isCartOpen)}
                className="dropdown-toggle size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-orange-500 border border-orange-500 text-white"
                type="button"
            >
                <ShoppingCart className="w-4 h-4" />
                {countItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {countItems}
                    </span>
                )}
            </button>

            {/* Dropdown menu */}
            {isCartOpen && (
                <div className={`dropdown-menu absolute end-0 m-0 mt-4 z-10 w-64 rounded-md bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-800`} onClick={(e) => e.stopPropagation()} ref={dropdownRef}>
                    <ul className="py-3 text-start">
                        {!isLoading && cartItems.length === 0 && (
                            <li className="py-1.5 px-4 text-center text-sm text-gray-500">Your cart is empty.</li>
                        )}

                        {cartItems.slice(0, 3).map((item, index) => (
                            // center the dev
                            <li key={item.id ?? `cart-item-${index}`} className="flex flex-col items-center">
                                <Link href={`/books/${item.slug}`} className="flex items-center justify-between py-1.5 px-4">
                                    <span className="flex items-center">
                                        <img
                                            src={`/storage/${item.image ?? '/default-product.png'}`}
                                            alt={item.name}
                                            width={36}
                                            height={36}
                                            className="rounded shadow-sm dark:shadow-gray-800 w-9 h-9 object-cover"
                                        />
                                        <span className="ms-3">
                                            <span className="block font-semibold line-clamp-1">{item.name?.substring(0, 40)}</span>
                                            <span className="block text-sm text-slate-400">
                                                ₹{parseFloat(item.price)} × {item.quantity}
                                            </span>
                                        </span>
                                    </span>
                                </Link>
                                <div className="flex gap-1 mt-1 items-center justify-between w-full px-4">
                                    <button
                                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        className="p-1 cursor-pointer border rounded text-orange-500 hover:bg-orange-100 disabled:opacity-50"
                                    >
                                        <Minus size={14} />
                                    </button>
                                    <span className="text-sm w-5 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                        className="p-1 cursor-pointer border rounded text-orange-500 hover:bg-orange-100"
                                    >
                                        <Plus size={14} />
                                    </button>
                                    <button
                                        onClick={() => removeFromCart(item.product_id)}
                                        className="ml-3 cursor-pointer p-1 text-red-500 hover:bg-red-100 rounded"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                    <span className="text-sm ml-auto text-orange-500 font-semibold ms-2">
                                        ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            </li>
                        ))}

                        {cartItems.length > 0 && (
                            <>
                                <li className="border-t border-gray-100 dark:border-gray-800 my-2" />

                                <li className="flex items-center justify-between py-1.5 px-4">
                                    <h6 className="font-semibold mb-0">Total:</h6>
                                    <h6 className="font-semibold mb-0">₹{totalPrice.toFixed(2)}</h6>
                                </li>

                                <li className="py-1.5 px-4">
                                    <span className="text-center block space-x-1">
                                        <Link href="/cart/view" className="py-[5px] px-4 inline-block font-semibold tracking-wide duration-500 text-sm text-center rounded-md bg-orange-500 border border-orange-500 text-white">
                                            View Cart
                                        </Link>
                                        <Link href="/checkout" className="py-[5px] px-4 inline-block font-semibold tracking-wide duration-500 text-sm text-center rounded-md bg-orange-500 border border-orange-500 text-white">
                                            Checkout
                                        </Link>
                                    </span>
                                    <p className="text-sm text-slate-400 mt-1 text-center">*T&C Apply</p>
                                </li>
                                {cartItems.length > 3 && (
                                    <li className="px-4 pt-2 text-xs text-center text-gray-500 italic">
                                        + More items in your cart. Visit cart page to review all items.
                                    </li>
                                )}
                            </>
                        )}
                    </ul>
                </div>
            )}
        </li>
    );
}



export function UserMenu() {
    const { auth } = usePage<SharedData>().props;
    const [isUserMenuOpen, setUserMenuOpen] = useState(false);
    const cleanup = useMobileNavigation();
    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { url } = usePage(); // Detect route changes

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setUserMenuOpen(false);
    }, [url]);

    if (auth.user) {
        const avatar = auth.user.avatar || "/placeholder-avatar.jpg"; // fallback avatar

        return (
            <li className="dropdown inline-block relative ps-0.5">
                <button
                    onClick={() => setUserMenuOpen(!isUserMenuOpen)}
                    className="dropdown-toggle items-center"
                >
                    <span className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full border border-orange-500 bg-orange-500 text-white">
                        <img src={avatar} className="w-8 h-8 rounded-full object-cover" alt="User Avatar" />
                    </span>
                </button>

                {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 shadow-md p-2 rounded-md z-50" ref={dropdownRef}>
                        <ul>
                            <li className="py-2 px-4 text-sm">Welcome, {auth.user.name}!</li>
                            <li className="py-2 px-4 flex items-center cursor-pointer hover:text-orange-500 text-sm">
                                <User className="w-4 h-4 mr-2" />
                                <Link href="/account/account">Account</Link>
                            </li>
                            <li className="py-2 px-4 flex items-center cursor-pointer hover:text-orange-500 text-sm">
                                <HelpCircle className="w-4 h-4 mr-2" />
                                <Link href="/help">Helpcenter</Link>
                            </li>
                            <li className="py-2 px-4 flex items-center cursor-pointer hover:text-orange-500 text-sm">
                                <Settings className="w-4 h-4 mr-2" />
                                <Link href={route('profile.edit')} prefetch onClick={cleanup}>Settings</Link>
                            </li>
                            <li className="border-t border-gray-100 my-2"></li>
                            <li className="py-2 px-4 flex items-center cursor-pointer hover:text-orange-500 text-sm"
                            >
                                <Link className="flex items-center" method="post" href={route('logout')} as="button" onClick={handleLogout}>

                                    <LogOut className="w-4 h-4 mr-2" />
                                    LogOut
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </li>
        );
    }

    return (
        <li className="inline-block ps-0.5">
            <Link href="/login" className="bg-orange-500 text-white text-sm font-medium px-4 py-1.5 rounded hover:bg-orange-400 transition disabled:opacity-50 disabled:cursor-not-allowed">
                Login
            </Link>
        </li>
    );
}


interface Product {
    id: number
    name: string
    slug: string
    sku: string
}

export function ProductSearchDropdown() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [isSearchOpen, setSearchOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const { url } = usePage();

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close on route change
    useEffect(() => {
        setSearchOpen(false);
    }, [url]);

    // Debounced search
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const trimmedQuery = query.trim();
            if (trimmedQuery.length < 3) {
                setResults([]);
                return;
            }

            const fetchProducts = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`/api/search-products?q=${trimmedQuery}`, {
                        headers: {
                            Accept: "application/json",
                            "X-Requested-With": "XMLHttpRequest",
                        },
                    });
                    setResults(response.data);
                } catch (error) {
                    console.error("Search failed:", error);
                    setResults([]);
                } finally {
                    setLoading(false);
                }
            };

            fetchProducts();
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    return (
        <>
            {/* Search Button */}
            <li className="inline-block relative pe-1">
                <button
                    onClick={() => setSearchOpen((prev) => !prev)}
                    className="inline-flex items-center justify-center p-2 rounded-full bg-orange-300 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition"
                    aria-label="Toggle Search"
                >
                    <Search className="w-5 h-5 text-gray-700" />
                </button>
                {/* Dropdown */}
                {isSearchOpen && (
                    <div
                        ref={dropdownRef}
                        className="absolute mt-2 w-72 sm:w-72 left-1/2 sm:left-auto sm:right-0 transform -translate-x-1/2 sm:translate-x-0 bg-white dark:bg-slate-900 shadow-lg rounded-md p-3 z-50"
                    >
                        {/* Input */}
                        <div className="relative">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full p-2 pr-8 border border-gray-300 dark:border-slate-700 rounded-md text-sm bg-white dark:bg-slate-800 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-400"
                                placeholder="Search product name or SKU..."
                            />
                            <Search className="absolute w-4 h-4 top-3 right-3 text-gray-400" />
                        </div>

                        {/* Loading */}
                        {loading && <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">Searching...</p>}

                        {/* Results */}
                        {!loading && results.length > 0 && (
                            <ul className="mt-3 max-h-60 overflow-y-auto text-sm divide-y divide-gray-200 dark:divide-slate-700">
                                {results.map((product) => (
                                    <li key={product.id} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded cursor-pointer">
                                        <Link href={`/books/${product.slug}`} className="block">
                                            <strong>{product.name}</strong>
                                            <div className="text-xs text-gray-500 dark:text-slate-400">SKU: {product.sku}</div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* No Results */}
                        {query.length > 2 && !loading && results.length === 0 && (
                            <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">No products found.</p>
                        )}
                    </div>
                )}
            </li>


        </>
    );
}
