<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Blog extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'short_description',
        'image',
        'description',
        'slug',
        'meta_title',
        'meta_desc',
        'canonical_tag',
        'tags',
        'status',
    ];

    protected $casts = [
        'tags' => 'array',
        'status' => 'boolean',
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
