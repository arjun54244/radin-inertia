<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Razorpay\Api\Api;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class OrderController extends Controller
{

    public function index()
    {
        return Inertia::render('Orders/checkout', [
            'orders' => Order::with(['items.product'])->get()
        ]);
    }
    /**
     * Display a listing of the authenticated user's orders.
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'address.address_line1' => 'required|string|max:255',
            'address.address_line2' => 'nullable|string|max:255',
            'address.city' => 'required|string|max:100',
            'address.state' => 'required|string|max:100',
            'address.zip_code' => 'required|string|max:20',
            'address.country' => 'required|string|max:100',
            'address.phone' => 'required|string|max:20',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'payment_method' => 'required|string|in:cod,online',
            'notes' => 'nullable|string',
        ]);

        $validated['status'] = $validated['payment_method'] === 'cod' ? 'pending' : 'processing';

        $user->addresses()->updateOrCreate(
            ['user_id' => $user->id],
            $validated['address']
        );

        $order = Order::create([
            'user_id' => $user->id,
            'number' => 'ORD-' . strtoupper(uniqid()),
            'status' => $validated['status'],
            'shipping_price' => 0,
            'notes' => $validated['notes'] ?? null,
            'total_price' => 0,
        ]);

        foreach ($validated['items'] as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'quantity' => $item['quantity'],
                'unit_price' => $item['price'],
            ]);
        }

        $order->updateTotalPrice();

        if ($validated['payment_method'] === 'cod') {
            return response()->json(['redirect' => 'cod']);
        }

        $api = new Api(config('services.razorpay.key'), config('services.razorpay.secret'));

        $razorpayOrder = $api->order->create([
            'receipt' => $order->number,
            'amount' => $order->total_price * 100,
            'currency' => 'INR'
        ]);

        Session::put('razorpay_order_id', $razorpayOrder['id']);
        Session::put('order_id', $order->id);

        return response()->json([
            'razorpay' => [
                'order_id' => $razorpayOrder['id'],
                'amount' => $razorpayOrder['amount'],
                'currency' => 'INR',
                'name' => $user->name,
                'email' => $user->email,
                'contact' => $validated['address']['phone'],
            ],
            'redirect' => 'razorpay'
        ]);
    }

    public function verifyPayment(Request $request)
    {
        $api = new Api(config('services.razorpay.key'), config('services.razorpay.secret'));

        try {
            $api->utility->verifyPaymentSignature([
                'razorpay_order_id' => $request->razorpay_order_id,
                'razorpay_payment_id' => $request->razorpay_payment_id,
                'razorpay_signature' => $request->razorpay_signature,
            ]);

            $orderId = Session::get('order_id');
            if ($orderId) {
                $order = Order::findOrFail($orderId);
                $order->update(['status' => 'completed']);
            }

            return redirect()->route('thankyou')->with('success', 'Payment verified.');
        } catch (\Exception $e) {
            Log::error('Payment verification failed', ['error' => $e->getMessage()]);
            return redirect()->route('checkout.index')->with('error', 'Payment failed.');
        }
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
                'items' => function ($query) {
                    $query->select('id', 'order_id', 'product_id', 'quantity', 'unit_price');
                },
                'items.product' => function ($query) {
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
