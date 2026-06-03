<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['product_id', 'category_id'])]
class ProductCategory extends Model
{
    use HasUuids;

    function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
