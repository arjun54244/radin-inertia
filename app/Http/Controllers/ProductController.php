<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Product::where('is_visible', 1)
            ->get()
            ->map(function ($book) {
                // Decode the images JSON if stored as string
                $book->images = is_string($book->images) ? json_decode($book->images) : $book->images;
                return $book;
            });

        return Inertia::render('books/books', [
            'books' => $books
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        $newbooks = Product::where('is_visible', true)->latest()->take(3)->get();
        
        $book = Product::where('slug', $slug)
            ->where('is_visible', true)
            ->select([
                'id',
                'brand_id',
                'author_id',
                'is_ebook',
                'name',
                'slug',
                'sku',
                'isbn',
                'rating',
                'images',
                'short_description',
                'description',
                'pages',
                'weight',
                'dimensions',
                'binding',
                'meta_title',
                'meta_description',
                'canonical_tag',
                'tags',
                'quantity',
                'price',
                'discounted_price',
                'is_featured',
                'type',
                'published_at',
            ])
            ->with(['brand:id,name', 'author:id,name', 'categories:id,name,slug,description'])
            ->first();


        if (!$book) {
            return response()->json([
                'status' => 'error',
                'message' => 'book not found'
            ], 404);
        }
        return Inertia::render('books/book-details',[
            'book' => $book,
            'newbooks' => $newbooks
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
