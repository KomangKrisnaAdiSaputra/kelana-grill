<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['product_id', 'item_product_id', 'qty', 'unit'])]

class ProductItem extends Model
{
    use HasUuids;
}
