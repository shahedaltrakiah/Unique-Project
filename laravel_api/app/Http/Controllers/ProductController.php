<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;


class ProductController extends Controller
{

    public function userProducts()
    {
        try {
            // Get the currently authenticated user
            $user = Auth::user();

            // Check if the user is authenticated
            if (!$user) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            // Retrieve products added by the currently authenticated user,
            // along with their category and product images
            $products = Product::where('user_id', $user->id)
                ->with(['category', 'productImages']) // Eager load both category and productImages
                ->get();

            // Return success response with the products
            return response()->json($products, 200);
        } catch (\Exception $e) {
            // Handle any unexpected exceptions
            return response()->json(['error' => 'An error occurred while fetching user products.', 'message' => $e->getMessage()], 500);
        }
    }


    public function store(Request $request)
    {
        try {
            // Validate the token (ensure the user is authenticated)
            $user = auth()->user();
            if (!$user) {
                return response()->json(['error' => 'User is not logged in'], 401);
            }

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

            // Sanitize the product name and create a file-friendly version
            $productName = preg_replace('/[^A-Za-z0-9-]/', '-', strtolower($validated['name']));  // Only alphanumeric characters and hyphens
            $imageExtension = $request->file('image')->getClientOriginalExtension();  // Get the image's original extension
            $imageName = $productName . '-' . time() . '.' . $imageExtension;  // Combine product name, timestamp, and extension for uniqueness

            // Store the main image with the new name and generate its URL
            $mainImagePath = $request->file('image')->storeAs('products', $imageName, 'public');
            $mainImageUrl = asset('storage/' . $mainImagePath);

            // Create the product in the database with the main image URL
            $product = Product::create([
                'name' => $validated['name'],
                'description' => $validated['description'],
                'price' => $validated['price'],
                'size' => $validated['size'],
                'image' => $mainImageUrl,  // Save the URL of the image with the new name
                'category_id' => $validated['category_id'],
                'status' => $validated['status'],
                'user_id' => Auth::id(),
            ]);

            // Handle sub-images if provided
            if ($request->has('sub_images')) {
                foreach ($request->file('sub_images') as $subImage) {
                    $subImageExtension = $subImage->getClientOriginalExtension();  // Get sub-image extension
                    $subImageName = $productName . '-sub-' . time() . '.' . $subImageExtension;  // Generate a unique name for each sub-image

                    // Store the sub-image with the new name and generate its URL
                    $subImagePath = $subImage->storeAs('product_sub_images', $subImageName, 'public');
                    $subImageUrl = asset('storage/' . $subImagePath);

                    // Save sub-image URL to the database, ensuring it's saved to the correct column (image in product_images table)
                    $product->productImages()->create([
                        'image' => $subImageUrl, // Save the sub-image URL to the image column
                    ]);
                }
            }


            return response()->json(['message' => 'Product added successfully', 'product' => $product], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'An error occurred',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function getProduct($id)
    {
        try {
            // Find the product by ID
            $product = Product::with('productImages')->find($id);

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
            // Validate the token (ensure the user is authenticated)
            $user = Auth::user();
            if (!$user) {
                return response()->json(['error' => 'User is not logged in'], 401);
            }

            // Validate incoming request data
            $validated = $request->validate([
                'name' => 'nullable|string|max:255',
                'description' => 'nullable|string',
                'price' => 'nullable|numeric',
                'category_id' => 'nullable|exists:categories,id',
                'status' => 'nullable|in:available,sold',
                'size' => 'nullable|string|max:50',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'sub_images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            // Find the product
            $product = Product::findOrFail($id);

            // Ensure the product belongs to the authenticated user
            if ($product->user_id !== $user->id) {
                return response()->json(['error' => 'You are not authorized to update this product'], 403);
            }

            // Handle the main image update if a new one is provided
            if ($request->hasFile('image')) {
                // Delete the old main image if it exists
                if ($product->image) {
                    Storage::disk('public')->delete($product->image);
                }
                // Store the new main image
                $product->image = $request->file('image')->store('products', 'public');
            }

            // Update product attributes (mass assignment)
            $product->name = $validated['name'] ?? $product->name;
            $product->description = $validated['description'] ?? $product->description;
            $product->price = $validated['price'] ?? $product->price;
            $product->size = $validated['size'] ?? $product->size;
            $product->category_id = $validated['category_id'] ?? $product->category_id;
            $product->status = $validated['status'] ?? $product->status;

            // Save the product with updated attributes
            $product->save();

            // Handle sub-images if provided
            if ($request->has('sub_images')) {
                foreach ($request->file('sub_images') as $subImage) {
                    $subImagePath = $subImage->store('product_sub_images', 'public');
                    // Store each sub-image associated with the product
                    $product->productImages()->create([
                        'path' => $subImagePath,
                    ]);
                }
            }

            return response()->json(['message' => 'Product updated successfully', 'product' => $product], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'error' => 'Validation failed',
                'details' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'An error occurred',
                'message' => $e->getMessage()
            ], 500);
        }
    }


    public function delete($id)
    {
        try {
            $product = Product::findOrFail($id);
            $product->delete();
            Log::info("Product with ID {$id} deleted successfully.");
            return response()->json(['message' => 'Product deleted successfully']);
        } catch (\Exception $e) {
            Log::error("Error deleting product with ID {$id}: " . $e->getMessage());
            return response()->json(['message' => 'Error deleting product'], 500);
        }
    }



    // Fetch limited products for the home page
    public function getHomeProducts()
    {
        try {
            // Fetch only the first 8 products with pagination
            $products = Product::with('category')->paginate(8);

            return response()->json($products, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while fetching home products.', 'message' => $e->getMessage()], 500);
        }
    }

    // Fetch all products for the shop page
    public function getShopProducts(Request $request)
    {
        try {
            $query = Product::with('category');

            // Filter by category if provided
            if ($request->has('category_id')) {
                $query->where('category_id', $request->category_id);
            }

            // Fetch all products without pagination
            $products = $query->get();

            return response()->json($products, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while fetching shop products.', 'message' => $e->getMessage()], 500);
        }
    }



}
