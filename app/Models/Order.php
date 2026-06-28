<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

#[Fillable([
    "booking_id",
    "type",
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

    public const TYPE_WEBSITE = "WEBSITE";
    public const TRANSACTION = "TRANSACTION";

    public const STATUS_PAID = "PAID";
    public const STATUS_UNPAID = "UNPAID";
    public const STATUS_DOWN_PAYMENT = "DOWN PAYMENT";

    protected static function booted(): void
    {
        static::creating(function (Order $order) {
            if (empty($order->booking_id)) {

                $prefix = 'KG-' . now()->format('Ymd');

                $lastOrder = self::where('booking_id', 'like', $prefix . '-%')
                    ->orderByDesc('booking_id')
                    ->first();

                $nextNumber = 1;

                if ($lastOrder) {
                    $lastNumber = (int) substr($lastOrder->booking_id, -4);
                    $nextNumber = $lastNumber + 1;
                }

                $order->booking_id = sprintf(
                    '%s-%04d',
                    $prefix,
                    $nextNumber
                );
            }
        });
    }

    public function details()
    {
        return $this->hasMany(OrderDetail::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    function generateData(?array $request = []): Collection
    {
        return collect([
            "id" => $this->id,
            "bookingId" => $this->booking_id,
            "type" => $this->type,
            "firstName" => $this->first_name,
            "lastName" => $this->last_name,
            "phone" => maskPhone($this->phone, ($request['hide'] ?? true)),
            "email" => maskEmail($this->email, ($request['hide'] ?? true)),
            "address" => $this->address,
            "pickupDate" => Carbon::parse($this->pickup_date)->locale(app()->getLocale())->translatedFormat('d M Y H:i'),
            "returnDate" => Carbon::parse($this->return_date)->locale(app()->getLocale())->translatedFormat('d M Y H:i'),
            "pickupLocation" => $this->pickup_location,
            "guarantee" => $this->guarantee,
            "payment" => $this->payment_method,
            "note" => $this->note,
            "status" => $this->status,
            "subTotal" => $this->sub_total,
            "total" => $this->total,

            "details" => $this->details->map->generateData(),
            "payments" => $this->payments->map->generateData()
        ]);
    }
}
