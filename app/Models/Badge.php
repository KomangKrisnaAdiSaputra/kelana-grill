<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

#[Fillable(['is_active', 'sort_order'])]
class Badge extends Model
{
    use HasUuids;

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function translations()
    {
        return $this->hasMany(BadgeTranslation::class);
    }

    public function translation()
    {
        return $this->hasOne(BadgeTranslation::class)
            ->where('language', app()->getLocale());
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_badges')
            ->withTimestamps();
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
