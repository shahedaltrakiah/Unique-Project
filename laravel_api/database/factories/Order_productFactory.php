<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order_product>
 */
class Order_productFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => Order::factory(), // Creates or associates an order
            'product_id' => Product::factory(), // Creates or associates a product
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
