<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductLikeController extends Controller
{
    public function toggle( Request $request,Product $product)
    {
        $user = Auth::user();;

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $liked = $user->hasLiked($product);

        if ($liked) {
            $user->likedProducts()->detach($product);
        } else {
            $user->likedProducts()->attach($product);
        }
        if ($request->header('X-Inertia')) {
            return redirect()->back()->with('likeResponse', [
                'liked' => false,
                'likes_count' => $product->likesCount(),
            ]);
        }

        return response()->json([
            'liked' => !$liked,
            'likes_count' => $product->likesCount(),
        ]);
    }
    public function remove(Request $request, Product $product)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $user->likedProducts()->detach($product);
        if ($request->header('X-Inertia')) {
            return redirect()->back()->with('likeResponse', [
                'liked' => false,
                'likes_count' => $product->likesCount(),
            ]);
        }


        return response()->json([
            'liked' => false,
            'likes_count' => $product->likesCount(),
        ]);
    }
}
