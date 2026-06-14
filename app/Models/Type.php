<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;


#[Fillable(['name', 'slug', 'active',])]
class Type extends Model
{
    use HasUuids;
    public const PACKAGE = "PACKAGE";
    public const MARINADE = "MARINADE";

    protected $casts = [
        'active' => 'boolean',
    ];
}
