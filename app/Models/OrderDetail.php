<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

#[Fillable([
    "order_id",
    "product_id",
    "product_variant_id",
    "type",
    "name",
    "description",
    "variant_name",
    "variant_description",
    "marinade",
    "qty",
    "rate",
    "sub_total",
    "total"
])]
class OrderDetail extends Model
{
    use HasUuids;

    protected $casts = [
        "marinade" => "boolean",
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function packages()
    {
        return $this->hasMany(OrderDetailPackage::class);
    }

    function generateData(): Collection
    {
        return collect([
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "variant" => [
                "name" => $this->variant_name,
                "description" => $this->variant_description
            ],
            "marinade" => $this->marinade,
            "qty" => $this->qty,
            "subTotal" => $this->sub_total,
            "total" => $this->total,

            "packages" => $this->packages->map->generateData()
        ]);
    }
}
