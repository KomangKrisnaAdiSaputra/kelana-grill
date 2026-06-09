<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Support\Collection;

#[Fillable(["type_id", "rate", "featured", "new", "active", "image"])]
class Product extends Model
{
    public const TYPE_PACKAGE = "PACKAGE";
    use HasUuids;

    protected $casts = [
        "rate" => "decimal:2",
        "featured" => "boolean",
        "new" => "boolean",
        "active" => "boolean",
    ];

    public function type()
    {
        return $this->belongsTo(Type::class);
    }

    public function translations()
    {
        return $this->hasMany(ProductTranslation::class);
    }

    public function translation()
    {
        return $this->hasOne(ProductTranslation::class)->where("language", app()->getLocale());
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, "product_categories")->withTimestamps();
    }

    public function badges()
    {
        return $this->belongsToMany(Badge::class, "product_badges")->withTimestamps();
    }

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function items()
    {
        return $this->belongsToMany(
            Product::class,
            "product_items",
            "product_id",
            "item_product_id"
        )->withPivot("qty", "unit")->withTimestamps();
    }

    public function activeVariants()
    {
        return $this->hasMany(ProductVariant::class)->where("active", true);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where("active", true);
    }

    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where("featured", true);
    }

    public function scopeNewProduct(Builder $query): Builder
    {
        return $query->where("new", true);
    }

    function generateDataItem(): Collection
    {
        $translation = $this->translation;
        $productItem = $this->pivot;

        return collect([
            "name" => $translation->name,
            "description" => $translation->description,
            "qty" => $productItem->qty,
            "unit" => $productItem->unit
        ]);
    }

    public function generateDataLanding(): Collection
    {
        $translation = $this->translation;

        return collect([
            "id" => $this->id,
            "rate" => $this->rate,
            "featured" => $this->featured,
            "new" => $this->new,
            "image" => $this->image,

            "name" => $translation->name,
            "description" => $translation->description,
            "featuredLabel" => $translation->featured_label,

            "type" => $this->type->name,

            "categories" => $this->categories->map->generateData()->pluck("name"),
            "badges" => $this->badges->map->generateData()->pluck("name"),
            "variants" => $this->variants->map->generateData(),

            "items" => $this->items->map->generateDataItem()
        ]);
    }
}
