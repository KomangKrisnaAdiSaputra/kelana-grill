<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

#[Fillable(['code', 'name'])]
class Unit extends Model
{
    use HasUuids;

    function generateData(): Collection
    {
        return collect([
            "id" => $this->id,
            "name" => $this->name,
            "code" => $this->code,
        ]);
    }
}
