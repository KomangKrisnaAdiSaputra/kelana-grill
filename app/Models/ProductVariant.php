<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

#[Fillable(['product_id', 'rate', 'min_person', 'max_person', 'active'])]
class ProductVariant extends Model
{
    use HasUuids;

    protected $casts = [
        'rate' => 'decimal:2',
        'min_person' => 'integer',
        'max_person' => 'integer',
        'active' => 'boolean',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function translations()
    {
        return $this->hasMany(ProductVariantTranslation::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
