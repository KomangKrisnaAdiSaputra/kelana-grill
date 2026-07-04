<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

#[Fillable(["general_id", "product_id", "type", "name"])]
class OrderDetailOption extends Model
{
    use HasUuids;

    public function item()
    {
        return $this->belongsTo(OrderDetailPackageItem::class);
    }

    public function detail()
    {
        return $this->belongsTo(OrderDetail::class);
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
