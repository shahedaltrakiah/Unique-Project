<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validate the token
            $user = auth()->user();
            if (!$user) {
                return response()->json(['error' => 'User is not logged in'], 401);
            }

            // Validate the input
            $validated = $request->validate([
                'product_id' => 'required|exists:products,id',
            ]);

            // Check if the product is already in the user's favorites
            $exists = Favorite::where('user_id', $user->id)
                ->where('product_id', $validated['product_id'])
                ->exists();

            if ($exists) {
                return response()->json(['error' => 'Product is already in favorites'], 409); // Conflict status code
            }

            // Add the product to favorites
            Favorite::create([
                'user_id' => $user->id,
                'product_id' => $validated['product_id'],
            ]);

            return response()->json(['message' => 'Product added to favorites'], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to add product to favorites',
                'message' => $e->getMessage()
            ], 500);
        }
    }



    public function destroy($id)
    {
        try {
            // Get the authenticated user
            $user = Auth::user();

            // Find the favorite record for the product
            $favorite = Favorite::where('user_id', $user->id)->where('product_id', $id)->first();

            if (!$favorite) {
                return response()->json(['error' => 'Favorite not found'], 404);
            }

            // Delete the favorite record
            $favorite->delete();

            return response()->json(['message' => 'Product removed from favorites'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to remove from favorites', 'message' => $e->getMessage()], 500);
        }
    }


    public function index()
    {
        try {
            $user = Auth::user(); // Get the currently logged-in user

            $favorites = Favorite::where('user_id', $user->id)
                ->with('product')
                ->get();

            $wishlistCount = $favorites->count();

            return response()->json([
                'favorites' => $favorites,
                'wishlistCount' => $wishlistCount
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch favorites',
                'message' => $e->getMessage()
            ], 500);
        }
    }


}
