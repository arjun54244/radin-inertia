<?php ?>

// namespace App\Http\Controllers;

// use App\Http\Controllers\Controller;
// use App\Models\Product;
// use Illuminate\Http\Request;

// class ProductController extends Controller
// {
//     /**
//      * Display a listing of the products.
//      */
//     public function index(Request $request)
//     {
//         $query = Product::where('is_visible', true)
//             ->select([
//                 'id',
//                 'brand_id',
//                 'author_id',
//                 'is_ebook',
//                 'name',
//                 'slug',
//                 'sku',
//                 'rating',
//                 'images',
//                 'short_description',
//                 'price',
//                 'discounted_price',
//                 'pages',
//                 'weight',
//                 'dimensions',
//                 'binding',
//                 'is_featured',
//                 'type',
//                 'published_at',
//             ]);

//         // Filter by category if provided
//         if ($request->has('category')) {
//             $query->whereHas('categories', function ($q) use ($request) {
//                 $q->where('slug', $request->category);
//             });
//         }

//         // Sorting (e.g., ?sort=price_asc or price_desc)
//         if ($request->has('sort')) {
//             switch ($request->sort) {
//                 case 'price_asc':
//                     $query->orderBy('price');
//                     break;
//                 case 'price_desc':
//                     $query->orderByDesc('price');
//                     break;
//                 case 'latest':
//                     $query->orderByDesc('published_at');
//                     break;
//             }
//         }

//         // Filter by brand if provided
//         if ($request->has('brand')) {
//             $query->where('brand_id', $request->brand);
//         }

//         // Filter by author if provided
//         if ($request->has('author')) {
//             $query->where('author_id', $request->author);
//         }

//         // Filter by type if provided
//         if ($request->has('type')) {
//             $query->where('type', $request->type);
//         }

//         // Filter by featured if provided
//         if ($request->has('featured') && $request->featured === 'true') {
//             $query->where('is_featured', true);
//         }

//         // Sort by the provided field or default to published_at
//         $sortField = $request->input('sort_by', 'published_at');
//         $sortDirection = $request->input('sort_direction', 'desc');
//         $query->orderBy($sortField, $sortDirection);

//         // Paginate the results
//         $perPage = $request->input('per_page', 12);
//         $products = $query->paginate($perPage);

//         // Load relationships
//         $products->load(['brand:id,name', 'author:id,name', 'categories:id,name,slug']);

//         return response()->json([
//             'status' => 'success',
//             'data' => $products
//         ]);
//     }

//     /**
//      * Display the specified product.
//      */
//     public function show($slug)
//     {
//         $product = Product::where('slug', $slug)
//             ->where('is_visible', true)
//             ->select([
//                 'id',
//                 'brand_id',
//                 'author_id',
//                 'is_ebook',
//                 'name',
//                 'slug',
//                 'sku',
//                 'rating',
//                 'images',
//                 'short_description',
//                 'description',
//                 'pages',
//                 'weight',
//                 'dimensions',
//                 'binding',
//                 'meta_title',
//                 'meta_description',
//                 'canonical_tag',
//                 'tags',
//                 'quantity',
//                 'price',
//                 'discounted_price',
//                 'is_featured',
//                 'type',
//                 'published_at',
//             ])
//             ->with(['brand:id,name', 'author:id,name', 'categories:id,name,slug,description'])
//             ->first();

//         if (!$product) {
//             return response()->json([
//                 'status' => 'error',
//                 'message' => 'Product not found'
//             ], 404);
//         }

//         return response()->json([
//             'status' => 'success',
//             'data' => $product
//         ]);
//     }
// }