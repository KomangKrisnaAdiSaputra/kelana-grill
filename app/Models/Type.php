<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;


#[Fillable(['code', 'is_active', 'sort_order',])]
class Type extends Model
{
    use HasUuids;

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function translations()
    {
        return $this->hasMany(TypeTranslation::class);
    }

    public function translation()
    {
        return $this->hasOne(TypeTranslation::class)
            ->where('language', app()->getLocale());
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
