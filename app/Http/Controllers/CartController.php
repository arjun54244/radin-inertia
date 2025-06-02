<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    /**
     * Display the user's cart.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = Auth::user();
        
        // Get or create cart for the user
        $cart = Cart::firstOrCreate(
            ['user_id' => $user->id],
            ['total_price' => 0]
        );
        
        // Load cart items with products
        $cart->load(['items.product' => function ($query) {
            $query->select('id', 'name', 'discounted_price', 'price', 'images');
        }]);
        
        
        return response()->json([
            'status' => 'success',
            'data' => $cart->items
        ]);
    }
    
    /**
     * Add a product to the cart.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function addItem(Request $request, $product)
    {
        $validator = Validator::make($request->all(), [
            'quantity' => 'required|integer|min:1',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }
        
        $user = Auth::user();
        $product = Product::findOrFail($product);
        
        // Get or create cart for the user
        $cart = Cart::firstOrCreate(
            ['user_id' => $user->id],
            ['total_price' => 0]
        );
        
        // Check if product already exists in cart
        $cartItem = $cart->items()->where('product_id', $product->id)->first();
        
        if ($cartItem) {
            // Update quantity if product already exists
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            // Create new cart item
            $cart->items()->create([
                'product_id' => $product->id,
                'quantity' => $request->quantity,
                'price' => $product->price,
                'discounted_price' => $product->discounted_price,
            ]);
        }
        
        // Update cart total price
        $this->updateCartTotalPrice($cart);
        
        // Load cart items with products
        $cart->load(['items.product' => function ($query) {
            $query->select('id', 'name', 'discounted_price', 'price', 'images');
        }]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Product added to cart',
            'data' => $cart->items
        ]);
    }
    
    /**
     * Update a cart item.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateItem(Request $request, $product)
    {
        $validator = Validator::make($request->all(), [
            'quantity' => 'required|integer|min:1',
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }
        
        $user = Auth::user();
        $product = Product::findOrFail($product);
        
        // Get user's cart
        $cart = Cart::where('user_id', $user->id)->firstOrFail();
        
        // Find cart item
        $cartItem = $cart->items()->where('product_id', $product->id)->firstOrFail();
        
        // Update quantity
        $cartItem->quantity = $request->quantity;
        $cartItem->save();
        
        // Update cart total price
        $this->updateCartTotalPrice($cart);
        
        // Load cart items with products
        $cart->load(['items.product' => function ($query) {
            $query->select('id', 'name', 'discounted_price', 'price', 'images');
        }]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Cart updated',
            'data' => $cart->items
        ]);
    }
    
    /**
     * Remove a product from the cart.
     *
     * @param  int  $product
     * @return \Illuminate\Http\JsonResponse
     */
    public function removeItem($product)
    {
        $user = Auth::user();
        $product = Product::findOrFail($product);
        
        // Get user's cart
        $cart = Cart::where('user_id', $user->id)->firstOrFail();
        
        // Delete cart item
        $cart->items()->where('product_id', $product->id)->delete();
        
        // Update cart total price
        $this->updateCartTotalPrice($cart);
        
        // Load cart items with products
        $cart->load(['items.product' => function ($query) {
            $query->select('id', 'name', 'discounted_price', 'price', 'images');
        }]);
        
        return response()->json([
            'status' => 'success',
            'message' => 'Product removed from cart',
            'data' => $cart->items
        ]);
    }
    
    /**
     * Clear the user's cart.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function clear()
    {
        $user = Auth::user();
        
        // Get user's cart
        $cart = Cart::where('user_id', $user->id)->firstOrFail();
        
        // Delete all cart items
        $cart->items()->delete();
        
        // Reset cart total price
        $cart->total_price = 0;
        $cart->save();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Cart cleared',
            'data' => []
        ]);
    }
    
    /**
     * Update the cart's total price.
     *
     * @param  \App\Models\Cart  $cart
     * @return void
     */
    private function updateCartTotalPrice(Cart $cart)
    {
        $totalPrice = $cart->items()->sum(DB::raw('quantity * discounted_price'));
        $cart->total_price = $totalPrice;
        $cart->save();
    }
} 