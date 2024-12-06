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
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
        ]);

        // Retrieve the authenticated user's details
        $user = Auth::user();

        // Use provided address and phone or fallback to user's original data
        $address = $validated['address'] ?? $user->address; // Assuming 'address' is a field in the users table
        $phone = $validated['phone'] ?? $user->phone;       // Assuming 'phone' is a field in the users table

        // Calculate the total amount
        $totalAmount = Product::whereIn('id', $validated['products'])->sum('price');

        // Create the order
        $order = Order::create([
            'user_id' => $user->id,
            'total_amount' => $totalAmount,
            'address' => $address,
            'phone' => $phone,
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
            $orders = Order::where('user_id', 31)
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
