<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;


class CartController extends Controller
{
    public function index(CartService $cartService)
    {
        return response()->json([
            'cartItems' => $cartService->getCartItems(),
            'totalPrice' => $cartService->getTotalPrice(),
        ]);
    }

    public function getCart(CartService $cartService)
    {
        return Inertia::render('cart', [
            'cartItems' => $cartService->getCartItems(),
            'totalPrice' => $cartService->getTotalPrice(),
        ]);
    }

    public function store(Request $request, Product $product, CartService $cartService)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartService->addItemCart($product, $validated['quantity']);
        return back()->with('success', 'Item added to cart!');
    }

    public function update(Request $request, Product $product, CartService $cartService)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartService->updateItemQuantity($product->id, $validated['quantity']);
        return back()->with('success', 'Cart updated!');
    }

    public function destroy(Product $product, CartService $cartService)
    {
        $cartService->removeItemFromCart($product->id);
        return back()->with('success', 'Item removed!');
    }
}
