<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the authenticated user's orders.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        $query = Order::where('user_id', $user->id)
            ->select([
                'id',
                'user_id',
                'number',
                'total_price',
                'status',
                'shipping_price',
                'notes',
                'created_at',
                'updated_at',
            ]);

        // Filter by status if provided
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Sort by the provided field or default to created_at
        $sortField = $request->input('sort_by', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');
        $query->orderBy($sortField, $sortDirection);

        // Paginate the results
        $perPage = $request->input('per_page', 10);
        $orders = $query->paginate($perPage);

        // Load relationships
        $orders->load([
            'items' => function($query) {
                $query->select('id', 'order_id', 'product_id', 'quantity', 'unit_price');
            },
            'items.product' => function($query) {
                $query->select('id', 'name', 'slug', 'images');
            }
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $orders
        ]);
    }

    /**
     * Display the specified order.
     */
    public function show(Request $request, $id)
    {
        $user = $request->user();
        
        $order = Order::where('id', $id)
            ->where('user_id', $user->id)
            ->select([
                'id',
                'user_id',
                'number',
                'total_price',
                'status',
                'shipping_price',
                'notes',
                'created_at',
                'updated_at',
            ])
            ->with([
                'items' => function($query) {
                    $query->select('id', 'order_id', 'product_id', 'quantity', 'unit_price');
                },
                'items.product' => function($query) {
                    $query->select('id', 'name', 'slug', 'images', 'short_description');
                }
            ])
            ->first();

        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $order
        ]);
    }
} 