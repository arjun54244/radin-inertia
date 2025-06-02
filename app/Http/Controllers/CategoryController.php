<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the categories.
     */
    public function index()
    {
        $categories = Category::where('is_visible', true)
            ->select([
                'id',
                'name',
                'slug',
                'description',
                'parent_id',
                'created_at',
                'updated_at',
            ])
            ->with(['child' => function($query) {
                $query->where('is_visible', true)
                    ->select(['id', 'name', 'slug', 'parent_id']);
            }])
            ->whereNull('parent_id')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $categories
        ]);
    }

    /**
     * Display the specified category.
     */
    public function show($slug)
    {
        $category = Category::where('slug', $slug)
            ->where('is_visible', true)
            ->select([
                'id',
                'name',
                'slug',
                'description',
                'parent_id',
                'created_at',
                'updated_at',
            ])
            ->with(['child' => function($query) {
                $query->where('is_visible', true)
                    ->select(['id', 'name', 'slug', 'parent_id']);
            }])
            ->first();

        if (!$category) {
            return response()->json([
                'status' => 'error',
                'message' => 'Category not found'
            ], 404);
        }

        // Get products in this category
        $products = $category->products()
            ->where('is_visible', true)
            ->select([
                'id',
                'name',
                'slug',
                'images',
                'short_description',
                'price',
                'is_featured',
            ])
            ->orderBy('is_featured', 'desc')
            ->paginate(12);

        $category->products = $products;

        return response()->json([
            'status' => 'success',
            'data' => $category
        ]);
    }
} 