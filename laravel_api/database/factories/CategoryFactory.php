<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(), // Generates a random word for category name
            'image' => $this->faker->imageUrl(640, 480, 'categories', true, 'Category'), // Generates a placeholder image URL
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
