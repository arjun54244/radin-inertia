<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\AIController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CorrentafferController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductLikeController;
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
Route::get('/about', [AboutController::class, 'index'])->name('about.index');
Route::get('/terms/{slug}', [TermController::class, 'show'])->name('terms');
Route::resource('/current-affairs', CorrentafferController::class);
Route::inertia('/contact', 'contact')->name('contact');
Route::resource('/books', ProductController::class);
// Route::inertia('/terms', 'terms/terms')->name('terms');
Route::post('/ai/recommend', [AIController::class, 'recommend'])->middleware(['web']);


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

Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// Order Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/v1/orders', [OrderController::class, 'index']);
    Route::get('/v1/orders/{id}', [OrderController::class, 'show']);
});

// Cart Routes
Route::controller(CartController::class)->group(function () {
    Route::get('/cart', 'index')->name('cart.index');
    Route::post('/cart/add/{product}', 'store')->name('cart.store');
    Route::put('/cart/{product}', 'update')->name('cart.update');
    Route::delete('/cart/{product}', 'destroy')->name('cart.delete');
    Route::get('/cart/view',  'getCart')->name('cart.view');
});

// Order Routes
Route::middleware([
    'auth',
    ValidateSessionWithWorkOS::class,
])->group(function () {
    Route::get('/thankyou', fn () => Inertia::render('Orders/thankyou'))->name('thankyou');
    Route::post('/payment/verify', [OrderController::class, 'verifyPayment'])->name('payment.verify');
    Route::get('/checkout', [OrderController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [OrderController::class, 'store'])->name('checkout.store');
    Route::inertia('/invoice', 'Orders/invoice')->name('invoice');
});

//like product routes
Route::post('/products/{product}/like', [ProductLikeController::class, 'toggle'])->middleware('auth');
Route::delete('/products/{product}/like', [ProductLikeController::class, 'remove'])->middleware('auth');

//404 Route
Route::fallback(function () {
    return Inertia::render('notfound');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
