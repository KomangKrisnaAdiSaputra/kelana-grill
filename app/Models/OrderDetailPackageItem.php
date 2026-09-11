<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

#[Fillable([
    "package_id",
    "product_id",
    "name",
    "description",
    "qty",
    "qty_item",
    "unit",
    "marinade",
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
        return $this->hasMany(OrderDetailOption::class, "general_id", "id");
    }

    function generateData(): Collection
    {
        return collect([
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "qty" => $this->qty,
            "qtyItem" => $this->qty_item,
            "unit" => $this->unit,
            "marinade" => $this->marinade,

            "options" => $this->options->map->generateData()
        ]);
    }
}
