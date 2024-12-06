<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Auth;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validate the input
            $validated = $request->validate([
                'product_id' => 'required|exists:products,id',
            ]);

            // Add the product to favorites
            Favorite::create([
                'user_id' => 1,
                'product_id' => $validated['product_id'],
            ]);

            // Return success response
            return response()->json(['message' => 'Product added to favorites'], 201);

        } catch (\Exception $e) {
            // Handle unexpected exceptions
            return response()->json(['error' => 'Failed to add product to favorites', 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy($productId)
    {
        try {
            // Find the favorite entry
            $favorite = Favorite::where('user_id', Auth::id())
                ->where('product_id', $productId)
                ->first();

            // Check if the favorite exists
            if (!$favorite) {
                return response()->json(['message' => 'Product not in favorites'], 404);
            }

            // Delete the favorite entry
            $favorite->delete();

            // Return success response
            return response()->json(['message' => 'Product removed from favorites'], 200);

        } catch (\Exception $e) {
            // Handle unexpected exceptions
            return response()->json(['error' => 'Failed to remove product from favorites', 'message' => $e->getMessage()], 500);
        }
    }



}
