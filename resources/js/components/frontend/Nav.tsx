"use client";
import { Link, router, usePage } from "@inertiajs/react";
import { ShoppingCart, Search, Heart, User, HelpCircle, Settings, LogOut, DollarSign } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavUser } from "../nav-user";
import { useCart } from "@/hooks/useCart";
import { SharedData } from "@/types";
import { useMobileNavigation } from "@/hooks/use-mobile-navigation";



export default function Nav() {
    const [isSearchOpen, setSearchOpen] = useState(false);
    const { auth } = usePage<SharedData>().props;
    console.log("auth", auth.user);

    const { items } = useCart();
    const isClient = useRef(typeof window !== "undefined");

    const countItems = items.reduce((total, item) => total + item.quantity, 0);

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
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
                    <div className="grid grid-cols-1">
                        <div className="text-center">
                            <h6 className="text-white font-medium">Refer a friend & get 50% in credits each 🎉</h6>
                        </div>
                    </div>
                </div>
            </div>
            <nav id="topnav" className="defaultscroll is-sticky tagline-height">
                <div className="container relative">
                    <Link className="logo" href="/">
                        <div>
                            <img src="/assets/images/logo-dark.svg" className="inline-block dark:hidden" alt="Logo Dark" />
                            <img src="/assets/images/logo-dark.svg" className="hidden dark:inline-block" alt="Logo White" />
                        </div>
                    </Link>
                    <div className="menu-extras">
                        <div className="menu-item">
                            <button className={`navbar-toggle ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
                                <div className="lines">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </button>
                        </div>
                    </div>

                    <ul className="buy-button list-none mt-5 flex items-center gap-2">
                        {/* Search Button */}
                        <li className="dropdown inline-block relative pe-1">
                            <button onClick={() => setSearchOpen(!isSearchOpen)} className="inline-flex">
                                <Search className="w-5 h-5" />
                            </button>
                            {isSearchOpen && (
                                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 shadow-md p-2 rounded-md">
                                    <div className="relative">
                                        <Search className="absolute w-4 h-4 top-2 right-3" />
                                        <input type="text" className="w-full p-2 border rounded-md" placeholder="Search..." />
                                    </div>
                                </div>
                            )}
                        </li>

                        {/* Cart Button */}
                        <CartDropdown />

                        {/* Wishlist Button */}
                        <li className="inline-block ps-0.5">
                            <button className="size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-orange-500 text-white">
                                <Heart className="w-4 h-4" />
                            </button>
                        </li>
                        {/* User Menu */}
                        <UserMenu />
                    </ul>

                    <div id="navigation">
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
    const [isCartOpen, setCartOpen] = useState(false);
    const { items } = useCart();

    const countItems = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <li className="dropdown inline-block relative ps-0.5">
            <button
                onClick={() => setCartOpen(!isCartOpen)}
                className="dropdown-toggle size-9 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-base text-center rounded-full bg-orange-500 border border-orange-500 text-white"
            >
                <ShoppingCart className="w-4 h-4" />
                {countItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {countItems}
                    </span>
                )}
            </button>

            {/* Cart Dropdown */}
            {isCartOpen && (
                <div className="dropdown-menu absolute end-0 mt-4 z-10 w-64 rounded-md bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-800">
                    <ul className="py-3 text-start">
                        {items.length > 0 ? (
                            items.map((item) => (
                                <li key={item.id} className="flex items-center justify-between py-1.5 px-4">
                                    <span className="flex items-center">
                                        <img
                                            src={`${import.meta.env.APP_URL}/storage/${item.product.images?.[0] || "placeholder.jpg"}`}
                                            alt={item.product.name}
                                            className="w-9 h-9 object-cover rounded"
                                        />
                                        <span className="ml-3 text-sm">
                                            <span className="font-semibold block truncate">{item.product.name}</span>
                                            <span className="text-gray-400 text-xs">
                                                ₹{item.discounted_price} x {item.quantity}
                                            </span>
                                        </span>
                                    </span>
                                    <span className="font-semibold text-sm">
                                        ₹{(parseFloat(item.discounted_price) * item.quantity).toFixed(2)}
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li className="py-1.5 px-4 text-center text-gray-500">Cart is empty</li>
                        )}

                        {items.length > 0 && (
                            <>
                                <li className="flex items-center justify-between py-1.5 px-4 border-t">
                                    <span>Total:</span>
                                    <span className="font-semibold text-orange-600">
                                        ₹
                                        {items
                                            .reduce(
                                                (total, item) =>
                                                    total + parseFloat(item.discounted_price) * item.quantity,
                                                0
                                            )
                                            .toFixed(2)}
                                    </span>
                                </li>
                                <li className="flex items-center justify-between gap-2 py-2 px-4">
                                    <Link
                                        href="/cart"
                                        className="w-1/2 text-center bg-orange-500 hover:bg-orange-600 text-white py-1.5 rounded-md text-sm"
                                    >
                                        View Cart
                                    </Link>
                                    <Link
                                        href="/checkout"
                                        className="w-1/2 text-center bg-orange-500 hover:bg-orange-600 text-white py-1.5 rounded-md text-sm"
                                    >
                                        Checkout
                                    </Link>
                                </li>
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
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 shadow-md p-2 rounded-md z-50">
                        <ul>
                            <li className="py-2 px-4 text-sm">Welcome, {auth.user.name}!</li>
                            <li className="py-2 px-4 flex items-center text-sm">
                                <DollarSign className="w-4 h-4 mr-2" />
                                Balance: <span className="text-orange-500 ml-2">₹0.00</span>
                            </li>
                            <li className="py-2 px-4 flex items-center cursor-pointer hover:text-orange-500 text-sm">
                                <User className="w-4 h-4 mr-2" />
                                <Link href="/account">Account</Link>
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
            <Link href="/login" className="btn btn-primary btn-sm">
                Login
            </Link>
        </li>
    );
}