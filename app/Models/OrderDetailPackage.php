<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

#[Fillable(["order_detail_id", "instance_no", "name"])]
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

    public function options()
    {
        return $this->hasMany(OrderDetailOption::class, "general_id", "id");
    }

    function generateData(): Collection
    {
        return collect([
            "id" => $this->id,
            "name" => $this->name,
            "packageNumber" => $this->instance_no,

            "items" => $this->items->map->generateData(),
            "options" => $this->options->map->generateData()
        ]);
    }
}
