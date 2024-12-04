<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Category;
use App\Models\Favorite;
use App\Models\Message;
use App\Models\Order;
use App\Models\Order_product;
use App\Models\Product;
use App\Models\Product_image;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {   
        User::factory()->count(10)->create();
        Category::factory()->count(10)->create();
        Product::factory()->count(10)->create();
        Order::factory()->count(10)->create();
        Order_product::factory()->count(10)->create();
        Favorite::factory()->count(10)->create();
        Product_image::factory()->count(10)->create();
        Message::factory()->count(10)->create();







    }
}
