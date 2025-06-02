<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    /**
     * Display a listing of the testimonials.
     */
    public function index()
    {
        $testimonials = Testimonial::where('is_active', true)
            ->select([
                'id',
                'name',
                'review',
                'designation',
                'company',
                'image',
                'rating',
                'position',
                'created_at',
                'updated_at',
            ])
            ->orderBy('position', 'asc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $testimonials
        ]);
    }

    /**
     * Display the specified testimonial.
     */
    public function show($id)
    {
        $testimonial = Testimonial::where('id', $id)
            ->where('is_active', true)
            ->select([
                'id',
                'name',
                'review',
                'designation',
                'company',
                'image',
                'rating',
                'position',
                'created_at',
                'updated_at',
            ])
            ->first();

        if (!$testimonial) {
            return response()->json([
                'status' => 'error',
                'message' => 'Testimonial not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $testimonial
        ]);
    }
} 