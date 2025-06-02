<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\InfoPage;
use Illuminate\Http\Request;

class InfoPageController extends Controller
{
    /**
     * Display a listing of the info pages.
     */
    public function index()
    {
        $infoPages = InfoPage::where('is_active', true)
            ->select([
                'id',
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
            ])
            ->get();

        return response()->json([
            'status' => 'success',
            'data' => $infoPages
        ]);
    }

    /**
     * Display the specified info page.
     */
    public function show($slug)
    {
        $infoPage = InfoPage::where('slug', $slug)
            ->where('is_active', true)
            ->select([
                'id',
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
            ])
            ->first();

        if (!$infoPage) {
            return response()->json([
                'status' => 'error',
                'message' => 'Info page not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $infoPage
        ]);
    }
}