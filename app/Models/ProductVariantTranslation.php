<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['product_variant_id', 'language', 'name', 'slug', 'description'])]
class ProductVariantTranslation extends Model
{
    use HasUuids;
}
