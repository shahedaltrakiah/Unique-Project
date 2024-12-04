<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'category_id' => Category::factory(), // Creates or associates a category
            'name' => $this->faker->unique()->words(3, true), // Generates a unique 3-word product name
            'description' => $this->faker->sentence(), // Generates a random sentence as description
            'image' => $this->faker->imageUrl(640, 480, 'products', true, 'Product'), // Placeholder product image URL
            'string_size' => $this->faker->randomElement(['Small', 'Medium', 'Large', null]), // Random size or null
            'number_size' => $this->faker->randomFloat(1, 1, 100), // Random float number or nullable
            'price' => $this->faker->randomFloat(2, 5, 500), // Random price between 5 and 500
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
