<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Facades\Cache;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //     $books = Product::where('is_visible', 1)
    //         ->get()
    //         ->map(function ($book) {
    //             // Decode the images JSON if stored as string
    //             $book->images = is_string($book->images) ? json_decode($book->images) : $book->images;
    //             return $book;
    //         });

    //     return Inertia::render('books/books', [
    //         'books' => $books
    //     ]);
    // }
    public function index(Request $request)
    {
        $categoryName = $request->get('category');
        $stateName = $request->get('state');
        $sort = $request->get('sort');

        // Cache categories and states list for sidebar (1 hour)
        $categories = Cache::remember('sidebar_categories', env('CACHE_TIMEOUT'), function () {
            return Category::whereIn('name', [
                "JNV-Sainik-RMS",
                "Books-All-Competitions",
                "SSC-Exams",
                "Defence",
                "Railway-Exams",
                "CUET-Exams"
            ])->get();
        });

        $states = Cache::remember('sidebar_states', env('CACHE_TIMEOUT'), function () {
            return Category::whereIn('name', [
                "UP",
                "Haryana",
                "Bihar",
                "Rajasthan",
                "MP",
                "Delhi",
                "Uttarakhand"
            ])->get();
        });

        // Cache key based on filter + sort combo
        $cacheKey = "books:" . md5(json_encode([$categoryName, $stateName, $sort]));

        $books = Cache::remember($cacheKey, 300, function () use ($categoryName, $stateName, $sort) {
            $query = Product::query()->where('is_visible', 1);

            if ($categoryName) {
                $category = Category::where('name', $categoryName)->first();
                if ($category) {
                    $query->whereJsonContains('categories', [['category_id' => (string) $category->id]]);
                }
            }

            if ($stateName) {
                $state = Category::where('name', $stateName)->first();
                if ($state) {
                    $query->whereJsonContains('categories', [['category_id' => (string) $state->id]]);
                }
            }

            switch ($sort) {
                case 'az':
                    $query->orderBy('name');
                    break;
                case 'za':
                    $query->orderByDesc('name');
                    break;
                case 'low-high':
                    $query->orderBy('price');
                    break;
                case 'high-low':
                    $query->orderByDesc('price');
                    break;
                case 'sale':
                    $query->where('is_on_sale', true);
                    break;
            }

            return $query->get()->map(function ($book) {
                $book->images = is_string($book->images) ? json_decode($book->images) : $book->images;
                return $book;
            });
        });

        return Inertia::render('books/books', [
            'books' => $books,
            'filters' => compact('categoryName', 'stateName', 'sort'),
            // optionally pass categories/states if frontend makes them dynamic
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
        return Inertia::render('books/book-details', [
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
