<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Models\Term;

class TermController extends Controller
{
    public function show($slug)
    {
        $timeout = env('CACHE_TIMEOUT');

        $term = Cache::remember("term_page_{$slug}", $timeout, function () use ($slug) {
            return Term::where('slug', $slug)
                ->where('status', true)
                ->first();
        });
        return inertia('terms/terms', [
            'term' => $term,
        ]);
    }
}
