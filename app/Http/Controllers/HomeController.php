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


        $targetCategories = [
            "JNV-Sainik-RMS",
            "Books-All-Competitions",
            "SSC-Exams",
            "Defence",
            "Railway-Exams",
            "CUET-Exams",
        ];

        // Get the matching categories by name
        // $categories = Category::whereIn('name', $targetCategories)->get();

        // $categoryBooks = [];

        // foreach ($categories as $category) {
        //     $name = $category->name;
        //     $categoryId = $category->id;

        //     // Search for products where JSON 'categories' includes an object with matching category_id
        //     $products = Product::whereJsonContains('categories', [['category_id' => (string) $categoryId]])
        //         ->get();

        //     $categoryBooks[$name] = $products;
        // }

        return Inertia::render('home', [
            'banners' => $banners,
            'testimonials' => $testimonials,
            'categoriesShopByCategories' => $targetCategories,
            // 'categoryBooksShopByCategories' => $categoryBooks,
        ]);
    }
}
