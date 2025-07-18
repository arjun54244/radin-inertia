<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Category;
use App\Models\Product;
use App\Models\Testimonial;
use App\Models\YouTube;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;


class HomeController extends Controller
{
    public function index()
    {
        $timeout = env('CACHE_TIMEOUT');

        // Banners
        $banners = Cache::remember('home_banners', $timeout, function () {
            return Banner::where('title', 'home')->get()->map(function ($banner) {
                $banner->images = collect($banner->images)->map(fn($image) => Storage::url($image));
                return $banner;
            });
        });

        // Testimonials
        $testimonials = Cache::remember('home_testimonials', $timeout, function () {
            return Testimonial::where('is_active', true)->get()->map(function ($testimonial) {
                $testimonial->image = $testimonial->image ? Storage::url($testimonial->image) : null;
                return $testimonial;
            });
        });

        // Target categories
        $targetCategories = [
            "JNV-Sainik-RMS",
            "Books-All-Competitions",
            "SSC-Exams",
            "Defence",
            "Railway-Exams",
            "CUET-Exams"
        ];

        $categoryBooks = Cache::remember('home_category_books', $timeout, function () use ($targetCategories) {
            $categories = Category::whereIn('name', $targetCategories)->get();
            $result = [];
            foreach ($categories as $category) {
                $result[$category->name] = Product::whereJsonContains('categories', [['category_id' => (string)$category->id]])->get();
            }
            return $result;
        });

        // State categories
        $targetState = ["UP", "Haryana", "Bihar", "Rajasthan", "MP", "Delhi", "Uttarakhand"];

        $stateBooks = Cache::remember('home_state_books', $timeout, function () use ($targetState) {
            $states = Category::whereIn('name', $targetState)->get();
            $result = [];
            foreach ($states as $state) {
                $result[$state->name] = Product::whereJsonContains('categories', [['category_id' => (string)$state->id]])->get();
            }
            return $result;
        });

        // Popular/latest books
        $tergetLatestBooks = ["Best Seller", "Latest Release", "Most Purchased", "On Sale"];

        $latestBooksArray = Cache::remember('home_latest_books', $timeout, function () use ($tergetLatestBooks) {
            $books = Category::whereIn('name', $tergetLatestBooks)->get();
            $result = [];
            foreach ($books as $book) {
                $result[$book->name] = Product::whereJsonContains('categories', [['category_id' => (string)$book->id]])->get();
            }
            return $result;
        });

        // YouTube video IDs
        $youtubeVideoIds = Cache::remember('home_youtube_reviews', $timeout, function () {
            return YouTube::where('is_active', true)
                ->where('type', 'review')
                ->pluck('video_id')
                ->toArray();
        });

        $youtubeMensa = Cache::remember('home_youtube_homevideos', $timeout, function () {
            return YouTube::where('is_active', true)
                ->where('type', 'homevideo')
                ->pluck('video_id')
                ->toArray();
        });

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
