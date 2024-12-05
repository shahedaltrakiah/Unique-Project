<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            // Validate incoming request
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
                'address' => 'required|string|max:255',
                'phone' => 'required|string|max:20',
            ]);

            // Create user with the validated data
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => bcrypt($validated['password']),
                'address' => $validated['address'],
                'phone' => $validated['phone'],
            ]);

            // Generate a token for the user
            $token = $user->createToken('auth_token')->plainTextToken;

            // Return success response
            return response()->json(['token' => $token, 'user' => $user], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            // Handle validation errors
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Handle any other exceptions
            return response()->json(['error' => 'An error occurred during registration.', 'message' => $e->getMessage()], 500);
        }
    }
    
    public function login(Request $request)
    {
        try {
            // Validate incoming request
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            // Attempt to log in with the provided credentials
            if (!Auth::attempt($credentials)) {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }

            // Fetch the authenticated user
            $user = Auth::user();

            // Generate a token for the user
            $token = $user->createToken('auth_token')->plainTextToken;

            // Return success response
            return response()->json(['token' => $token, 'user' => $user]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            // Handle validation errors
            return response()->json(['error' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Handle any other exceptions
            return response()->json(['error' => 'An error occurred during login.', 'message' => $e->getMessage()], 500);
        }
    }


}
