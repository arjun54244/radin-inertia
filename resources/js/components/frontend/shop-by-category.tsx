// "use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import Book from "./Book"
import { Product } from "@/types/books"

interface ShopByCategoryProps {
  categories: string[]
  categoryBooks: { [key: string]: Product[] }
  header?: string
  isAuthenticated?: boolean
}

export default function ShopByCategory({ categories, categoryBooks, header, isAuthenticated }: ShopByCategoryProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0] || "")
  const [showAll, setShowAll] = useState(false)

  const handleCategoryChange = (category: string) => {
    if (category === activeCategory) {
      setShowAll((prev) => !prev) // toggle showAll on second click
    } else {
      setActiveCategory(category)
      setShowAll(false) // reset showAll when switching category
    }
  }

  const booksToDisplay = showAll
    ?  categoryBooks[activeCategory] || []
    :  categoryBooks[activeCategory]?.slice(0, 4)  || []

  return (
    <section className="py-6 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold">{header ? header : "Shop"}</h2>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center mb-10 gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                activeCategory === category ? "bg-slate-900 text-white" : "bg-white text-slate-700 hover:bg-slate-100"
              )}
            >
              {category.replace(/-/g, " ")}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {booksToDisplay.map((book) => (
            <Book key={book.id} product={book} isAuthenticated={Boolean(isAuthenticated)} />
          ))}
        </div>

        {/* View All Button */}
        {categoryBooks[activeCategory]?.length > 4 && !showAll && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center justify-center py-2 px-6 font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 transition-colors"
            >
              View All {activeCategory.replace(/-/g, " ")} Books
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
