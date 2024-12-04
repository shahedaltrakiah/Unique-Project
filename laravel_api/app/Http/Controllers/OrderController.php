<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Order_product;
use App\Models\Product;
use Auth;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validate the input
            $validated = $request->validate([
                'products' => 'required|array',
                'products.*' => 'required|exists:products,id',
            ]);

            // Calculate total amount
            $totalAmount = Product::whereIn('id', $validated['products'])->sum('price');

            // Create the order
            $order = Order::create([
                'user_id' => Auth::id(),
                'total_amount' => $totalAmount,
            ]);

            // Create order-product entries and update product status
            foreach ($validated['products'] as $productId) {
                Order_product::create([
                    'order_id' => $order->id,
                    'product_id' => $productId,
                ]);

                // Update product status to 'sold'
                Product::where('id', $productId)->update(['status' => 'sold']);
            }

            // Return success response
            return response()->json(['message' => 'Order created successfully', 'order' => $order], 201);

        } catch (\Exception $e) {
            // Handle unexpected exceptions
            return response()->json(['error' => 'Failed to create order', 'message' => $e->getMessage()], 500);
        }
    }

    public function getOrder($id)
    {
        try {
            // Find the order by ID with related products
            $order = Order::with('products')->find($id);

            // If the order is not found, return a 404 error
            if (!$order) {
                return response()->json(['error' => 'Order not found'], 404);
            }

            // Return the order data
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
            $orders = Order::where('user_id', Auth::id())
                ->with('products')
                ->get();

            // Return the user's orders
            return response()->json($orders, 200);

        } catch (\Exception $e) {
            // Handle unexpected exceptions
            return response()->json(['error' => 'Failed to retrieve orders', 'message' => $e->getMessage()], 500);
        }
    }



}
