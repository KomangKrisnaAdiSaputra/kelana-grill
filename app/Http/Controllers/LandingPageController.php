<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    public function index()
    {
        $featuredProduct = Product::notShow()->active()->featured()->inRandomOrder()->first()->generateDataLanding();
        $products = Product::notShow()->active()->whereHas("type", fn($q) => $q->where("name", Type::PACKAGE))->whereNot("id", $featuredProduct["id"])->inRandomOrder()->limit(3)->get()->map->generateDataLanding();
        $marinades = Product::active()->whereHas("type", fn($q) => $q->where("name", Type::MARINADE))->get()->map->generateDataMarinade();
        return Inertia::render('landing/index', [
            'featuredProduct' => $featuredProduct,
            'products' => $products,
            'marinades' => $marinades
        ]);
    }

    public function indexProduct()
    {
        $products = Product::notShow()->active()->get()->map->generateDataLanding();
        $marinades = Product::active()->whereHas("type", fn($q) => $q->where("name", Type::MARINADE))->get()->map->generateDataMarinade();

        return Inertia::render('landing/product', [
            'products' => $products,
            'marinades' => $marinades
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

    public function booking(Request $request)
    {
        // $validator = Validator::make($request->all(), [
        //     'firstname' => ['required', 'string', 'max:100'],
        //     'lastname' => ['required', 'string', 'max:100'],
        //     'phone' => ['required', 'numeric', 'digits_between:8,15'],
        //     'email' => ['required', 'email'],
        //     'address' => ['required', 'string'],
        //     'pickupdate' => ['required', 'date'],
        //     'returndate' => [
        //         'required',
        //         'date',
        //         'after_or_equal:pickupdate'
        //     ],
        //     'pickuplocation' => ['required', 'string'],
        //     'guarantee' => ['required', 'string'],
        //     'payment' => ['required', 'in:Cash,Transfer'],
        //     'carts' => ['required', 'array', 'min:1'],
        // ], [
        //     // Firstname
        //     'firstname.required' => 'Nama depan wajib diisi',
        //     'firstname.string' => 'Nama depan tidak valid',
        //     'firstname.max' => 'Nama depan maksimal 100 karakter',

        //     // Lastname
        //     'lastname.required' => 'Nama belakang wajib diisi',
        //     'lastname.string' => 'Nama belakang tidak valid',
        //     'lastname.max' => 'Nama belakang maksimal 100 karakter',

        //     // Phone
        //     'phone.required' => 'Nomor telepon wajib diisi',
        //     'phone.numeric' => 'Nomor telepon hanya boleh berisi angka',
        //     'phone.digits_between' => 'Nomor telepon harus terdiri dari 8 sampai 15 digit',

        //     // Email
        //     'email.required' => 'Email wajib diisi',
        //     'email.email' => 'Format email tidak valid',

        //     // Address
        //     'address.required' => 'Alamat wajib diisi',
        //     'address.string' => 'Alamat tidak valid',

        //     // Pickup Date
        //     'pickupdate.required' => 'Tanggal pengambilan wajib diisi',
        //     'pickupdate.date' => 'Tanggal pengambilan tidak valid',

        //     // Return Date
        //     'returndate.required' => 'Tanggal pengembalian wajib diisi',
        //     'returndate.date' => 'Tanggal pengembalian tidak valid',
        //     'returndate.after_or_equal' => 'Tanggal pengembalian tidak boleh sebelum tanggal pengambilan',

        //     // Pickup Location
        //     'pickuplocation.required' => 'Lokasi pengambilan wajib dipilih',
        //     'pickuplocation.string' => 'Lokasi pengambilan tidak valid',

        //     // Guarantee
        //     'guarantee.required' => 'Jaminan wajib dipilih',
        //     'guarantee.string' => 'Jaminan tidak valid',

        //     // Payment
        //     'payment.required' => 'Metode pembayaran wajib dipilih',
        //     'payment.in' => 'Metode pembayaran tidak valid',

        //     // Cart
        //     'carts.required' => 'Keranjang wajib diisi',
        //     'carts.array' => 'Data keranjang tidak valid',
        //     'carts.min' => 'Keranjang masih kosong',
        // ]);

        // $validator->validate();

        DB::transaction(function () use ($request) {

            $carts = collect($request->carts);

            $productIds = $carts
                ->flatMap(function ($cart) {
                    return explode(';', $cart['id']);
                })
                ->filter()
                ->unique()
                ->values();

            $products = Product::with('variants')
                ->whereIn('id', $productIds)
                ->get();

            $order = Order::create([
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'phone' => $request->phone,
                'email' => $request->email,
                'address' => $request->address,
                'pickup_date' => $request->pickupdate,
                'return_date' => $request->returndate,
                'pickup_location' => $request->pickuplocation,
                'guarantee' => $request->guarantee,
                'payment_method' => $request->payment,
                'note' => $request->note,
                'status' => 'UNPAID',
                'sub_total' => 0,
                'total' => 0,
            ]);

            $subTotal = 0;
            $total = 0;

            foreach ($carts as $cart) {

                $ids = explode(';', $cart['id']);

                $product = $products->firstWhere(
                    'id',
                    $ids[0]
                );

                if (!$product) {
                    continue;
                }

                $variant = null;

                if (!empty($ids[1])) {
                    $variant = $product->variants
                        ->firstWhere(
                            'id',
                            $ids[1]
                        );
                }

                $qty = (int) $cart['qty'];

                $rate = $variant?->rate
                    ?? $product->rate;

                $detailSubTotal = $rate * $qty;

                $detailTotal = $detailSubTotal;

                $subTotal += $detailSubTotal;
                $total += $detailTotal;

                $orderDetail = $order->details()->create([
                    'product_id' => $product->id,
                    'product_variant_id' => $variant?->id,

                    'name' => $cart['name'],
                    'description' => $cart['description'],

                    'marinade' => (
                        $cart['variant']['marinade']
                        ?? $cart['marinade']
                        ?? false
                    ),

                    'qty' => $qty,

                    'rate' => $rate,

                    'sub_total' => $detailSubTotal,
                    'total' => $detailTotal,
                ]);

                $packageInstances = collect(
                    $cart['packageInstances'] ?? []
                )->filter();

                foreach ($packageInstances as $index => $packageInstance) {

                    $package = $orderDetail
                        ->packages()
                        ->create([
                            'instance_no' => $index + 1,

                            'product_marinade' =>
                            $packageInstance['productMarinade']['name']
                                ?? null,
                        ]);

                    $items = collect(
                        $packageInstance['items'] ?? []
                    );

                    foreach ($items as $item) {

                        $packageItem = $package
                            ->items()
                            ->create([
                                'product_id' =>
                                $item['id'] ?? null,

                                'name' =>
                                $item['name'],

                                'description' =>
                                $item['description'],

                                'qty' =>
                                $item['qty'],

                                'unit' =>
                                $item['unit'],

                                'quantity' =>
                                $item['quantity']
                                    ?? $item['qty'],

                                'marinade' =>
                                $item['marinade']
                                    ?? false,

                                'type' =>
                                $item['type']
                                    ?? null,
                            ]);

                        foreach (
                            $item['marinadeItems']
                                ?? []
                            as $marinade
                        ) {

                            $packageItem
                                ->options()
                                ->create([
                                    'type' => 'MARINADE',

                                    'option_id' =>
                                    $marinade['id']
                                        ?? null,

                                    'name' =>
                                    $marinade['name'],
                                ]);
                        }

                        foreach (
                            $item['choiceItems']
                                ?? []
                            as $choice
                        ) {

                            $packageItem
                                ->options()
                                ->create([
                                    'type' => 'CHOICE',

                                    'option_id' =>
                                    $choice['id']
                                        ?? null,

                                    'name' =>
                                    $choice['name'],
                                ]);
                        }
                    }
                }
            }

            // $order->update([
            //     'sub_total' => $subTotal,
            //     'total' => $total,
            // ]);
        });

        /*
        |--------------------------------------------------------------------------
        | WHATSAPP MESSAGE
        |--------------------------------------------------------------------------
        */

        $cartText = '';

        foreach ($orderDetails as $detail) {
            $price = number_format(
                $detail['price'],
                0,
                ',',
                '.'
            );

            $cartText .= "- {$detail['product_name']} ({$detail['variant_name']}) x{$detail['qty']} (Rp {$price})\n";
        }

        $message =
            "FORMAT PEMESANAN 'Kelana Grill'\n\n" .

            "Nama : {$request->firstname} {$request->lastname}\n" .

            "No Tlpn : {$request->phone}\n" .

            "Alamat : {$request->address}\n\n" .

            "Pesanan :\n{$cartText}\n" .

            "Hari/Tanggal/Jam Pengambilan : {$request->pickupdate}\n" .

            "Hari/Tanggal/Jam Pengembalian : {$request->returndate}\n" .

            "Lokasi Pengambilan : {$request->pickuplocation}\n" .

            "Jaminan : {$request->guarantee}\n" .

            "Pembayaran : {$request->payment}\n\n" .

            "Catatan : {$request->note}";

        $whatsappNumber = config('app.landing.contact.whatsapp_number');

        $url = 'https://wa.me/' . $whatsappNumber . '?text=' . urlencode($message);
        return redirect()->back()->with([
            'booking' => [
                'result' => 'success',
                'success' => true,
                'code' => 200,
                'data' => [
                    'url' => $url,
                ],
                'message' => 'Booking berhasil, silakan lanjutkan ke WhatsApp untuk mengirimkan pesan pemesanan',
            ]
        ]);
    }
}
