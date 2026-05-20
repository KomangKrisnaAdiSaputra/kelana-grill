<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

#[Fillable(['type_id', 'language', 'name', 'slug'])]
class TypeTranslation extends Model
{
    use HasUuids;

    public function type()
    {
        return $this->belongsTo(Type::class);
    }
}
