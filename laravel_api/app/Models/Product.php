<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'user_id',
        'name',
        'description',
        'image',
        'size',
        'price',
        'status',
    ];

    // Product belongs to a category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Product can have many order_products (for orders)
    public function orderProducts()
    {
        return $this->hasMany(Order_product::class);
    }

    // Product can have many images
    public function productImages()
    {
        return $this->hasMany(Product_image::class);
    }

    // Product can be in many favorites (many-to-many with users)
    public function users()
    {
        return $this->belongsToMany(User::class, 'favorites', 'product_id', 'user_id');
    }
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_products', 'product_id', 'order_id');
    }

}

