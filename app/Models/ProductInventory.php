<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

#[Fillable(['warehouse_id', 'product_id', 'unit_id', 'stock', 'note'])]
class ProductInventory extends Model
{
    use HasUuids;

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function warehouse()
    {
        return $this->belongsTo(WareHouse::class);
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    function generateData(): Collection
    {
        return collect([
            "id" => $this->id,
            "warehouse" => $this->warehouse->generateData(),
            "product" => $this->product->generateDataLanding(),
            "unit" => $this->unit->generateData(),
            "stock" => $this->stock,
            "note" => $this->note
        ]);
    }
}
