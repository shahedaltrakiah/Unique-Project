<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(), // Creates or associates a user
            'total_amount' => $this->faker->randomFloat(2, 20, 1000), // Random total amount between 20 and 1000
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
