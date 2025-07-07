<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Category;
use App\Models\Product;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class HomeController extends Controller
{
    public function index()
    {
        $banners = Banner::where('title', 'home')->get()->map(function ($banner) {
            $banner->images = collect($banner->images)->map(function ($image) {
                return Storage::url($image); // Converts 'banners/banner1.jpg' → '/storage/banners/banner1.jpg'
            });
            return $banner;
        });

        $testimonials = Testimonial::where('is_active', true)->get()->map(function ($testimonial) {
            $testimonial->image = $testimonial->image ? Storage::url($testimonial->image) : null;
            return $testimonial;
        });

        //Shop By Category
        $targetCategories = [
            "JNV-Sainik-RMS",
            "Books-All-Competitions",
            "SSC-Exams",
            "Defence",
            "Railway-Exams",
            "CUET-Exams",
        ];

        // Get the matching categories by name
        $categories = Category::whereIn('name', $targetCategories)->get();

        $categoryBooks = [];

        foreach ($categories as $category) {
            $name = $category->name;
            $categoryId = $category->id;

            // Search for products where JSON 'categories' includes an object with matching category_id
            $products = Product::whereJsonContains('categories', [['category_id' => (string) $categoryId]])
                ->get();

            $categoryBooks[$name] = $products;
        }

        //Shop By State
        $targetState = ["UP", "Haryana", "Bihar", "Rajasthan", "MP", "Delhi", "Uttarakhand"];
        $states = Category::whereIn('name', $targetState)->get();
        $stateBooks = [];
        foreach ($states as $state) {
            $name = $state->name;
            $categoryId = $state->id;
            $products = Product::whereJsonContains('categories', [['category_id' => (string) $categoryId]])->get();
            $stateBooks[$name] = $products;
        }

        // Shop By popular books 
        $tergetLatestBooks = ["Best Seller", "Latest Release", "Most Purchased", "On Sale"];
        $latestBooks = Category::whereIn('name', $tergetLatestBooks)->get();
        $latestBooksArray = [];
        foreach ($latestBooks as $book) {
            $name = $book->name;
            $categoryId = $book->id;
            $products = Product::whereJsonContains('categories', [['category_id' => (string) $categoryId]])->get();
            $latestBooksArray[$name] = $products;
        }

        // youtube
        $youtubeVideoIds = \App\Models\YouTube::where('is_active', true)
        ->where('type', 'review')
            ->where('is_active', true)    
        ->pluck('video_id')
            ->toArray();
            // dd($youtubeVideoIds);

        $youtubeMensa = \App\Models\YouTube::where('is_active', true)
            ->where('type', 'homevideo')
            ->where('is_active', true)
            ->pluck('video_id')
            ->toArray();

        return Inertia::render('home', [
            'banners' => $banners,
            'testimonials' => $testimonials,
            'categoriesShopByCategories' => $targetCategories,
            'categoryBooksShopByCategories' => $categoryBooks,
            'categoriesShopByState' => $targetState,
            'categoryBooksShopByState' => $stateBooks,
            'latestBooks' => $tergetLatestBooks,
            'latestBooksArray' => $latestBooksArray,
            'youtubeVideoIds' => $youtubeVideoIds,
            'youtubeMensa' => $youtubeMensa,
        ]);
    }
}
