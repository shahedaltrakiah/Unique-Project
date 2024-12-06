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
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'price' => 'required|numeric',
                'category_id' => 'required|exists:categories,id',
                'status' => 'required|in:available,sold',
                'size' => 'required|string|max:50',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'sub_images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            // Store the main image
            $mainImagePath = $request->file('image')->store('products', 'public');

            // Create the product in the database
            $product = Product::create([
                'name' => $validated['name'],
                'description' => $validated['description'],
                'price' => $validated['price'],
                'size' => $validated['size'],
                'image' => $mainImagePath,
                'category_id' => $validated['category_id'],
                'status' => $validated['status'],
                'user_id' => Auth::id(),
            ]);

            // Handle sub-images if provided
            if ($request->has('sub_images')) {
                foreach ($request->file('sub_images') as $subImage) {
                    $subImagePath = $subImage->store('product_sub_images', 'public');
                    $product->subImages()->create([
                        'path' => $subImagePath,
                    ]);
                }
            }

            return response()->json(['message' => 'Product added successfully', 'product' => $product], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while adding the product.', 'message' => $e->getMessage()], 500);
        }
    }

    public function getProduct($id)
{
    try {
        // Find the product by ID
        $product = Product::find($id);

        // If the product is not found, return a 404 error
        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        // Return the product data
        return response()->json([
            'message' => 'Product data retrieved successfully',
            'data' => $product
        ], 200);

    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to retrieve product data', 'message' => $e->getMessage()], 500);
    }
}


    public function update(Request $request, $id)
    {
        try {
            // Validate input
            $validated = $request->validate([
                'name' => 'string|max:255',
                'description' => 'string',
                'price' => 'numeric',
                'category_id' => 'exists:categories,id',
                'status' => 'in:available,sold', // Validate status to be either 'available' or 'sold'
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Optional image
            ]);

            // Find the product
            $product = Product::findOrFail($id);

            // Update the product attributes
            $product->update(array_filter([
                'name' => $validated['name'] ?? $product->name,
                'description' => $validated['description'] ?? $product->description,
                'price' => $validated['price'] ?? $product->price,
                'category_id' => $validated['category_id'] ?? $product->category_id,
                'status' => $validated['status'] ?? $product->status,
                'image' => $request->hasFile('image') ? $request->file('image')->store('products', 'public') : $product->image,
            ]));

            return response()->json(['message' => 'Product updated successfully', 'product' => $product]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Product not found'], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update product', 'message' => $e->getMessage()], 500);
        }
    }


}
