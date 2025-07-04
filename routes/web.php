<?php

use App\Http\Controllers\BannerController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CorrentafferController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TermController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\InfoPageController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;


Route::middleware([
    'auth',
    ValidateSessionWithWorkOS::class,
])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::inertia('/about', 'about')->name('about');
Route::get('/terms/{slug}', [TermController::class, 'show'])->name('terms');
Route::resource('/current-affairs', CorrentafferController::class);
Route::inertia('/contact', 'contact')->name('contact');
Route::resource('/books', ProductController::class);
// Route::inertia('/terms', 'terms/terms')->name('terms');


Route::get('/info', [InfoPageController::class, 'index']);
Route::get('/info/{slug}', [InfoPageController::class, 'show']);

// Blog Routes
Route::resource('/blogs', BlogController::class);

// Testimonial Routes
Route::get('/testimonials', [TestimonialController::class, 'index']);
Route::get('/testimonials/{id}', [TestimonialController::class, 'show']);

// Banner Routes
Route::get('/banners', [BannerController::class, 'index']);
Route::get('/banners/{id}', [BannerController::class, 'show']);

// Product Routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);

// Category Routes
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{slug}', [CategoryController::class, 'show']);

// Order Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/v1/orders', [OrderController::class, 'index']);
    Route::get('/v1/orders/{id}', [OrderController::class, 'show']);
});

// Cart Routes
// Route::middleware('auth:sanctum')->group(function () {
    // Route::get('/cart', [CartController::class, 'index']);
    // Route::post('/cart/add/{product}', [CartController::class, 'addItem']);
    // Route::put('/cart/update/{product}', [CartController::class, 'updateItem']);
    // Route::delete('/cart/remove/{product}', [CartController::class, 'removeItem']);
    // Route::delete('/cart/clear', [CartController::class, 'clear']);
// });
//404 Route
Route::fallback( function (){
    return Inertia::render('notfound');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
