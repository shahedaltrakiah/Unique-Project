<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Order_product;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        // Check for user authentication via token
        if (!$user = auth('sanctum')->user()) {
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'Please log in to place an order.',
            ], 401);
        }

        try {
            // Validate the input
            $validated = $request->validate([
                'products' => 'required|array',
                'products.*' => 'required|exists:products,id',
                'address' => 'nullable|string|max:255',
                'phone' => 'nullable|string|max:20',
            ]);

            $address = $validated['address'] ?? $user->address;
            $phone = $validated['phone'] ?? $user->phone;

            $totalAmount = Product::whereIn('id', $validated['products'])->sum('price');

            $order = Order::create([
                'user_id' => $user->id,
                'total_amount' => $totalAmount,
                'address' => $address,
                'phone' => $phone,
            ]);

            foreach ($validated['products'] as $productId) {
                Order_product::create([
                    'order_id' => $order->id,
                    'product_id' => $productId,
                ]);
                Product::where('id', $productId)->update(['status' => 'sold']);
            }

            return response()->json(['message' => 'Order created successfully', 'order' => $order], 201);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create order', 'message' => $e->getMessage()], 500);
        }
    }



    public function getOrder($id)
    {
        try {
            // Retrieve the order with its associated products
            $order = Order::with('products')->find($id);

            // Check if the order exists
            if (!$order) {
                return response()->json(['error' => 'Order not found'], 404);
            }

            return response()->json([
                'message' => 'Order data retrieved successfully',
                'data' => $order
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve order data', 'message' => $e->getMessage()], 500);
        }
    }

    public function userOrders()
    {
        try {
            // Fetch orders for the authenticated user with related products
            $orders = Order::where('user_id', Auth::id()) // Use Auth::id() for getting the authenticated user ID
            ->with('products') // Assuming 'products' is the relationship method defined on the Order model
            ->get();

            // Return the user's orders
            return response()->json($orders, 200);
        } catch (\Exception $e) {
            // Handle unexpected exceptions and provide a detailed error message
            return response()->json([
                'error' => 'Failed to retrieve orders',
                'message' => $e->getMessage(),
            ], 500);
        }
    }


}
