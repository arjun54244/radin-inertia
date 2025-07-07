"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface Testimonial {
  id: number
  designation: string
  name: string
  review: string
  rating: string
  company: string
  image?: string
}

interface TestimonialsCardsProps {
  testimonials: Testimonial[]
  title?: string
  tagline?: string
}

export default function TestimonialsCards({ testimonials , title, tagline }: TestimonialsCardsProps) {
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-slide scroll effect
  useEffect(() => {
    if (!isPaused && containerRef.current) {
      const scrollAmount = 0.7
      let animationFrameId: number

      const scroll = () => {
        if (containerRef.current) {
          containerRef.current.scrollLeft += scrollAmount
          if (
            containerRef.current.scrollLeft >=
            containerRef.current.scrollWidth - containerRef.current.clientWidth
          ) {
            containerRef.current.scrollLeft = 0
          }
          animationFrameId = requestAnimationFrame(scroll)
        }
      }

      animationFrameId = requestAnimationFrame(scroll)
      return () => cancelAnimationFrame(animationFrameId)
    }
  }, [isPaused])

  return (
    <section className="py-6 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">{ title || 'Student Reviews'}</h2>
        <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
          {tagline ||'Real stories from real customers. Trusted and verified experiences, just like Google Reviews.'}
        </p>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={containerRef}
            className="flex overflow-x-hidden gap-4 py-2 px-1 scroll-smooth"
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <Card
                key={`${testimonial.id}-${index}`}
                className={cn(
                  "flex-shrink-0 w-[320px] border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition duration-300"
                )}
              >
                <CardContent className="p-5 flex flex-col h-full justify-between">
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                        />
                        <AvatarFallback>
                          {testimonial.name
                            ? testimonial.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                            : "NA"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-[15px] leading-none">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">Verified Reviewer</p>
                      </div>
                    </div>

                    <div className="flex items-center mb-1">
                      {Array.from({ length: parseInt(testimonial.rating || "0") }).map((_, i) => (
                        <Star key={i} size={16} fill="#fbbf24" stroke="#fbbf24" className="mr-1" />
                      ))}
                    </div>

                    <p className="text-muted-foreground text-sm mb-2 italic">"{testimonial.review}"</p>
                  </div>

                  <div className="text-xs text-muted-foreground mt-auto">
                    {testimonial.company}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
