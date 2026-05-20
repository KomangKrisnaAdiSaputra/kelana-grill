<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

#[Fillable(['product_id', 'rate', 'min_person', 'max_person', 'is_active', 'sort_order'])]
class ProductVariant extends Model
{
    use HasUuids;

    protected $casts = [
        'rate' => 'decimal:2',
        'min_person' => 'integer',
        'max_person' => 'integer',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
