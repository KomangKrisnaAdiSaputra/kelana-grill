<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

#[Fillable([
    "first_name",
    "last_name",
    "phone",
    "email",
    "address",
    "pickup_date",
    "return_date",
    "pickup_location",
    "guarantee",
    "payment_method",
    "note",
    "status",
    "sub_total",
    "total"
])]
class Order extends Model
{
    use HasUuids;

    public function details()
    {
        return $this->hasMany(OrderDetail::class);
    }

    function generateData(): Collection
    {
        return collect([
            "id" => $this->id,
            "firstName" => $this->first_name,
            "lastName" => $this->last_name,
            "phone" => $this->phone,
            "email" => $this->email,
            "address" => $this->address,
            "pickupDate" => $this->pickup_date,
            "returnDate" => $this->return_date,
            "guarantee" => $this->guarantee,
            "payment" => $this->payment_method,
            "note" => $this->note,
            "status" => $this->status,
            "subTotal" => $this->sub_total,
            "total" => $this->total,

            "details" => $this->details->map->generateData()
        ]);
    }
}
