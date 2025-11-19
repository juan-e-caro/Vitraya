<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'category',
        'image_url',
        'vendor_id',
    ];

    // Relación con el vendedor
    public function vendor()
    {
        return $this->belongsTo(User::class, 'vendor_id');
    }

    // Relación con los items de carrito
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }
}
