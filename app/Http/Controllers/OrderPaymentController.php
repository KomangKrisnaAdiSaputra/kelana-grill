<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Payment;
use App\Models\Image;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class OrderPaymentController extends Controller
{
    public function index()
    {
        $orders = Order::query()
            ->latest()
            ->paginate(10)
            ->through(fn($item) => $item->generateData());

        return Inertia::render('order-payment/index', [
            'orders' => $orders,
            'stats' => [
                'total' => Order::count(),
                'unpaid' => Order::where('status', 'UNPAID')->count(),
                'partial' => 0,
                'paid' => Order::where('status', 'PAID')->count(),
            ],
            'saveData' => session('saveData'),
        ]);
    }

    public function save(Request $request)
    {
        $remainingAmount = $this->getRemaining($request);
        $request->validate([
            'orderId' => ['required', 'exists:orders,id'],
            'paymentMethod' => ['required'],
            'paymentChannel' => ['required_if:paymentMethod,TRANSFER'],
            'amount' => ['required', 'numeric', 'min:1'],
            'paidAt' => ['required'],
            'status' => ['required'],
            'note' => ['nullable'],
            'image.file' => ['nullable', 'image', 'max:5120'],
        ], [
            'orderId.required' => 'Order is required.',
            'orderId.exists' => 'Order not found.',

            'paymentMethod.required' => 'Payment method is required.',

            'paymentChannel.required_if' => 'Payment channel is required when payment method is Transfer.',


            'amount.required' => 'Amount is required.',
            'amount.numeric' => 'Amount must be a number.',
            'amount.min' => 'Amount must be at least 1.',
            // 'amount.max' => 'Payment amount cannot exceed the remaining balance of IDR ' . number_format($remainingAmount, 0, ',', '.') . '.',

            'paidAt.required' => 'Paid date is required.',

            'status.required' => 'Payment status is required.',

            'image.file.image' => 'The uploaded file must be an image.',
            'image.file.max' => 'The image may not be greater than 5 MB.',
        ]);

        DB::beginTransaction();
        try {
            $id = $request->id;
            $orderId = $request->orderId;

            $dataPayment = [
                'order_id' => $request->orderId,
                'created_by' => auth()->id(),
                'payment_method' => $request->paymentMethod,
                'payment_channel' => $request->paymentChannel,
                'amount' => $request->amount,
                'note' => $request->note,
                'paid_at' => $request->paidAt,
                'status' => $request->status,
            ];

            $payment = $id ? Payment::find($id) : Payment::create($dataPayment);
            if ($id) {
                $payment->update($dataPayment);
            }

            $order = Order::with(['payments'])->find($orderId);
            $payments = $order->payments->map->generateData();

            $paidAmount = $payments->where("status", Payment::STATUS_PAID)->sum('amount');

            $status = Order::STATUS_UNPAID;
            if ($paidAmount >= $order->total) {
                $status = Order::STATUS_PAID;
            }

            if ($paidAmount < $order->total && $paidAmount > 0) {
                $status = Order::STATUS_DOWN_PAYMENT;
            }
            $order->update(['status' => $status]);


            /*
            |--------------------------------------------------------------------------
            | Upload Image
            |--------------------------------------------------------------------------
            */
            if ($request->hasFile('image.file')) {

                $file = $request->file('image.file');

                $folder = 'payments/' . date('Y/m');

                $path = $file->store($folder, 'public');

                Image::create([
                    'connect_id' => $payment->id,
                    'default' => true,
                    'name' => $file->getClientOriginalName(),
                    'folder' => $folder,
                    'type' => $file->getClientMimeType(),
                    'disk' => 'public',
                    'url' => Storage::disk('public')->url($path),
                ]);
            }

            DB::commit();

            return redirect()->back()->with([
                'saveData' => [
                    'result' => 'success',
                    'success' => true,
                    'code' => 200,
                    'data' => $payment->load('image')->generateData(),
                    'message' => 'Payment saved successfully',
                ]
            ]);
        } catch (\Throwable $e) {

            DB::rollBack();
            throw ValidationException::withMessages([
                'message' => $e->getMessage(),
            ]);
        }
    }

    function getRemaining(Request $request)
    {
        $order = Order::findOrFail($request->orderId);
        $paidAmount = $order->payments()->where('status', Payment::STATUS_PAID)->sum('amount');

        return max(0, $order->total - $paidAmount);
    }
}
