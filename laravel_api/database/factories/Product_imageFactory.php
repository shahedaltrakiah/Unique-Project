<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product_image>
 */
class Product_imageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => Product::factory(), // Creates or associates a product
            'image' => $this->faker->imageUrl(640, 480, 'products', true, 'Faker'), // Generates a fake image URL
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
