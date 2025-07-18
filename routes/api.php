<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductLikeController;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::get('/search-products', function (Request $request) {
    $search = $request->get('q');

    if (!$search) {
        return response()->json([]);
    }

    $products = Product::query()
        ->where('name', 'like', "%{$search}%")
        ->orWhere('sku', 'like', "%{$search}%")
        ->limit(10)
        ->get(['id', 'name', 'slug', 'sku']);

    return response()->json($products);
});