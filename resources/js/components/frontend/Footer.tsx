import React from 'react'
import { Link } from "@inertiajs/react";
import { Dribbble, Linkedin, Facebook, Instagram, Youtube, Twitter, Mail, Package, DollarSign, ShieldCheck, Heart, ChevronRight, MapPin, Phone, Truck, RotateCcw, Wallet, Headphones } from "lucide-react";
import  AskAI  from "@/components/frontend/AskAI";
export default function Footer() {
    const explore = [
        { name: "Home", link: "/" },
        { name: "About", link: "/about" },
        { name: "Current Affairs", link: "/current-affairs" },
        { name: "All Books", link: "/books" },
        { name: "Blogs", link: "/blogs" },
        { name: "Contact", link: "/contact" },
    ]
    const categories = [
        { name: "JNV-Sainik-RMS", link: "/JNV-Sainik-RMS" },
        { name: "Books-All-Competitions", link: "/Books-All-Competitions" },
        { name: "SSC-Exams", link: "/SSC-Exams" },
        { name: "Defence", link: "/Defence" },
        { name: "Railway-Exams", link: "/Railway-Exams" },
        { name: "CUET-Exams", link: "/CUET-Exams" },
    ]
    const socialLinks = [
        { name: "Facebook", icon: Facebook, link: "https://www.facebook.com/radianbooks" },
        { name: "Instagram", icon: Instagram, link: "https://www.instagram.com/radianbooks" },
        { name: "LinkedIn", icon: Linkedin, link: "https://in.linkedin.com/company/radian-books" },
        { name: "Youtube", icon: Youtube, link: "https://www.youtube.com/@RadianLearning" },
        { name: "Mail", icon: Mail, link: "mailto:support@radianbooks.com" },
    ];
    return (
        <footer className="footer bg-slate-900 dark:bg-slate-800 relative text-gray-200 dark:text-gray-200">
            <div className="container relative">
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <div className="py-[40px] px-0">
                            <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
                                <div className="lg:col-span-3 md:col-span-12">
                                    <a href="#" className="text-[22px] focus:outline-none">
                                        <img src="assets/images/logo-white.svg" alt="" />
                                    </a>
                                    <p className="mt-6 text-gray-300">The Radian Learning Pvt Ltd is a Delhi-based firm, publishing books for school level as well as the leading competitive exams in India.</p>
                                    <ul className="flex space-x-2">
                                        {socialLinks.map(({ name, icon: Icon, link }) => (
                                            <li key={name} className="inline">
                                                <a
                                                    href={link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="size-8 inline-flex items-center justify-center tracking-wide align-middle text-base border border-gray-800 dark:border-slate-800 rounded-md hover:text-orange-500 dark:hover:text-orange-500 text-slate-300"
                                                >
                                                    <Icon className="h-4 w-4 align-middle" aria-label={name} />
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="lg:col-span-6 md:col-span-12">
                                    <h5 className="tracking-[1px] text-gray-100 font-semibold">Explore</h5>

                                    <div className="grid md:grid-cols-12 grid-cols-1">
                                        <div className="md:col-span-4">
                                            <ul className="list-none footer-list mt-6">
                                                {explore.map((item) => (
                                                    <li key={item.name}>
                                                        <Link href={item.link} className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out">
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="md:col-span-4">
                                            <ul className="list-none footer-list mt-6">
                                                {categories.map((item) => (
                                                    <li key={item.name}>
                                                        <Link href={item.link} className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out">
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="md:col-span-4">
                                            <ul className="list-none footer-list mt-6">
                                                <h5 className="tracking-[1px] text-gray-100 font-semibold">Customer Service</h5>
                                                <li className="mt-[10px]"><Link href="/contact" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><i className="mdi mdi-chevron-right"></i> Help Center </Link></li>
                                                <li className="mt-[10px]"><Link href="/terms/refund-return-policy" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><i className="mdi mdi-chevron-right"></i> Refund & Return Policy</Link></li>
                                                <li className="mt-[10px]"><Link href="/terms/terms-conditions" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><i className="mdi mdi-chevron-right"></i> Terms and Conditions</Link></li>
                                                <li className="mt-[10px]"><Link href="/terms/disclaimer" className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out"><i className="mdi mdi-chevron-right"></i> Disclaimer</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-3 md:col-span-4">
                                    <h5 className="tracking-[1px] text-gray-100 font-semibold">Contact Info</h5>
                                    <p className="mt-6"></p>
                                    {/*<form>
                                        <div className="grid grid-cols-1">
                                            <div className="my-3">
                                                <label className="form-label">Write your email <span className="text-red-600">*</span></label>
                                                <div className="form-icon relative mt-2">
                                                    <i data-feather="mail" className="size-4 absolute top-3 start-4"></i>
                                                    <input type="email" className="ps-12 rounded w-full py-2 px-3 h-10 bg-gray-800 border-0 text-gray-100 focus:shadow-none focus:ring-0 placeholder:text-gray-200 outline-none" placeholder="Email" name="email" required />
                                                </div>
                                            </div>

                                            <button type="submit" id="submitsubscribe" name="send" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center bg-orange-500 text-white rounded-md">Subscribe</button>
                                        </div>
                                    </form> */}
                                    <div className="text-slate-400 space-y-4">
                                        <div className="flex items-start space-x-2">
                                            <MapPin className="w-5 h-5 text-orange-500 mt-1" />
                                            <div>
                                                <p>Plot No 37, Kailash Enclave, Pitampura</p>
                                                <p>New Delhi, 110034 – India</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-2">
                                            <Phone className="w-5 h-5 text-orange-500 mt-1" />
                                            <div>
                                                <p>Call us now:</p>
                                                <p>
                                                    <a href="tel:+919811341569" className="hover:text-orange-500">+91 9811341569</a>
                                                </p>
                                                <p>
                                                    <a href="tel:+918287221185" className="hover:text-orange-500">+91 8287221185</a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1">
                    <div className="py-[30px] px-0 border-t border-slate-800 dark:border-slate-700">
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">

                            {/* Free Shipping */}
                            <div className="flex items-center lg:justify-center">
                                <Truck className="h-5 w-5 me-2 text-orange-500" />
                                <div>
                                    <h6 className="mb-0 font-medium text-white">Free shipping</h6>
                                    <p className="text-sm text-slate-400">On All Orders Above ₹750/-</p>
                                </div>
                            </div>

                            {/* Money-back Guarantee */}
                            <div className="flex items-center lg:justify-center">
                                <RotateCcw className="h-5 w-5 me-2 text-orange-500" />
                                <div>
                                    <h6 className="mb-0 font-medium text-white">Money back guarantee</h6>
                                    <p className="text-sm text-slate-400">100% money back guarantee</p>
                                </div>
                            </div>

                            {/* Cash on Delivery */}
                            <div className="flex items-center lg:justify-center">
                                <Wallet className="h-5 w-5 me-2 text-orange-500" />
                                <div>
                                    <h6 className="mb-0 font-medium text-white">Cash on delivery</h6>
                                    <p className="text-sm text-slate-400">Available All Over India</p>
                                </div>
                            </div>

                            {/* Help & Support */}
                            <div className="flex items-center lg:justify-center">
                                <Headphones className="h-5 w-5 me-2 text-orange-500" />
                                <div>
                                    <h6 className="mb-0 font-medium text-white">Help & Support</h6>
                                    <p className="text-sm text-slate-400">Call us: +91 9318324100</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="py-[30px] px-0 border-t border-slate-800 dark:border-slate-700">
                <div className="container relative text-center">
                    <div className="grid md:grid-cols-2 items-center">
                        {/* Copyright Section */}
                        <div className="md:text-start text-center">
                            <p className="mb-0">
                                © {new Date().getFullYear()} Radian Learning Pvt Ltd. Designed & Developed by {" "}
                                <a
                                    href="https://digitechhealthcare.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-reset font-medium hover:text-orange-500"
                                >
                                    DigiTech
                                </a>
                                .
                            </p>
                        </div>

                        {/* Payment Methods */}
                        <ul className="list-none md:text-end text-center mt-6 md:mt-0">
                            <li className="inline"><a href="#"><img src="assets/images/payments/american-express.jpg" className="max-h-6 rounded inline" title="American Express" alt="" /></a></li>
                            <li className="inline"><a href="#"><img src="assets/images/payments/discover.jpg" className="max-h-6 rounded inline" title="Discover" alt="" /></a></li>
                            <li className="inline"><a href="#"><img src="assets/images/payments/mastercard.jpg" className="max-h-6 rounded inline" title="Master Card" alt="" /></a></li>
                            <li className="inline"><a href="#"><img src="assets/images/payments/paypal.jpg" className="max-h-6 rounded inline" title="Paypal" alt="" /></a></li>
                            <li className="inline"><a href="#"><img src="assets/images/payments/visa.jpg" className="max-h-6 rounded inline" title="Visa" alt="" /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
