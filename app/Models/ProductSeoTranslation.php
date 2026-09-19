<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['product_id', 'language', 'title', 'description', 'keyword'])]
class ProductSeoTranslation extends Model
{
    use HasUuids;

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
