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
        'post',
        'image',
        'description',
        'status',
        'member',
        'author',
    ];

    // Relationships
    public function books()
    {
        return $this->hasMany(Product::class);
    }
}
