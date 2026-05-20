<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

#[Fillable(['product_id', 'language', 'name', 'slug', 'description', 'featured_label'])]
class ProductTranslation extends Model
{
    use HasUuids;

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
