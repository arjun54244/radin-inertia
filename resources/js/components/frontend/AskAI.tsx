// resources/js/Components/AskAI.tsx

"use client"

import { useEffect, useState } from "react"
import { useForm, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface Book {
  id: number
  title: string
  description: string
  price: number
}

export default function AskAI() {
  const [isOpen, setIsOpen] = useState(false)
  const { data, setData, post, processing, reset } = useForm({ query: "" })

  const { props } = usePage<{ recommendations?: Book[] }>()
  const [results, setResults] = useState<Book[]>([])

  useEffect(() => {
    if (props.recommendations) {
      setResults(props.recommendations)
    }
  }, [props.recommendations])

  const handleSearch = () => {
    if (!data.query.trim()) return

    post("/ai/recommend", {
      preserveScroll: true,
    })
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 w-full max-w-sm">
      {isOpen ? (
        <Card className="p-4 shadow-lg rounded-2xl bg-white space-y-3 border border-gray-200">
          <Textarea
            placeholder="Tell us what you're looking for..."
            value={data.query}
            onChange={(e) => setData("query", e.target.value)}
            className="min-h-[80px]"
          />
          <div className="flex justify-between items-center gap-2">
            <Button onClick={handleSearch} disabled={processing}>
              {processing ? <Loader2 className="animate-spin" /> : "Find Books"}
            </Button>
            <Button variant="ghost" onClick={() => { setIsOpen(false); reset(); setResults([]) }}>
              Close
            </Button>
          </div>

          {results.length > 0 && (
            <div className="mt-3 space-y-2 max-h-[300px] overflow-y-auto">
              <h4 className="font-semibold">Recommended Books:</h4>
              {results.map((book) => (
                <div key={book.id} className="border p-2 rounded-md bg-gray-50">
                  <p className="font-bold">{book.title}</p>
                  <p className="text-sm text-muted-foreground">{book.description}</p>
                  <p className="text-sm font-semibold">₹ {book.price}</p>
                </div>
              ))}
            </div>
          )}
        </Card>
      ) : (
        <Button onClick={() => setIsOpen(true)} className="rounded-full shadow-xl">
          🧠 Ask AI
        </Button>
      )}
    </div>
  )
}
