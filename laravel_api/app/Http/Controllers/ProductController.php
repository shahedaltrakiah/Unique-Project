<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
            $products = Product::where('user_id', 12)->with('category')->
            get();

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
                    $product->productImages()->create([
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
            // Validate incoming request data
            $validated = $request->validate([
                'name' => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'price' => 'nullable|numeric',
                'category_id' => 'nullable|exists:categories,id',
                'status' => 'nullable|in:available,sold',
                'size' => 'nullable|string|max:50',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'sub_images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            // Find the product
            $product = Product::findOrFail($id);

            // Handle the main image update
            if ($request->hasFile('image')) {
                // Delete the old main image if it exists
                if ($product->image) {
                    Storage::disk('public')->delete($product->image);
                }
                // Store the new main image
                $validated['image'] = $request->file('image')->store('products', 'public');
            }

            // Update the product attributes
            $product->update(array_merge(
                $product->toArray(),
                array_filter($validated, fn($value) => $value !== null)
            ));

            // Handle sub-image updates if provided
            if ($request->has('sub_images')) {
                // Delete existing sub-images
                foreach ($product->productImages as $subImage) {
                    Storage::disk('public')->delete($subImage->path);
                    $subImage->delete();
                }

                // Add new sub-images
                foreach ($request->file('sub_images') as $subImage) {
                    $subImagePath = $subImage->store('product_sub_images', 'public');
                    $product->productImages()->create([
                        'path' => $subImagePath,
                    ]);
                }
            }

            return response()->json(['message' => 'Product updated successfully', 'product' => $product], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Product not found'], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update product', 'message' => $e->getMessage()], 500);
        }
    }

    public function delete($id)
{
    try {
        // Find the product by ID
        $product = Product::findOrFail($id);

        // Delete associated product images
        if ($product->image) {
            Storage::disk('public')->delete($product->image); // Delete main image
        }

        if ($product->productImages) {
            foreach ($product->productImages as $subImage) {
                Storage::disk('public')->delete($subImage->path); // Delete sub-images
                $subImage->delete(); // Remove sub-image record from the database
            }
        }

        // Delete the product
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
        return response()->json(['error' => 'Product not found'], 404);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to delete product', 'message' => $e->getMessage()], 500);
    }
}




}
