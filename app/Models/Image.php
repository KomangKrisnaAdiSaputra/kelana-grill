<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

#[Fillable(["connect_id", "default", "name", "folder", "type", "disk", "url"])]
class Image extends Model
{
    use HasUuids;

    function generateData(): Collection
    {
        return collect([
            "id" => $this->id,
            "name" => $this->name,
            "url" => $this->url
        ]);
    }
}
