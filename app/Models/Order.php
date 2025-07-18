<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'number',
        'total_price',
        'payment_method',
        'status',
        'shipping_price',
        'notes'
    ];

    public function updateTotalPrice()
    {
        $total = $this->items->sum(function ($item) {
            return $item->quantity * $item->unit_price;
        });

        $this->total_price = $total;
        $this->save();
    }


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

}
