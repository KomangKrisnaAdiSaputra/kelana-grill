<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

#[Fillable(["order_id", "created_by", "payment_no", "payment_method", "payment_channel", "amount", "note", "paid_at", "status"])]
class Payment extends Model
{
    use HasUuids;
    public const STATUS_PAID = "PAID";
    public const STATUS_UNPAID = "UNPAID";

    protected static function booted(): void
    {
        static::creating(function (Payment $payment) {
            if (empty($payment->payment_no)) {

                $lastPayment = self::where('order_id', $payment->order_id)->orderByDesc('payment_no')->first();

                $nextNumber = 1;

                if ($lastPayment) {
                    $lastNumber = (int) $lastPayment->payment_no;
                    $nextNumber = $lastNumber + 1;
                }

                $payment->payment_no =   $nextNumber;
            }
        });
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function image()
    {
        return $this->hasOne(Image::class, 'connect_id', 'id')->where('default', true);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class);
    }

    function generateData(): Collection
    {
        return collect([
            "id" => $this->id,
            "createBy" => $this->createdBy?->name ?? null,
            "paymentNo" => $this->payment_no,
            "paymentMethod" => $this->payment_method,
            "paymentChannel" => $this->payment_channel,
            "amount" => $this->amount,
            "note" => $this->note,
            "paidAt" => $this->paid_at,
            "image" => $this->image ? $this->image->generateData() : null,
            "status" => $this->status,
        ]);
    }
}
