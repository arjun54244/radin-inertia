<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class BlogController extends Controller
{
    /**
     * Display a listing of the blog posts.
     */
    public function index()
    {
        $page = request('page', 1);
        $cacheKey = "blogs_page_{$page}";

        $blogs = Cache::remember($cacheKey, env('CACHE_TIMEOUT'), function () {
            return Blog::where('status', true)
                ->latest()
                ->paginate(9);
        });

        return inertia('blog/blog', [
            'blogs' => $blogs
        ]);
    }

    /**
     * Display the specified blog post.
     */
    public function show($slug)
    {
        $blog = Cache::remember("blog_detail_{$slug}", env('CACHE_TIMEOUT'), function () use ($slug) {
            return Blog::where('slug', $slug)
                ->where('status', true)
                ->select([
                    'id',
                    'title',
                    'slug',
                    'short_description',
                    'description',
                    'image',
                    'meta_title',
                    'meta_desc',
                    'canonical_tag',
                    'tags',
                    'created_at',
                    'updated_at',
                ])
                ->with(['comments' => function ($query) {
                    $query->select('id', 'blog_id', 'user_id', 'comment', 'created_at')
                        ->orderBy('created_at', 'desc');
                }, 'comments.user' => function ($query) {
                    $query->select('id', 'name', 'email');
                }])
                ->first();
        });

        // Sidebar recent blogs (always same, cache globally)
        $blogs = Cache::remember('latest_blogs_sidebar', env('CACHE_TIMEOUT'), function () {
            return Blog::where('status', true)
                ->latest()
                ->limit(3)
                ->get();
        });

        return inertia('blog/blog-detail', [
            'blog' => $blog,
            'blogs' => $blogs,
        ]);
    }
}
