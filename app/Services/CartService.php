<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Log;

class CartService
{
    private const COOKIE_NAME = 'cartItems';
    protected const COOKIE_LIFETIME = 60 * 24 * 365;

    public function getCartCount(): int
    {
        return count($this->getCartItems());
    }

    public function addItemCart(Product $product, int $qty = 1)
    {
        $price = $product->discounted_price ?? $product->price;
        if (Auth::check()) {
            $this->saveItemToDatabase($product, $qty, $price);
        } else {
            $this->saveItemToCookies($product->id, $qty, $price);
        }
    }

    public function saveItemToDatabase(Product $product, int $qty, float $price): void
    {
        $user = Auth::user();

        $cart = Cart::firstOrCreate(['user_id' => $user->id]);

        $cartItem = $cart->items()->where('product_id', $product->id)->first();

        if ($cartItem) {
            $cartItem->quantity += $qty;
            $cartItem->save();
        } else {
            $cart->items()->create([
                'product_id' => $product->id,
                'quantity' => $qty,
                'price' => $product->price,
                'discounted_price' => $product->discounted_price ?? $product->discounted_price,
            ]);
        }
    }


    protected function saveItemToCookies(int $productId, int $qty, float $price)
    {
        $items = json_decode(Cookie::get(self::COOKIE_NAME, '{}'), true);
        $existing = $items[$productId] ?? null;
        $items[$productId] = [
            'product_id' => $productId,
            'quantity' => ($existing['quantity'] ?? 0) + $qty,
            'price' => $price,
        ];
        Cookie::queue(self::COOKIE_NAME, json_encode($items), self::COOKIE_LIFETIME);
    }

    public function updateItemQuantity(int $productId, int $qty)
    {
        if (Auth::check()) {
            $cart = Cart::where('user_id', Auth::id())->first();
            if ($cart) {
                $item = $cart->items()->where('product_id', $productId)->first();
                if ($item) {
                    if ($qty <= 0) $item->delete();
                    else {
                        $item->quantity = $qty;
                        $item->save();
                    }
                    $cart->updateTotalPrice();
                }
            }
        } else {
            $items = json_decode(Cookie::get(self::COOKIE_NAME, '{}'), true);
            if (isset($items[$productId])) {
                if ($qty <= 0) unset($items[$productId]);
                else $items[$productId]['quantity'] = $qty;
                Cookie::queue(self::COOKIE_NAME, json_encode($items), self::COOKIE_LIFETIME);
            }
        }
    }

    public function removeItemFromCart(int $productId)
    {
        $this->updateItemQuantity($productId, 0);
    }

    public function getCartItems(): array
    {
        $items = Auth::check()
            ? Cart::with('items.product')->where('user_id', Auth::id())->first()?->items->toArray() ?? []
            : collect(json_decode(Cookie::get(self::COOKIE_NAME, '{}'), true))->values()->all();

        return array_map(fn($item) => [
            'id' => $item['id'] ?? null,
            'product_id' => $item['product_id'],
            'quantity' => $item['quantity'],
            'price' => $item['price'],
            'name' => $item['product']['name'] ?? null,
            'slug' => $item['product']['slug'] ?? null,
            'image' => $item['product']['images'][0] ?? null,
        ], $items);
    }

    public function getTotalPrice(): float
    {
        return array_sum(array_map(fn($i) => $i['quantity'] * $i['price'], $this->getCartItems()));
    }
}
