<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Facades\Auth;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Product extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;
    protected $appends = ['is_liked'];
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


    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(Author::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class)->withPivot('sequence');
    }
    public function likedByUsers()
    {
        return $this->belongsToMany(User::class, 'likes')->withTimestamps();
    }

    public function isLikedBy($user): bool
    {
        return $this->likedByUsers()->where('user_id', $user->id)->exists();
    }
    public function getIsLikedAttribute(): bool
    {
        $user = Auth::user();
        if (!$user) {
            return false;
        }

        return $this->likedByUsers()
            ->where('user_id', $user->id)
            ->exists();
    }

    public function likesCount(): int
    {
        return $this->likedByUsers()->count();
    }

    /*
    |--------------------------------------------------------------------------
    | Accessors / Helpers
    |--------------------------------------------------------------------------
    */
    public function getFirstImageUrl(string $collectionName = 'images', string $conversion = 'small'): string
    {
        return $this->getFirstMediaUrl($collectionName, $conversion) ?: asset('images/no-image.png');
    }

    public function getImages()
    {
        return $this->getMedia('images');
    }

    public function getPrice(): float
    {
        return $this->discounted_price ?? $this->discounted_price;
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        return $data;
    }
}
