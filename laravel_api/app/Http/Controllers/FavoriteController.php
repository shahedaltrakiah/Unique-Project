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

            // Add the product to favorites
            Favorite::create([
                'user_id' => Auth::id(),
                'product_id' => $validated['product_id'],
            ]);

            return response()->json(['message' => 'Product added to favorites'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to add product to favorites', 'message' => $e->getMessage()], 500);
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
            // Check if the user is authenticated
            $user = Auth::user(); // Get the currently logged-in user

            // Fetch the user's favorites
            $favorites = Favorite::where('user_id', $user->id)
                ->with('product') // Assuming there is a relationship with Product
                ->get();

            return response()->json(['favorites' => $favorites], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch favorites', 'message' => $e->getMessage()], 500);
        }
    }


}
