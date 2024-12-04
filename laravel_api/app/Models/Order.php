<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total_amount'
    ];

    // Order belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Order can have many products through order_products
    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_products', 'order_id', 'product_id');
    }
}
