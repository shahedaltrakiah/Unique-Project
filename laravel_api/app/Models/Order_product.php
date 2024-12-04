<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order_product extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'product_id'
    ];

    // OrderProduct belongs to an order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // OrderProduct belongs to a product
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
