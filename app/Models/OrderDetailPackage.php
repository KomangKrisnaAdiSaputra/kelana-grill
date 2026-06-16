<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

#[Fillable(["order_detail_id", "instance_no", "product_marinade_name"])]
class OrderDetailPackage extends Model
{
    use HasUuids;

    public function detail()
    {
        return $this->belongsTo(OrderDetail::class);
    }

    public function items()
    {
        return $this->hasMany(OrderDetailPackageItem::class, 'package_id');
    }

    function generateData(): Collection
    {
        return collect([
            "id" => $this->id,
            "nameMarinade" => $this->product_marinade_name,
            "packageNumber" => $this->instance_no,

            "items" => $this->items->map->generateData()
        ]);
    }
}
