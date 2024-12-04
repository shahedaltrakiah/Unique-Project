<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        try {
            // Retrieve all categories
            $categories = Category::all();

            // Return success response with categories
            return response()->json($categories, 200);

        } catch (\Exception $e) {
            // Handle unexpected exceptions
            return response()->json(['error' => 'An error occurred while fetching categories.', 'message' => $e->getMessage()], 500);
        }
    }


}
