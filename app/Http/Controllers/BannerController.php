<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Banner;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    /**
     * Display a listing of the banners.
     */
    public function index()
    {
        $banners = Banner::where('is_active', true)
            ->select([
                'id',
                'title',
                'images',
                'link',
                'position',
                'created_at',
                'updated_at',
            ])
            ->orderBy('position', 'asc')
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $banners
        ]);
    }

    /**
     * Display the specified banner.
     */
    public function show($id)
    {
        $banner = Banner::where('id', $id)
            ->where('is_active', true)
            ->select([
                'id',
                'title',
                'images',
                'link',
                'position',
                'created_at',
                'updated_at',
            ])
            ->first();

        if (!$banner) {
            return response()->json([
                'status' => 'error',
                'message' => 'Banner not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $banner
        ]);
    }
} 