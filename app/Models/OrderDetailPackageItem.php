<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

#[Fillable([
    "package_id",
    "name",
    "description",
    "qty",
    "unit",
    "marinade",
    "type"
])]
class OrderDetailPackageItem extends Model
{
    use HasUuids;

    protected $casts = [
        "marinade" => "boolean",
    ];

    public function package()
    {
        return $this->belongsTo(OrderDetailPackage::class, 'package_id');
    }

    public function options()
    {
        return $this->hasMany(OrderDetailItemOption::class);
    }

    function generateData(): Collection
    {
        return collect([
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "qty" => $this->qty,
            "unit" => $this->unit,
            "marinade" => $this->marinade,

            "options" => $this->options->map->generateData()
        ]);
    }
}
