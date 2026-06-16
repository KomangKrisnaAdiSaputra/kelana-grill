<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

#[Fillable(["order_detail_package_item_id", "type", "name"])]
class OrderDetailItemOption extends Model
{
    use HasUuids;

    public function item()
    {
        return $this->belongsTo(OrderDetailPackageItem::class);
    }

    function generateData(): Collection
    {
        return collect([
            "id" => $this->id,
            "name" => $this->name,
            "type" => $this->type,
        ]);
    }
}
