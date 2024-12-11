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
            // Validate incoming request with custom error messages
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/',
                'password' => 'required|min:6',
                'address' => 'required|string|max:255',
                'phone' => 'required|digits:10',
            ], [
                'email.unique' => 'This email is already registered.',
                'email.email' => 'Please provide a valid email address (e.g., user@example.com).',
                'email.regex' => 'The email address must include a valid domain (e.g., user@example.com).',
                'password.min' => 'Password must be at least 6 characters long.',
                'phone.digits' => 'Phone number must be exactly 10 digits.',
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

    // Handle password reset email request
    public function sendResetLinkEmail(Request $request)
    {
        // Validate the email address
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        // Return validation errors if any
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Send reset link email
        $response = Password::sendResetLink(
            $request->only('email')
        );

        // Return the result of the password reset link email
        if ($response == Password::RESET_LINK_SENT) {
            return response()->json(['message' => 'Password reset link sent to your email.'], 200);
        }

        return response()->json(['error' => 'Failed to send reset link.'], 500);
    }

}
