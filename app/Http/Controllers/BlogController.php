<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    /**
     * Display a listing of the blog posts.
     */
    public function index()
    {
        $blogs = Blog::where('status', true)
            ->latest()->paginate(9);

        return inertia('blog/blog',[
            'blogs' => $blogs
        ]);
    }

    /**
     * Display the specified blog post.
     */
    public function show($slug)
    {
        $blog = Blog::where('slug', $slug)
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
            ->with(['comments' => function($query) {
                $query->select('id', 'blog_id', 'user_id', 'comment', 'created_at')
                    ->orderBy('created_at', 'desc');
            }, 'comments.user' => function($query) {
                $query->select('id', 'name', 'email');
            }])
            ->first();

             $blogs = Blog::where('status', true)->limit(3)
            ->orderBy('created_at', 'desc')
            ->get();

        return inertia('blog/blog-detail',[
            'blog' => $blog,
            'blogs' => $blogs,
        ]);
    }
} 