<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

#[Fillable(['type_id', 'rate', 'is_featured', 'is_new', 'is_active', 'image', 'sort_order'])]
class Product extends Model
{
    use HasUuids;

    protected $casts = [
        'rate' => 'decimal:2',
        'featured' => 'boolean',
        'new' => 'boolean',
        'active' => 'boolean',
        'sort_order' => 'integer',
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
        return $this->hasOne(ProductTranslation::class)
            ->where('language', app()->getLocale());
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'product_categories')
            ->withTimestamps();
    }

    public function badges()
    {
        return $this->belongsToMany(Badge::class, 'product_badges')
            ->withTimestamps();
    }

    public function packageItems()
    {
        return $this->belongsToMany(
            Product::class,
            'package_items',
            'package_id',
            'product_id'
        )
            ->withPivot(['qty', 'sort_order'])
            ->withTimestamps();
    }

    public function includedInPackages()
    {
        return $this->belongsToMany(
            Product::class,
            'package_items',
            'product_id',
            'package_id'
        )
            ->withPivot(['qty', 'sort_order'])
            ->withTimestamps();
    }

    public function variants()
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function activeVariants()
    {
        return $this->hasMany(ProductVariant::class)
            ->where('is_active', true)
            ->orderBy('sort_order');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeNewProduct($query)
    {
        return $query->where('is_new', true);
    }
}
