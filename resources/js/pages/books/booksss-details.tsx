import FrontendLayout from "@/layouts/frontend-layout";
import { Product } from "@/types/books";
import { Head } from "@inertiajs/react";
import { Minus, Plus, Star } from "lucide-react";
import Slider from "react-slick";

interface BookDetailPageProps {
  book: Product;
}

export default function BookDetails({ book }: BookDetailPageProps) {
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
        <div className="relative table w-full py-20 lg:py-24 md:pt-28 bg-gray-50 dark:bg-slate-800">
          <div className="container relative">
            <div className="grid grid-cols-1 mt-14">
              <h3 className="text-3xl leading-normal font-semibold">Book Details</h3>
            </div>

            <div className="relative mt-3">
              <ul className="tracking-[0.5px] mb-0 inline-block">
                <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out hover:text-orange-500"><a href="/">Home</a></li>
                <li className="inline-block text-base text-slate-950 dark:text-white mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="mdi mdi-chevron-right"></i></li>
                <li className="inline-block uppercase text-[13px] font-bold text-orange-500" aria-current="page">Book Details</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container px-4 py-10">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <Slider {...sliderSettings}>
                {images.map((image, index) => (
                  <div key={index} className="aspect-square overflow-hidden">
                    <img
                      src={`/storage/${image}`}
                      alt={book.name}
                      width={500}
                      height={500}
                      className="rounded shadow object-contain w-full h-full"
                    />
                  </div>
                ))}
              </Slider>
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-2">{book.name}</h1>

              {book.type === "downloadable" && (
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded mb-2">
                  Downloadable eBook
                </span>
              )}

              <div className="flex items-center mb-3">
                {parseFloat(book.price) > parseFloat(book.discounted_price) && (
                  <span className="text-gray-400 line-through mr-2">
                    ₹{parseFloat(book.price).toFixed(2)}
                  </span>
                )}
                <span className="text-orange-600 font-semibold text-lg">
                  ₹{parseFloat(book.discounted_price).toFixed(2)}
                </span>
              </div>

              <div className="flex items-center mb-4">
                {/* loop through the rating and display stars */}
                {Array.from({ length: Math.round(book.rating) }).map((_, index) => (
                  <span className="ml-2 text-gray-600 font-medium">
                    <Star key={index} className="text-yellow-400" />
                  </span>
                ))}
              </div>

              <p className="mb-4 text-gray-700">{book.description}</p>

              {/* <div className="flex items-center mb-6">
                <button onClick={decreaseQuantity} className="p-2 border rounded-l">
                  <Minus />
                </button>
                <span className="px-4 border-t border-b">{quantity}</span>
                <button onClick={increaseQuantity} className="p-2 border rounded-r">
                  <Plus />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={cartLoading}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded shadow transition duration-200"
              >
                {cartLoading ? "Adding..." : "Add to Cart"}
              </button> */}

              <div className="mt-6 text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Pages:</strong> {book.pages}
                </p>
                <p>
                  <strong>Weight:</strong> {book.weight}
                </p>
                <p>
                  <strong>Dimensions:</strong> {book.dimensions}
                </p>
                <p>
                  <strong>Binding:</strong> {book.binding}
                </p>
                <p>
                  <strong>SKU:</strong> {book.sku}
                </p>
                <p>
                  <strong>Published At:</strong> {book.published_at}
                </p>
              </div>
            </div>
          </div>
        </div>
      </FrontendLayout>
    </>
  );
}