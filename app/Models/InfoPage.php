<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class InfoPage extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'company_name',
        'email',
        'phones',
        'addresses',
        'website',
        'facebook',
        'youtube',
        'instagram',
        'linkedin',
        'map_embed_code',
        'meta_title',
        'meta_description',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'phones' => 'array',
        'addresses' => 'array',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($infoPage) {
            if (empty($infoPage->slug)) {
                $infoPage->slug = Str::slug($infoPage->title);
            }
        });

        static::updating(function ($infoPage) {
            if ($infoPage->isDirty('title') && empty($infoPage->slug)) {
                $infoPage->slug = Str::slug($infoPage->title);
            }
        });
    }
} 