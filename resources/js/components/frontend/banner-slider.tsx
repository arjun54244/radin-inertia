"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Banner {
  id: number;
  title?: string;
  images: string[]; 
  link?: string;
  position?: string
}

interface BannerSliderProps {
  banners: Banner[]
  interval?: number
  pauseOnHover?: boolean
}

export default function BannerSlider({
  banners = [],
  interval = 5000,
  pauseOnHover = true,
}: BannerSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Flatten all images with their parent banner reference
  const allSlides = banners.flatMap((banner) =>
    banner.images.map((image) => ({
      ...banner,
      imageUrl: image,
    }))
  )

  const totalSlides = allSlides.length

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    if (isPaused) return

    const slideInterval = setInterval(() => {
      nextSlide()
    }, interval)

    return () => clearInterval(slideInterval)
  }, [isPaused, interval, totalSlides])

  return (
    <div
      className="relative w-full overflow-hidden rounded-lg"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {allSlides.map((slide, index) => (
          <div key={`${slide.id}-${index}`} className="relative min-w-full">
            <img
              src={slide.imageUrl || "/placeholder.svg"}
              alt={slide.title || `Slide ${index + 1}`}
              className="h-[300px] w-full object-cover sm:h-[400px] md:h-[500px]"
            />

          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {allSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-all",
              currentSlide === index ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
