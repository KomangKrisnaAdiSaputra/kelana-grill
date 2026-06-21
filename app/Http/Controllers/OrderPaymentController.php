<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
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
        ]);
    }
}
