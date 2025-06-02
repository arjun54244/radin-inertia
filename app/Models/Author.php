<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Author extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'url',
        'image',
        'description',
        'status',
    ];

    // Relationships
    public function books()
    {
        return $this->hasMany(Product::class);
    }
}
