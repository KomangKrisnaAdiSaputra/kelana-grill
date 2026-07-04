<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\NewOrder\NewOrderMail;
use App\Models\Order;
use App\Models\Product;
use App\Models\Type;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    function __construct()
    {
        $marinades = Product::active()->whereHas("type", fn($q) => $q->where("name", Type::MARINADE))->get()->map->generateDataMarinade();

        return Inertia::share([
            'marinades' => $marinades
        ]);
    }

    public function index()
    {
        $featuredProduct = Product::notShow()->active()->featured()->inRandomOrder()->first()->generateDataLanding();
        $products = Product::notShow()->active()->whereHas("type", fn($q) => $q->where("name", Type::PACKAGE))->whereNot("id", $featuredProduct["id"])->inRandomOrder()->limit(3)->get()->map->generateDataLanding();
        return Inertia::render('landing/index', [
            'featuredProduct' => $featuredProduct,
            'products' => $products,
        ]);
    }

    public function indexProduct()
    {
        $products = Product::notShow()->active()->get()->map->generateDataLanding();

        return Inertia::render('landing/product', [
            'products' => $products,
        ]);
    }

    public function indexContact()
    {
        return Inertia::render('landing/contact', [
            'booking' => session('booking'),
        ]);
    }

    public function indexAbout()
    {
        return Inertia::render('landing/about');
    }

    function indexStatus(Request $request)
    {
        $id = $request->id;
        $order = Order::findOrFail($id)->generateData();

        return Inertia::render('landing/status', compact('order'));
    }

    public function booking(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstname' => ['required', 'string', 'max:100'],
            'lastname' => ['required', 'string', 'max:100'],
            'phone' => ['required', 'numeric', 'digits_between:8,15'],
            'email' => ['required', 'email'],
            'address' => ['required', 'string'],
            'pickupdate' => ['required', 'date'],
            'returndate' => [
                'required',
                'date',
                'after_or_equal:pickupdate'
            ],
            'pickuplocation' => ['required', 'string'],
            'guarantee' => ['required', 'string'],
            'payment' => ['required', 'in:Cash,Transfer'],
            'carts' => ['required', 'array', 'min:1'],
        ], [
            // Firstname
            'firstname.required' => 'Nama depan wajib diisi',
            'firstname.string' => 'Nama depan tidak valid',
            'firstname.max' => 'Nama depan maksimal 100 karakter',

            // Lastname
            'lastname.required' => 'Nama belakang wajib diisi',
            'lastname.string' => 'Nama belakang tidak valid',
            'lastname.max' => 'Nama belakang maksimal 100 karakter',

            // Phone
            'phone.required' => 'Nomor telepon wajib diisi',
            'phone.numeric' => 'Nomor telepon hanya boleh berisi angka',
            'phone.digits_between' => 'Nomor telepon harus terdiri dari 8 sampai 15 digit',

            // Email
            'email.required' => 'Email wajib diisi',
            'email.email' => 'Format email tidak valid',

            // Address
            'address.required' => 'Alamat wajib diisi',
            'address.string' => 'Alamat tidak valid',

            // Pickup Date
            'pickupdate.required' => 'Tanggal pengambilan wajib diisi',
            'pickupdate.date' => 'Tanggal pengambilan tidak valid',

            // Return Date
            'returndate.required' => 'Tanggal pengembalian wajib diisi',
            'returndate.date' => 'Tanggal pengembalian tidak valid',
            'returndate.after_or_equal' => 'Tanggal pengembalian tidak boleh sebelum tanggal pengambilan',

            // Pickup Location
            'pickuplocation.required' => 'Lokasi pengambilan wajib dipilih',
            'pickuplocation.string' => 'Lokasi pengambilan tidak valid',

            // Guarantee
            'guarantee.required' => 'Jaminan wajib dipilih',
            'guarantee.string' => 'Jaminan tidak valid',

            // Payment
            'payment.required' => 'Metode pembayaran wajib dipilih',
            'payment.in' => 'Metode pembayaran tidak valid',

            // Cart
            'carts.required' => 'Keranjang wajib diisi',
            'carts.array' => 'Data keranjang tidak valid',
            'carts.min' => 'Keranjang masih kosong',
        ]);

        $validator->validate();

        DB::beginTransaction();
        try {
            $carts = collect($request->carts);

            $productIds = $carts->flatMap(fn($cart) => explode(';', $cart['id']))->filter()->unique()->values();
            $products = Product::with('variants')->whereIn('id', $productIds)->get();

            $order = Order::create([
                'type' => Order::TYPE_WEBSITE,
                'first_name' => $request->firstname,
                'last_name' => $request->lastname,
                'phone' => $request->phone,
                'email' => $request->email,
                'address' => $request->address,
                'pickup_date' => $request->pickupdate,
                'return_date' => $request->returndate,
                'pickup_location' => $request->pickuplocation,
                'guarantee' => $request->guarantee,
                'payment_method' => strtoupper($request->payment),
                'note' => $request->note,
                'status' => Order::STATUS_UNPAID,
                'sub_total' => 0,
                'total' => 0,
            ]);

            $subTotal = 0;
            $total = 0;

            foreach ($carts as $cart) {

                $ids = explode(';', $cart['id']);

                $product = $products->firstWhere('id',  $ids[0]);

                if (!$product) {
                    continue;
                }
                $productType = $product->type->name;

                $variant = null;

                if (!empty($ids[1])) {
                    $variant = $product->variants->firstWhere('id', $ids[1]);
                }

                $qty = (int) $cart['qty'];
                $rate = $variant?->rate  ?? $product->rate;
                $detailSubTotal = $rate * $qty;
                $detailTotal = $detailSubTotal;

                $subTotal += $detailSubTotal;
                $total += $detailTotal;

                $orderDetail = $order->details()->create([
                    'product_id' => $product->id,
                    'product_variant_id' => $variant?->id,
                    'type' => $productType,

                    'name' => $cart['name'],
                    'description' => $cart['description'],
                    'variant_name' => $cart["variant"]["name"] ?? null,
                    'variant_description' => $cart["variant"]["description"] ?? null,

                    'marinade' => ($cart['marinade'] ?? false),
                    'qty' => $qty,

                    'rate' => $rate,
                    'sub_total' => $detailSubTotal,
                    'total' => $detailTotal,
                ]);

                $packageInstances = collect($cart['packageInstances'] ?? [])->filter();
                foreach ($packageInstances as $index => $packageInstance) {
                    $package = $orderDetail->packages()->create([
                        'instance_no' => $index + 1,
                        'name' => ($cart['name'] ?? null) . " #" . ($index + 1),
                    ]);

                    if ($productType == Type::ALA_CARTE && $packageInstance['productMarinade']['name'] ?? null) {
                        $package->options()->create([
                            'type' => $productType,
                            'name' => $packageInstance['productMarinade']['name'] ?? null,
                        ]);
                    }

                    $items = collect($packageInstance['items'] ?? []);
                    if ($productType == Type::PACKAGE && $items->isNotEmpty()) {
                        foreach ($items as $item) {

                            $packageItem = $package->items()->create([
                                'product_id' => $item['id'],
                                'name' => $item['name'],
                                'description' => $item['description'],

                                'qty' => $item['qty'],
                                'unit' => $item['unit'],

                                'marinade' =>  $item['marinade'] ?? false,
                            ]);

                            foreach ($item['marinadeItems']  ?? [] as $marinade) {
                                $packageItem->options()->create([
                                    'product_id' =>  $marinade['id'] ?? null,
                                    'type' => $item['type'],
                                    'name' =>  $marinade['name'],
                                ]);
                            }

                            foreach ($item['choiceItems'] ?? [] as $choice) {
                                $packageItem->options()->create([
                                    'product_id' =>  $choice['id'] ?? null,
                                    'type' => $item['type'],
                                    'name' => $choice['name'],
                                ]);
                            }
                        }
                    }
                }
            }

            $order->update([
                'sub_total' => $subTotal,
                'total' => $total,
            ]);

            $data = Order::find($order->id)->generateData(['hide' => false]);
            $url = $this->generateWaUrl($data);

            $attachmentData = [[
                'attach' => Pdf::loadView('pdf.invoice.index', ["order" => $data])->setOption(['isRemoteEnabled' => true])->output(),
                'name' => 'Invoice #' . $order['bookingId'] . '.pdf',
                'option' => ['mime' => 'application/pdf']
            ]];
            Mail::to($data['email'])->send(new NewOrderMail($data, $attachmentData));

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            dd($th->getMessage(), $th->getFile(), $th->getLine(), $th->getTraceAsString());
        }


        return redirect()->back()->with([
            'booking' => [
                'result' => 'success',
                'success' => true,
                'code' => 200,
                'data' => [
                    'url' => $url ?? null,
                ],
                'message' => 'Booking berhasil, silakan lanjutkan ke WhatsApp untuk mengirimkan pesan pemesanan',
            ]
        ]);
    }

    function generateWaUrl(Collection $data): string
    {
        $cartText = '';
        foreach ($data['details'] as $item) {
            $subText = $item["variant"]["name"] ?? $item['description'];
            $cartText .= "- {$item['name']} x{$item['qty']} ({$subText})\n";

            if (!empty($item['packages'])) {
                foreach ($item['packages'] as $package) {
                    if (!empty($package['items'])) {
                        foreach ($package['items'] as $pItem) {
                            $cartText .= "       • {$pItem['name']} x{$pItem['qty']}\n";

                            // FIX: handle Collection / array safely
                            $options = collect($pItem['options'] ?? [])
                                ->pluck('name')
                                ->toArray();

                            if (!empty($options)) {
                                $cartText .= "             ↳ *_" . implode(', ', $options) . "_*\n";
                            }
                        }
                    }

                    if (collect($package['options'])->count() > 0) {
                        $options = collect($package['options'] ?? [])->pluck('name')->toArray();
                        $cartText .= "             ↳ *_" . implode(', ', $options) . "_*\n";
                    }
                }
            }
        }

        $line = fn($label, $value) => str_pad($label, 11, ' ', STR_PAD_RIGHT) . " : " . $value;

        $message =
            "FORMAT PEMESANAN KELANA GRILL\n\n" .

            $line('Nama', "{$data['firstName']} {$data['lastName']}") . "\n" .
            $line('No HP', $data['phone']) . "\n" .
            $line('Email', $data['email']) . "\n" .
            $line('Alamat', $data['address']) . "\n\n" .

            "Pesanan : ({$data['bookingId']})\n{$cartText}\n\n" .

            $line('Pickup', $data['pickupDate']) . "\n" .
            $line('Return', $data['returnDate']) . "\n" .
            $line('Lokasi', $data['pickupLocation']) . "\n" .
            $line('Jaminan', $data['guarantee']) . "\n" .
            $line('Pembayaran', $data['payment']) . "\n\n" .

            $line('Subtotal', 'IDR ' . number_format($data['subTotal'], 0, ',', '.')) . "\n" .
            $line('Total', 'IDR ' . number_format($data['total'], 0, ',', '.')) . "\n\n" .

            $line('Catatan', $data['note'] ?: '-') . "\n";

        $whatsappNumber = config('app.landing.contact.whatsapp_number');

        $url = 'https://wa.me/' . $whatsappNumber . '?text=' . urlencode($message);

        return $url;
    }
}
