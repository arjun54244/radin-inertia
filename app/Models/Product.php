<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand_id',
        'author_id',
        'is_ebook',
        'name',
        'slug',
        'sku',
        'isbn',
        'rating',
        'images',
        'original_file_names',
        'short_description',
        'description',
        'pages',
        'weight',
        'dimensions',
        'binding',
        'meta_title',
        'meta_description',
        'canonical_tag',
        'tags',
        'quantity',
        'price',
        'discounted_price',
        'is_visible',
        'is_featured',
        'type',
        'published_at',
        'categories',
    ];

    protected $casts = [
        'images' => 'array',
        'tags' => 'array',
        'categories' => 'array',
        'published_at' => 'datetime',
        'original_file_names' => 'array',
    ];
    protected function mutateFormDataBeforeSave(array $data): array
    {
        // Optional: sanitize or manipulate data here
        return $data;
    }


    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function author()
    {
        return $this->belongsTo(Author::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class)->withPivot('sequence');
    }
}
