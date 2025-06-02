<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'unit_price'
    ];
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    protected static function booted()
    {
        static::saved(function ($item) {
            $item->order->updateTotalPrice();
        });

        static::deleted(function ($item) {
            $item->order->updateTotalPrice();
        });
    }

}
