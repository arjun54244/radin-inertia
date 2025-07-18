import { Product } from "@/types/books";
import Sidebar from "./Sidebar";
import Book from "@/components/frontend/Book";
import { Head, usePage, router } from '@inertiajs/react';
import FrontendLayout from "@/layouts/frontend-layout";
import { useState } from "react";
import { SharedData } from "@/types";




interface BooksPageProps {
    books: Product[];
}

export default function BooksPage({ books }: BooksPageProps) {
    const { auth } = usePage<SharedData>().props;
    const [isAuthenticated, setIsAuthenticated] = useState(!!auth.user);
    const [from, setFrom] = useState(books.length > 0 ? books[0].id : 0);
    const [to, setTo] = useState(books.length > 0 ? books[books.length - 1].id : 0);
    const [total, setTotal] = useState(books.length);
    return (
        <>
            <FrontendLayout>
                <Head title="Books" />
                <div className="relative table w-full py-20 lg:py-24 md:pt-28 bg-gray-50 dark:bg-slate-800">
                    <div className="container justify-center text-center relative">
                        <div className="grid grid-cols-1 mt-14">
                            <h3 className="text-3xl leading-normal font-semibold">All books</h3>
                        </div>

                        <div className="relative mt-3">
                            <ul className="tracking-[0.5px] mb-0 inline-block">
                                <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out hover:text-orange-500"><a href="index.html">Radian</a></li>
                                <li className="inline-block text-base text-slate-950 dark:text-white mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="mdi mdi-chevron-right"></i></li>
                                <li className="inline-block uppercase text-[13px] font-bold text-orange-500" aria-current="page">Shop Grid</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="relative md:py-16 py-8">
                    <div className="w-full mx-auto px-6 relative">
                        <div className="grid md:grid-cols-12 sm:grid-cols-2 grid-cols-1 gap-6">
                            <div className="lg:col-span-3 md:col-span-3">
                                <Sidebar />
                            </div>
                            <div className="lg:col-span-9 md:col-span-9">
                                <ManuCenter from={from} to={to} total={total} />
                                <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                                    {books.length > 0 ? (
                                        books.map((book) => (
                                            <Book key={book.id} isAuthenticated={Boolean(isAuthenticated)} product={book} />
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center py-8">
                                            <p className="text-lg">No books found.</p>
                                        </div>
                                    )}
                                </div>

                                <div className="grid md:grid-cols-12 grid-cols-1 mt-6">
                                    <div className="md:col-span-12 text-center">
                                        <nav aria-label="Page navigation example">
                                            <ul className="inline-flex items-center -space-x-px">
                                                <li>
                                                    <a href="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500 dark:hover:bg-orange-500">
                                                        <i data-feather="chevron-left" className="size-5 rtl:rotate-180 rtl:-mt-1"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500 dark:hover:bg-orange-500">1</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500 dark:hover:bg-orange-500">2</a>
                                                </li>
                                                <li>
                                                    <a href="#" aria-current="page" className="z-10 size-[40px] inline-flex justify-center items-center text-white bg-orange-500 border border-orange-500">3</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500 dark:hover:bg-orange-500">4</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500 dark:hover:bg-orange-500">5</a>
                                                </li>
                                                <li>
                                                    <a href="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 hover:bg-orange-500 dark:hover:bg-orange-500">
                                                        <i data-feather="chevron-right" className="size-5 rtl:rotate-180 rtl:-mt-1"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FrontendLayout>
        </>
    );
}



export function ManuCenter({ from, to, total }: { from: number, to: number, total: number }) {
    const { props } = usePage();
    const books = props.books;
    const searchParams = new URLSearchParams(location.search);
    const currentSort = searchParams.get('sort') || '';

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value;

        const updatedParams = new URLSearchParams(location.search);
        if (newSort) {
            updatedParams.set('sort', newSort);
        } else {
            updatedParams.delete('sort');
        }

        router.get(`${route('books.index')}?${updatedParams.toString()}`, {}, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <div className="md:flex justify-between items-center mb-6">
            <span className="font-semibold">
                Showing {from}–{to} of {total} items
            </span>

            <div className="md:flex items-center">
                <label className="font-semibold md:me-2">Sort by:</label>
                <select
                    value={currentSort}
                    onChange={handleSortChange}
                    className="form-select form-input md:w-36 w-full md:mt-0 mt-1 py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                >
                    {/* <option value="">Featured</option>
                    <option value="sale">Sale</option> */}
                    <option value="az">Alfa A-Z</option>
                    <option value="za">Alfa Z-A</option>
                    <option value="low-high">Price Low-High</option>
                    <option value="high-low">Price High-Low</option>
                </select>
            </div>
        </div>
    );
}

