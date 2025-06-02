<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Term;

class TermController extends Controller
{
    public function show($slug)
    {
        $term = Term::where('slug', $slug)
            ->where('status', true)
            ->first();
        return inertia('terms/terms', [
            'term' => $term,
        ]);
    }
}
