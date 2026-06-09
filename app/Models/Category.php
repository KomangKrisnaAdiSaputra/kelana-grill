<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Collection;

#[Fillable(["active"])]
class Category extends Model
{
    use HasUuids;

    protected $casts = [
        "active" => "boolean",
    ];

    public function translations()
    {
        return $this->hasMany(CategoryTranslation::class);
    }

    public function translation()
    {
        return $this->hasOne(CategoryTranslation::class)->where("language", app()->getLocale());
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, "product_categories")->withTimestamps();
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where("active", true);
    }

    function generateData(): Collection
    {
        $translation = $this->translation;

        return collect([
            "id" => $this->id,
            "name" => $translation->name
        ]);
    }
}
