<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function update(Request $request)
    {
        try {
            // Get the authenticated user
            $user = Auth::user();
    
            // Validate the input
            $validated = $request->validate([
                'name' => 'string|max:255',
                'email' => 'email|unique:users,email,' . $user->id, // Allow the user's current email
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
