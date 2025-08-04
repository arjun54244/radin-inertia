<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Jobs\SendOrderMailJob;
use App\Models\Order;
use App\Models\Address;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Razorpay\Api\Api;
use Razorpay\Api\Errors\SignatureVerificationError;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Models\Offer;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;

class OrderController extends Controller
{

    public function index()
    {
        $addresses = Auth::user()->addresses;
        return Inertia::render('Orders/checkout', [
            'orders' => Order::with(['items.product'])->get(),
            'addresses' => $addresses,
        ]);
    }
    // offer code fuction
    public function apply(Request $request)
    {

        $request->validate([
            'code' => 'required|string'
        ]);

        $offer = Offer::where('code', $request->code)
            ->where('is_active', true)
            ->where('start_date', '<=', now())
            ->where('end_date', '>=', now())
            ->first();

        if (!$offer) {
            return response()->json(['message' => 'Invalid or expired offer code.'], 422);
        }

        return response()->json([
            'message' => 'Offer applied successfully.',
            'discount_percent' => $offer->discount_percent,
            'code' => $offer->code,
        ]);
    }

    /**
     * Display a listing of the authenticated user's orders.
     */
    public function create(Request $request)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        $request->validate([
            'address_id' => 'required|exists:addresses,id',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'payment_method' => 'required|string|in:cod,online',
            'offer_code' => 'nullable|string',
        ]);

        $address = Address::findOrFail($request->address_id);

        // Step 1: Calculate total price
        $totalPrice = collect($request->items)
            ->sum(fn($item) => $item['price'] * $item['quantity']);

        // Step 2: Apply discount if offer code is valid
        $discountAmount = 0;
        if ($request->filled('offer_code')) {
            $offer = Offer::where('code', $request->offer_code)
                ->where('is_active', true)
                ->where('start_date', '<=', now())
                ->where('end_date', '>=', now())
                ->first();

            if ($offer) {
                $discountAmount = ($totalPrice * $offer->discount_percent) / 100;
            }
        }
        $totalPrice -= $discountAmount;

        // Generate order number
        $lastOrder = Order::latest('id')->first();
        $nextId = $lastOrder ? $lastOrder->id + 1 : 1;
        $orderNumber = 'RBC-' . str_pad($nextId, 4, '0', STR_PAD_LEFT);

        if ($request->payment_method == 'cod') {
            try {
                $order = DB::transaction(function () use ($request, $orderNumber, $discountAmount, $totalPrice, $user, $address) {
                    // Create order
                    $order = Order::create([
                        'user_id' => $user->id,
                        'number' => $orderNumber,
                        'offer_code' => $request->offer_code,
                        'payment_method' => $request->payment_method,
                        'total_price' => $totalPrice, // discounted total
                        'discount_amount' => $discountAmount, // store discount amount
                        'status' => 'pending',
                        'shipping_price' => 0,
                        'address_id' => $address->id,
                        'notes' => $request->notes ?? 'default notes',
                    ]);

                    // Insert order items (unit_price stays original)
                    foreach ($request->items as $item) {
                        OrderItem::create([
                            'order_id' => $order->id,
                            'product_id' => $item['product_id'],
                            'quantity' => $item['quantity'],
                            'unit_price' => $item['price'],
                        ]);
                    }

                    return $order->fresh();
                });
                dispatch(new SendOrderMailJob($order->id));

                return response()->json([
                    'redirect' => 'cod',
                    'user_id' => $user->id,
                    'items' => $request->items,
                    'order_number' => $order->number,
                    'address_id' => $address->id,
                    'offer_code' => $request->offer_code,
                    'discount_amount' => $discountAmount,
                    'total_price' => $order->total_price,
                    'message' => 'Order placed successfully (COD)',
                ]);

            } catch (\Throwable $e) {
                return response()->json(['error' => $e->getMessage()], 500);
            }
        }




        // Razorpay payment flow
        $api = new Api(config('services.razorpay.key'), config('services.razorpay.secret'));

        $razorpayOrder = $api->order->create([
            'receipt' => 'order_rcptid_' . rand(),
            'amount' => $totalPrice * 100,
            'currency' => 'INR',
            'payment_capture' => 1
        ]);



        return response()->json([
            'redirect' => 'razorpay',
            'successful' => 'response is good',
            // 'order' => $razorpayOrder->toArray(),
            'razorpayOrder' => $razorpayOrder->toArray(),
            'key' => config('services.razorpay.key'),
        ]);
    }
    //new payment verification function
    public function verifyPayment(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        $request->validate([
            'razorpay_order_id' => 'required|string',
            'razorpay_payment_id' => 'required|string',
            'razorpay_signature' => 'required|string',
            'address_id' => 'required|exists:addresses,id',
            'amount' => 'required|numeric|min:1',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|integer',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'offer_code' => 'nullable|string',
        ]);

        $attributes = [
            'razorpay_order_id' => $request->razorpay_order_id,
            'razorpay_payment_id' => $request->razorpay_payment_id,
            'razorpay_signature' => $request->razorpay_signature,
        ];

        try {
            // Step 1: Verify signature
            $api = new Api(config('services.razorpay.key'), config('services.razorpay.secret'));
            $api->utility->verifyPaymentSignature($attributes);

            // Step 2: Calculate total and discount
            $totalPrice = collect($request->items)
                ->sum(fn($item) => $item['price'] * $item['quantity']);

            $discountAmount = 0;
            if ($request->filled('offer_code')) {
                $offer = Offer::where('code', $request->offer_code)
                    ->where('is_active', true)
                    ->where('start_date', '<=', now())
                    ->where('end_date', '>=', now())
                    ->first();

                if ($offer) {
                    $discountAmount = ($totalPrice * $offer->discount_percent) / 100;
                }
            }
            $totalPrice -= $discountAmount;

            // Step 3: Create order & items in a transaction
            $order = DB::transaction(function () use ($request, $user, $totalPrice, $discountAmount) {
                $lastOrder = Order::latest('id')->first();
                $nextId = $lastOrder ? $lastOrder->id + 1 : 1;
                $orderNumber = 'RBC-' . str_pad($nextId, 4, '0', STR_PAD_LEFT);

                $order = Order::create([
                    'user_id' => $user->id,
                    'number' => $orderNumber,
                    'offer_code' => $request->offer_code,
                    'total_price' => $totalPrice,
                    'discount_amount' => $discountAmount,
                    'payment_method' => 'online',
                    'status' => 'paid',
                    'shipping_price' => 0,
                    'address_id' => $request->address_id,
                    'notes' => $request->notes ?? 'Online Payment Order',
                ]);

                foreach ($request->items as $item) {
                    OrderItem::create([
                        'order_id' => $order->id,
                        'product_id' => $item['product_id'],
                        'quantity' => $item['quantity'],
                        'unit_price' => $item['price'],
                    ]);
                }

                return $order;
            });

            return response()->json([
                'success' => true,
                'message' => 'Payment verified and order created successfully.',
                'order_number' => $order->number,
                'total_price' => $order->total_price,
                'discount_amount' => $discountAmount,
            ]);
        } catch (SignatureVerificationError $e) {
            return response()->json(['success' => false, 'message' => 'Signature verification failed.'], 400);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error: ' . $e->getMessage()], 500);
        }
    }

    //old payment verification function
    // public function verifyPayment(Request $request)
    // {
    //     $user = Auth::user();

    //     if (!$user) {
    //         return response()->json(['error' => 'Unauthenticated'], 401);
    //     }

    //     $request->validate([
    //         'razorpay_order_id' => 'required|string',
    //         'razorpay_payment_id' => 'required|string',
    //         'razorpay_signature' => 'required|string',
    //         'address_id' => 'required|exists:addresses,id',
    //         'amount' => 'required|numeric|min:1',
    //         'items' => 'required|array|min:1',
    //         'items.*.product_id' => 'required|integer',
    //         'items.*.quantity' => 'required|integer|min:1',
    //         'items.*.price' => 'required|numeric|min:0',
    //         'offer_code' => 'nullable|string',
    //     ]);

    //     $attributes = [
    //         'razorpay_order_id' => $request->razorpay_order_id,
    //         'razorpay_payment_id' => $request->razorpay_payment_id,
    //         'razorpay_signature' => $request->razorpay_signature,
    //     ];

    //     try {
    //         $api = new Api(config('services.razorpay.key'), config('services.razorpay.secret'));
    //         $api->utility->verifyPaymentSignature($attributes);

    //         // Signature verified, now create the order
    //         $order = Order::create([
    //             'user_id' => $user->id,
    //             'number' => 'RZP_' . $request->razorpay_order_id,
    //             'offer_code' => $request->offer_code,
    //             'total_price' => $request->amount,
    //             'payment_method' => 'online',
    //             'status' => 'paid',
    //             'shipping_price' => 0,
    //             'address_id' => $request->address_id,
    //         ]);

    //         foreach ($request->items as $item) {
    //             OrderItem::create([
    //                 'order_id' => $order->id,
    //                 'product_id' => $item['product_id'],
    //                 'quantity' => $item['quantity'],
    //                 'unit_price' => $item['price'],
    //             ]);
    //         }

    //         return response()->json(['success' => true, 'message' => 'Payment verified and order created.']);
    //     } catch (SignatureVerificationError $e) {
    //         return response()->json(['success' => false, 'message' => 'Signature verification failed.'], 400);
    //     } catch (\Exception $e) {
    //         return response()->json(['success' => false, 'message' => 'Something went wrong: ' . $e->getMessage()], 500);
    //     }
    // }
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
