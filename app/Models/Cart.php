<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

class Cart extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'total_price',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'total_price' => 'decimal:2',
    ];

    /**
     * Get the user that owns the cart.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the items for the cart.
     */
    public function items(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    /**
     * Add a product to the cart.
     *
     * @param  \App\Models\Product  $product
     * @param  int  $quantity
     * @return \App\Models\CartItem
     */
    public function addItem(Product $product, int $quantity = 1): CartItem
    {
        $existingItem = $this->items()->where('product_id', $product->id)->first();

        if ($existingItem) {
            $existingItem->quantity += $quantity;
            $existingItem->save();
            return $existingItem;
        }

        return $this->items()->create([
            'product_id' => $product->id,
            'quantity' => $quantity,
            'price' => $product->price,
        ]);
    }

    /**
     * Update the quantity of a product in the cart.
     *
     * @param  \App\Models\Product  $product
     * @param  int  $quantity
     * @return \App\Models\CartItem|null
     */
    public function updateItemQuantity(Product $product, int $quantity): ?CartItem
    {
        $cartItem = $this->items()->where('product_id', $product->id)->first();

        if (!$cartItem) {
            return null;
        }

        if ($quantity <= 0) {
            $cartItem->delete();
            return null;
        }

        $cartItem->quantity = $quantity;
        $cartItem->save();

        return $cartItem;
    }

    /**
     * Remove a product from the cart.
     *
     * @param  \App\Models\Product  $product
     * @return bool
     */
    public function removeItem(Product $product): bool
    {
        return $this->items()->where('product_id', $product->id)->delete() > 0;
    }

    /**
     * Clear the cart.
     *
     * @return void
     */
    public function clear(): void
    {
        $this->items()->delete();
        $this->total_price = 0;
        $this->save();
    }

    /**
     * Update the total price of the cart.
     *
     * @return void
     */
    public function updateTotalPrice(): void
    {
        $this->total_price = $this->items()->sum(DB::raw('quantity * price'));
        $this->save();
    }
}
