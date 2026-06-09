<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Collection;

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

    public function translation()
    {
        return $this->hasOne(ProductVariantTranslation::class)->where("language", app()->getLocale());
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    function generateData(): Collection
    {
        $translation = $this->translation;

        return collect([
            "id" => $this->id,
            "rate" => $this->rate,
            "minPerson" => $this->min_person,
            "maxPerson" => $this->max_person,

            "name" => $translation->name,
            "description" => $translation->description
        ]);
    }
}
