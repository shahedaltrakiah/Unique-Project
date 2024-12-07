<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id'
    ];

    // Favorite belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Favorite belongs to a product
    public function product()
    {
        return $this->belongsTo(Product::class); // Adjust the relationship as needed
    }

}
