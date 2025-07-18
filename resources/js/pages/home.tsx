import { ThumbsUp, School, Users, BookOpen, } from "lucide-react";
import { Head, Link, usePage } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';
import BannerSlider from '@/components/frontend/banner-slider';
import { categoryBooksShopByCategories, categoryBooksShopByState, testimonials } from '@/components/homedata';
import YouTubeTestimonialsGrid from '@/components/frontend/Testimonials';
import ShopByCategory from '@/components/frontend/shop-by-category';
import TestimonialsCards from '@/components/frontend/testimonials-with-cards';
import { Product } from '@/types/books';
import YouTubeSection from '@/components/frontend/YouTubeSection';
import { useEffect, useState } from "react";
import Popup from "@/components/frontend/popup";
import { SharedData } from "@/types";

interface Banner {
  id: number
  title?: string
  images: string[]
  link?: string
}
interface Testimonial {
  id: number
  designation: string
  name: string
  review: string
  rating: string
  company: string
  image?: string
}

interface HomeProps {
  banners: Banner[]
  testimonials: Testimonial[]
  categoriesShopByCategories: string[]
  categoryBooksShopByCategories: {
    [key: string]: Product[]
  }
  categoriesShopByState: string[]
  categoryBooksShopByState: {
    [key: string]: Product[]
  }
  latestBooks: string[];
  latestBooksArray: {
    [key: string]: Product[]
  }
  youtubeVideoIds: string[];
  youtubeMensa: string[];
}


export default function Home({
  banners,
  testimonials,
  categoriesShopByCategories,
  categoryBooksShopByCategories,
  categoriesShopByState,
  categoryBooksShopByState,
  latestBooks,
  latestBooksArray,
  youtubeVideoIds,
  youtubeMensa,
}: HomeProps) {
  const [showPopup, setShowPopup] = useState(false);
  const { auth } = usePage<SharedData>().props;
  const [isAuthenticated, setIsAuthenticated] = useState(!!auth.user);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowPopup(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);
  return (
    <>
      <Head title="Home" />
      <FrontendLayout>
        {showPopup && <Popup />}
        <h1 className="mb-6 text-center text-3xl font-bold">Banner Auto Slider</h1>
        <section className="mx-auto mt-10 sm:mt-16 md:mt-24 lg:mt-24">
          <BannerSlider banners={banners} interval={5000} pauseOnHover={true} />
          <FeaturedSection />
        </section>

        <ShopByCategory isAuthenticated={Boolean(isAuthenticated)} categories={categoriesShopByCategories} categoryBooks={categoryBooksShopByCategories}
          header="Shop By Categories"
        />
        <YouTubeSection title="Watch Our Videos" videoIds={youtubeVideoIds} />
        <ShopByCategory categories={categoriesShopByState} categoryBooks={categoryBooksShopByState} header='Shop By State' />
        <TestimonialsCards title='Student Reviews' tagline="" testimonials={testimonials} />
        <section className="my-6">
          <div className="mx-auto px-4">
            <div className="w-full">
              <div className="relative">
                <Link href="/category/JNV-Sainik-RMS">
                  <img
                    src="assets/img/banner/5.webp"
                    alt="banner"
                    className="w-full rounded-lg shadow-md"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <ShopByCategory categories={latestBooks} categoryBooks={latestBooksArray} header='Shop By popular books' />

        <YouTubeSection title="Popular Videos" videoIds={youtubeMensa} />

        <section className="relative md:py-16 py-6">
          <div className="container-fluid relative md:mt-16 mt-8">
            <div className="grid grid-cols-1">
              <div className="relative overflow-hidden py-24 px-4 md:px-10 bg-orange-600 bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('/assets\images\hero\bg3.png')" }}
              >
                <div className="absolute inset-0  bg-center bg-no-repeat bg-cover"></div>
                <div className="grid grid-cols-1 justify-center text-center relative z-1">
                  <h3 className="text-4xl leading-normal tracking-wide font-bold text-white">End of Season Clearance <br /> Sale upto 30%</h3>
                  <div id="countdown" className="mt-6">
                    <ul className="count-down list-none inline-block space-x-1">
                      <li id="days" className="text-[28px] leading-[72px] h-[80px] w-[80px] font-medium rounded-md shadow-sm shadow-gray-100 inline-block text-center text-white">182<p className="count-head">Days</p> </li>
                      <li id="hours" className="text-[28px] leading-[72px] h-[80px] w-[80px] font-medium rounded-md shadow-sm shadow-gray-100 inline-block text-center text-white">23<p className="count-head">Hours</p> </li>
                      <li id="mins" className="text-[28px] leading-[72px] h-[80px] w-[80px] font-medium rounded-md shadow-sm shadow-gray-100 inline-block text-center text-white">40<p className="count-head">Mins</p> </li>
                      <li id="secs" className="text-[28px] leading-[72px] h-[80px] w-[80px] font-medium rounded-md shadow-sm shadow-gray-100 inline-block text-center text-white">42<p className="count-head">Secs</p> </li>
                      <li id="end" className="h1"></li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <a href="sale.html" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle text-center bg-white text-orange-500 rounded-md"><i className="mdi mdi-cart-outline"></i> Shop Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        <section className="bg-gray-50 py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="transition-transform hover:scale-105 shadow-md rounded-lg">
                <Link href="/shop/BasicMathsBook2025English">
                  <img
                    src="assets/img/banner/8.webp"
                    alt="Basic Maths Book 2025"
                    className="w-full rounded-lg"
                  />
                </Link>
              </div>
              <div className="transition-transform hover:scale-105 shadow-md rounded-lg">
                <Link href="/shop/reasoning-for-competition-2024">
                  <img
                    src="assets/img/banner/9.webp"
                    alt="Reasoning Book 2024"
                    className="w-full rounded-lg"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </FrontendLayout>
    </>
  )
}



export function FeaturedSection() {
  const features = [
    {
      title: "Recommended",
      description: "4.72L+ Teachers & Educators",
      icon: ThumbsUp,
      color: "bg-orange-100 text-orange-600 hover:bg-orange-200",
    },
    {
      title: "Adopted",
      description: "47,746 Schools & Coachings",
      icon: School,
      color: "bg-blue-100 text-blue-600 hover:bg-blue-200",
    },
    {
      title: "Trusted",
      description: "94.1L+ Parents Nationwide",
      icon: Users,
      color: "bg-green-100 text-green-600 hover:bg-green-200",
    },
    {
      title: "Simplified",
      description: "2.47Cr+ Students & Aspirants",
      icon: BookOpen,
      color: "bg-purple-100 text-purple-600 hover:bg-purple-200",
    },
  ];

  return (
    <section className="bg-gray-50 py-0">
      <div className="w-full mx-auto px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-4 p-4  transition-all duration-300 ${item.color} shadow-sm hover:shadow-md`}
              >
                <div className="shrink-0">
                  <Icon className="w-10 h-10" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm font-medium">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
