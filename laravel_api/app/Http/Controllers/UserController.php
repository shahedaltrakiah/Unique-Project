<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUserData(Request $request)
    {
        try {
            // Retrieve the authenticated user
            $user = auth()->user();

            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }

            // Return the user data as a response
            return response()->json([
                'message' => 'User data retrieved successfully',
                'data' => $user
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to retrieve user data', 'message' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request)
    {
        try {
            // Get the authenticated user
            $user = Auth::user();

            // Validate the input
            $validated = $request->validate([
                'name' => 'string|max:255',
                'email' => 'email|unique:users,email,' . $user->id . ',id', // Ignore current user's email
                'address' => 'string|max:255',  // Optional: Add validation for address
                'phone' => 'string|max:20',     // Optional: Add validation for phone
            ]);

            // Update the user's profile
            $user->update($validated);

            // Return success response
            return response()->json(['message' => 'Profile updated successfully', 'user' => $user], 200);

        } catch (\Exception $e) {
            // Handle unexpected exceptions
            return response()->json(['error' => 'Failed to update profile', 'message' => $e->getMessage()], 500);
        }
    }

}
