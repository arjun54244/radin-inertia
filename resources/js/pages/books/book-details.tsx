import FrontendLayout from "@/layouts/frontend-layout";
import { Product } from "@/types/books";
import { Head } from "@inertiajs/react";
import { Minus, Plus, Star } from "lucide-react";
import Slider from "react-slick";
import BookImageSlider from "./BookImageSlider";
import ProductTabs from "@/components/ProductTabs";
import Book from "@/components/frontend/Book";

interface BookDetailPageProps {
  book: Product;
  newbooks: Product[];
}

export default function BookDetails({ book, newbooks }: BookDetailPageProps) {
  console.log(book);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const images: string[] = Array.isArray(book.images)
    ? book.images
    : JSON.parse(book.images || "[]");

  return (
    <>
      <FrontendLayout>
        <Head title="Book Details" />
        <section className="relative table w-full py-20 lg:py-24 md:pt-28 bg-gray-50 dark:bg-slate-800">
          <div className="container relative">
            <div className="grid grid-cols-1 mt-14">
              <h3 className="text-3xl leading-normal font-semibold">Book Details</h3>
            </div>

            <div className="relative mt-3">
              <ul className="tracking-[0.5px] mb-0 inline-block">
                <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out hover:text-orange-500"><a href="/">Home</a></li>
                <li className="inline-block text-base text-slate-950 dark:text-white mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="mdi mdi-chevron-right"></i></li>
                <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out hover:text-orange-500"><a href="/books">Store</a></li>
                <li className="inline-block text-base text-slate-950 dark:text-white mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="mdi mdi-chevron-right"></i></li>
                <li className="inline-block uppercase text-[13px] font-bold text-orange-500" aria-current="page">Book Detail</li>
              </ul>
            </div>
          </div>
        </section>



        <section className="relative md:py-24 py-16">
          <div className="container relative">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 items-center">
              <BookImageSlider images={images} bookName={book.name} />

              <div className="">
                <h5 className="text-2xl font-semibold">{book.name}</h5>
                <div className="mt-2">

                  <span className="text-slate-400 font-semibold me-1">₹{parseFloat(book.discounted_price)}<del className="text-red-600">₹{parseFloat(book.price)} </del></span>

                  <ul className="list-none inline-block text-orange-400">
                    {Array.from({ length: Math.round(book.rating) }).map((_, index) => (
                      <li key={index} className="inline"><i className="mdi mdi-star text-lg"></i></li>
                    ))}
                    <li className="inline text-slate-400 font-semibold">  ({book.rating})</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h5 className="text-lg font-semibold">Overview :</h5>
                  <p className="text-slate-400 mt-2">
                    {book.description}
                  </p>

                  {/* <ul className="list-none text-slate-400 mt-4">
                    <li className="mb-1 flex"><i className="mdi mdi-check-circle-outline text-orange-500 text-xl me-2"></i> Digital Marketing Solutions for Tomorrow</li>
                    <li className="mb-1 flex"><i className="mdi mdi-check-circle-outline text-orange-500 text-xl me-2"></i> Our Talented & Experienced Marketing Agency</li>
                    <li className="mb-1 flex"><i className="mdi mdi-check-circle-outline text-orange-500 text-xl me-2"></i> Create your own skin to match your brand</li>
                  </ul> */}
                </div>

                <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-4">

                  <div className="flex items-center">
                    <h5 className="text-lg font-semibold me-2">Quantity:</h5>
                    <div className="qty-icons ms-3 space-x-0.5">
                      <button className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white minus">-</button>
                      <input min="0" name="quantity" value="0" type="number" className="h-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white pointer-events-none w-16 ps-4 quantity" />
                      <button className="size-9 inline-flex items-center justify-center tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white plus">+</button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-x-1">
                  <a href="#" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle text-base text-center bg-orange-500 text-white rounded-md mt-2">Shop Now</a>
                  <a href="#" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle text-base text-center rounded-md bg-orange-500/5 hover:bg-orange-500 text-orange-500 hover:text-white mt-2">Add to Cart</a>
                </div>
              </div>
            </div>

            <ProductTabs book={book} />
          </div>

          <div className="container lg:mt-24 mt-16">
            <div className="grid grid-cols-1 mb-6 text-center">
              <h3 className="font-semibold text-3xl leading-normal">New Books</h3>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 pt-6">
              {newbooks.length > 0 ? (
                newbooks.map((newbook) => (
                  <Book key={newbook.id} product={newbook} />
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <p className="text-lg">No books found.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </FrontendLayout>
    </>
  );
}