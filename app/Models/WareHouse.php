<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'address', 'active',])]
class WareHouse extends Model
{
    use HasUuids;

    protected $casts = [
        'active' => 'boolean',
    ];
}
