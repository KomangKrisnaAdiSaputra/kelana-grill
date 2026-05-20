<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

#[Fillable(['badge_id', 'language', 'name', 'slug'])]
class BadgeTranslation extends Model
{
    use HasUuids;

    public function badge()
    {
        return $this->belongsTo(Badge::class);
    }
}
