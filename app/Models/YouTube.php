<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class YouTube extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'video_id',
        'is_active',
    ];
}
