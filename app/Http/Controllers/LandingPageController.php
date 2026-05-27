<?php

namespace App\Http\Controllers;

use App\Data\KelanaGrillData;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    public function index(Request $request)
    {
        $data = KelanaGrillData::get();

        $products = $data['products'];

        return Inertia::render('landing/index', [
            'locale' => $data['locale'],

            'types' => $data['types']->map(fn($item) => $this->generateDataType($item)),

            'featuredProduct' => $this->generateDataProduct($products->firstWhere('featured', true)),
            'products' => $products->where('featured', false)->where('type_id', 'type-package')->take(3)->values()->map(fn($item) => $this->generateDataProduct($item)),

            'categories' => $data['categories']->map(fn($item) => $this->generateDataCategory($item)),
            'badges' => $data['badges']->map(fn($item) => $this->generateDataBadge($item)),
        ]);
    }

    public function indexProduct(Request $request)
    {
        $data = KelanaGrillData::get();

        return Inertia::render('landing/product', [
            'products' => collect($data['products'] ?? [])->map(fn($item) => $this->generateDataProduct($item)),
        ]);
    }

    public function indexContact()
    {
        return Inertia::render('landing/contact', [
            "booking" => Inertia::optional(fn(Request $request) => $this->booking($request))
        ]);
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
            'cart' => ['required', 'array', 'min:1'],
        ], [
            'firstname.required' => 'First name wajib diisi',
            'lastname.required' => 'Last name wajib diisi',
            'phone.required' => 'Nomor phone wajib diisi',
            'phone.numeric' => 'Nomor phone hanya angka',
            'email.email' => 'Format email tidak valid',
            'returndate.after_or_equal' =>
            'Tanggal pengembalian tidak valid',
            'cart.min' => 'Keranjang masih kosong',
        ]);

        if ($validator->fails()) {
            return back()->withErrors(
                $validator
            );
        }

        /*
    |--------------------------------------------------------------------------
    | ORDER DATA
    |--------------------------------------------------------------------------
    */

        $orderData = [
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
            'status' => 'pending',
            'total' => collect($request->cart)->sum(function ($item) {
                return ($item['variant']['rate'] ?? 0)
                    * ($item['qty'] ?? 1);
            }),
        ];

        /*
    |--------------------------------------------------------------------------
    | ORDER DETAILS
    |--------------------------------------------------------------------------
    */

        $orderDetails = collect($request->cart)->map(function ($item) {
            return [
                'product_id' => $item['product']['id'] ?? null,
                'variant_id' => $item['variant']['id'] ?? null,
                'product_name' => $item['product']['name'] ?? '',
                'variant_name' => $item['variant']['name'] ?? '',
                'qty' => $item['qty'] ?? 1,
                'price' => $item['variant']['rate'] ?? 0,
                'subtotal' => ($item['variant']['rate'] ?? 0)
                    * ($item['qty'] ?? 1),
            ];
        })->values();

        /*
    |--------------------------------------------------------------------------
    | SAVE TO DATABASE
    |--------------------------------------------------------------------------
    */

        // $order = Order::create($orderData);

        // foreach ($orderDetails as $detail) {
        //     $order->details()->create($detail);
        // }

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

            $cartText .=
                "- {$detail['product_name']} ({$detail['variant_name']}) x{$detail['qty']} (Rp {$price})\n";
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

        $whatsappNumber = config(
            'app.landing.contact.whatsapp_number'
        );

        $url =
            'https://wa.me/' .
            $whatsappNumber .
            '?text=' .
            urlencode($message);
        dd($url, $orderData, $orderDetails);
        return redirect()->away($url);
    }

    function generateDataType($item)
    {
        return [
            'id' => $item['id'],
            'name' => $item['name'],
            'slug' => $item['slug'],
        ];
    }

    function generateDataProduct($item)
    {
        $translate = $item['translation'];
        return [
            'id' => $item['id'],
            'name' => $translate['name'],
            'slug' => $translate['slug'],
            'description' => $translate['description'],
            'featuredLabel' => $item['featured_label'] ?? null,
            'rate' => $item['rate'],
            'image' => $item['image'],
            'featured' => $item['featured'],
            'new' => $item['new'],
            'type' => $item['type']['name'],
            'variants' => $item['variants']->map(fn($variant) => $this->generateDataVariant($variant)),
            'categories' => $item['categories']->map(fn($category) => $this->generateDataCategory($category)),
            'badges' => $item['badges']->map(fn($badge) => $this->generateDataBadge($badge)),
            'items' => $item['items']->map(fn($item) => $this->generateDataItem($item))
        ];
    }

    function generateDataVariant($item)
    {
        $translate = $item['translation'];

        return [
            'id' => $item['id'],
            'name' => $translate['name'],
            'slug' => $translate['slug'],
            'description' => $translate['description'],
            'rate' => $item['rate'],
            'minPerson' => $item['min_person'],
            'maxPerson' => $item['max_person'],
        ];
    }

    function generateDataCategory($item)
    {
        $translate = $item['translation'];

        return [
            'id' => $item['id'],
            'name' => $translate['name'],
            'slug' => $translate['slug'],
        ];
    }

    function generateDataBadge($item)
    {
        $translate = $item['translation'];

        return [
            'id' => $item['id'],
            'name' => $translate['name'],
            'slug' => $translate['slug'],
        ];
    }

    function generateDataItem($item)
    {
        $translate = $item['item_product_translation'];
        return [
            'id' => $item['id'],
            'name' => $translate['name'],
            'slug' => $translate['slug'],
            'description' => $translate['description'],
            'qty' => $item['qty'],
            'unit' => $item['unit'],
        ];
    }
}
