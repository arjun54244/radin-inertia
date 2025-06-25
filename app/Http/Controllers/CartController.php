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
    public function index()
    {
        if (Auth::check()) {
            $user = Auth::user();
            $cart = Cart::firstOrCreate(['user_id' => $user->id]);
            $cart->load(['items.product:id,name,discounted_price,price,images']);

            return response()->json(['status' => 'success', 'data' => $cart->items]);
        }

        return response()->json(['status' => 'success', 'data' => session('guest_cart', [])]);
    }

    public function addItem(Request $request, $productId)
    {
        $validator = Validator::make($request->all(), [
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $product = Product::select('id', 'name', 'price', 'discounted_price', 'images')->findOrFail($productId);
        $quantity = $request->input('quantity', 1);

        if (Auth::check()) {
            $user = Auth::user();
            $cart = Cart::firstOrCreate(['user_id' => $user->id]);
            $cart->addItem($product, $quantity);
            $cart->updateTotalPrice();
            $cart->load(['items.product']);

            return response()->json(['status' => 'success', 'data' => $cart->items]);
        }

        $guestCart = collect(session('guest_cart', []));

        $existing = $guestCart->firstWhere('product_id', $product->id);

        if ($existing) {
            $guestCart = $guestCart->map(function ($item) use ($product, $quantity) {
                if ($item['product_id'] === $product->id) {
                    $item['quantity'] += $quantity;
                }
                return $item;
            });
        } else {
            $guestCart->push([
                'product_id' => $product->id,
                'quantity' => $quantity,
                'price' => $product->price,
                'discounted_price' => $product->discounted_price,
                'product' => $product,
            ]);
        }

        session(['guest_cart' => $guestCart->values()->toArray()]);

        return response()->json(['status' => 'success', 'data' => $guestCart->values()->toArray()]);
    }

    public function updateItem(Request $request, $productId)
    {
        $validator = Validator::make($request->all(), [
            'quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'errors' => $validator->errors()], 422);
        }

        $product = Product::findOrFail($productId);
        $quantity = $request->input('quantity');

        if (Auth::check()) {
            $user = Auth::user();
            $cart = Cart::firstOrFail(['user_id' => $user->id]);
            $cart->updateItemQuantity($product, $quantity);
            $cart->updateTotalPrice();
            $cart->load(['items.product']);

            return response()->json(['status' => 'success', 'message' => 'Cart updated', 'data' => $cart->items]);
        }

        $guestCart = collect(session('guest_cart', []));
        $guestCart = $guestCart->map(function ($item) use ($productId, $quantity) {
            if ($item['product_id'] == $productId) {
                $item['quantity'] = $quantity;
            }
            return $item;
        });

        session(['guest_cart' => $guestCart->values()->toArray()]);

        return response()->json(['status' => 'success', 'message' => 'Cart updated', 'data' => $guestCart->values()->toArray()]);
    }

    public function removeItem($productId)
    {
        if (Auth::check()) {
            $user = Auth::user();
            $product = Product::findOrFail($productId);
            $cart = Cart::where('user_id', $user->id)->firstOrFail();
            $cart->removeItem($product);
            $cart->updateTotalPrice();
            $cart->load(['items.product']);

            return response()->json(['status' => 'success', 'message' => 'Product removed', 'data' => $cart->items]);
        }

        $guestCart = collect(session('guest_cart', []))->filter(fn ($item) => $item['product_id'] != $productId);
        session(['guest_cart' => $guestCart->values()->toArray()]);

        return response()->json(['status' => 'success', 'message' => 'Product removed', 'data' => $guestCart->values()->toArray()]);
    }

    public function clear()
    {
        if (Auth::check()) {
            $user = Auth::user();
            $cart = Cart::where('user_id', $user->id)->firstOrFail();
            $cart->clear();

            return response()->json(['status' => 'success', 'message' => 'Cart cleared', 'data' => []]);
        }

        session(['guest_cart' => []]);

        return response()->json(['status' => 'success', 'message' => 'Cart cleared', 'data' => []]);
    }
}

