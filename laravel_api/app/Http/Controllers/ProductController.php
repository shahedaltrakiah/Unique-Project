<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        try {
            // Retrieve all products with their associated categories
            // $products = Product::with(relations: 'category')->get();
            $products = Product::with('category')->paginate(8);


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
            $product = Product::find($id)->with('productImages')->get();

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

    public function getProductsByCategory($id)
    {
        try {
            // Retrieve products filtered by category ID
            $products = Product::where('category_id', $id)->with('category')->paginate(8);;

            // Return success response
            return response()->json($products, 200);
        } catch (\Exception $e) {
            // Handle unexpected exceptions
            return response()->json(['error' => 'An error occurred while fetching products by category.', 'message' => $e->getMessage()], 500);
        }
    }


}
