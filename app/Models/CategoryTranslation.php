<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

#[Fillable(['category_id', 'language', 'name', 'slug'])]
class CategoryTranslation extends Model
{
    use HasUuids;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
