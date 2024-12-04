<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Auth;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        try {
            // Retrieve all products with their associated categories
            $products = Product::with('category')->get();
    
            // Return success response
            return response()->json($products, 200);
    
        } catch (\Exception $e) {
            // Handle any unexpected exceptions
            return response()->json(['error' => 'An error occurred while fetching products.', 'message' => $e->getMessage()], 500);
        }
    }
    

    public function userProducts()
    {
        try {
            // Retrieve products added by the currently authenticated user
            $products = Product::where('user_id', Auth::id())->get();
    
            // Return success response
            return response()->json($products, 200);
    
        } catch (\Exception $e) {
            // Handle any unexpected exceptions
            return response()->json(['error' => 'An error occurred while fetching user products.', 'message' => $e->getMessage()], 500);
        }
    }
    

    public function store(Request $request)
{
    try {
        // Validate incoming request data
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
        ]);

        // Store the image in the public storage
        // $path = $request->file('image')->store('products', 'public');

        // Create the new product in the database
        $product = Product::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'image' => 'image.png',
            'category_id' => $validated['category_id'],
            'user_id' => 81, // Replace with actual logged-in user's ID
        ]);

        // Return a success response
        return response()->json(['message' => 'Product added successfully', 'product' => $product], 201);

    } catch (\Illuminate\Validation\ValidationException $e) {
        // Return validation errors
        return response()->json(['error' => $e->errors()], 422);
    } catch (\Exception $e) {
        // Catch any other exceptions
        return response()->json(['error' => 'An error occurred while adding the product.', 'message' => $e->getMessage()], 500);
    }
}

}
