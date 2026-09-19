<?php

namespace App\Http\Controllers;

use App\Helpers\MetaHelper;
use App\Http\Controllers\Controller;
use App\Mail\NewOrder\NewOrderMail;
use App\Models\Order;
use App\Models\Product;
use App\Models\Type;
use App\Models\WareHouse;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    private $breadcrumbs = [];

    function __construct()
    {
        $marinades = Product::active()->whereHas("type", fn($q) => $q->where("name", Type::MARINADE))->get()->map->generateDataMarinade();

        $urlArr = explode("/", url()->current());
        $urlHome = ($urlArr[0] ?? "") . "//" . ($urlArr[2] ?? "") . "/" . ($urlArr[3] ?? "");
        $breadcrumbs = collect([
            [
                "title" => "Home",
                "href" => $urlHome
            ]
        ]);
        if (isset($urlArr[0])) unset($urlArr[0]);
        if (isset($urlArr[1])) unset($urlArr[1]);
        if (isset($urlArr[2])) unset($urlArr[2]);
        if (isset($urlArr[3])) unset($urlArr[3]);

        foreach ($urlArr as $url) {
            $urlHome .= "/" . $url;
            $breadcrumbs->push([
                "title" => Str::title(str_replace("-", " ", $url)),
                "href" => $urlHome
            ]);
        }
        $this->breadcrumbs = $breadcrumbs;

        return Inertia::share([
            'marinades' => $marinades,
            'breadcrumbs' => $this->breadcrumbs
        ]);
    }

    public function index()
    {
        $featuredProduct = Product::notShow()->active()->featured()->inRandomOrder()->first()?->generateDataLanding();
        $products = Product::notShow()->active()->whereHas("type", fn($q) => $q->where("name", Type::PACKAGE))->whereNot("id", $featuredProduct["id"] ?? null)->inRandomOrder()->limit(3)->get()->map->generateDataLanding();

        $image = config('app.logo');

        $seoTitle = translate('Sewa Grill BBQ Bali - Rental Grill & Alat BBQ');

        $metaDescription = translate(
            'Sewa grill BBQ di Bali dengan harga terjangkau. Tersedia grill portable, alat BBQ lengkap, arang, dan paket barbeque untuk villa, camping, gathering, hingga acara keluarga. Booking mudah dan layanan cepat.'
        );

        $keywords = [
            'sewa grill bali',
            'rental grill bali',
            'sewa bbq bali',
            'rental bbq bali',
            'sewa alat bbq bali',
            'rental alat bbq bali',
            'sewa panggangan bali',
            'rental panggangan bali',
            'grill portable bali',
            'sewa grill portable bali',
            'rental grill portable bali',
            'bbq grill rental bali',
            'barbecue rental bali',
            'sewa barbeque bali',
            'sewa alat barbeque bali',
            'bbq equipment rental bali',
            'barbecue equipment rental bali',
            'bbq tools rental bali',
            'charcoal grill rental bali',
            'gas grill rental bali',
            'sewa grill untuk villa bali',
            'grill untuk villa bali',
            'bbq villa bali',
            'private bbq bali',
            'beach bbq bali',
            'family bbq bali',
            'garden bbq bali',
            'camping bbq bali',
            'event bbq bali',
            'birthday bbq bali',
            'gathering bbq bali',
            'outdoor bbq bali',
            'bbq party bali',
            'grill delivery bali',
            'bbq delivery bali',
            'antar grill bali',
            'harga sewa grill bali',
            'harga rental grill bali',
            'cheap bbq rental bali',
            'sewa grill denpasar',
            'sewa grill badung',
            'sewa grill canggu',
            'sewa grill seminyak',
            'sewa grill kuta',
            'sewa grill sanur',
            'sewa grill ubud',
            'sewa grill jimbaran',
            'sewa grill nusa dua',
            'sewa grill uluwatu',
        ];

        setupSeo([
            'title' => $seoTitle,
            'description' => $metaDescription,
            'image' => $image,
            'keywords' => $keywords,
            'type' => 'website',
        ], $this->breadcrumbs);

        addFaqSchema();

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

    public function indexDetailProduct(Request $request)
    {
        $slug = $request->slug;

        $product = Product::notShow()->active()->whereHas("translations", fn($q) => $q->where("slug", $slug))->first()->generateDataLanding();
        if (!$product) return abort(404);

        $products = Product::notShow()->active()->whereNot("id", $product['id'])->get()->map->generateDataLanding();

        setupSeo([
            'title' => $product['metaSeo']['title'] ?? $product['name'],
            'description' => $product['metaSeo']['description'] ?? $product['description'],

            'image' => $product['image'] ?? config('app.logo'),

            'type' => 'product',

            // 'keywords' => [
            //     $product['name'],
            //     "Sewa {$product['name']}",
            //     "Rental {$product['name']}",
            //     "BBQ Bali",
            //     "Grill Bali"
            // ]
            'keywords' => $product['metaSeo']['keyword'] ?? ""
        ], $this->breadcrumbs);

        addProductSchema($product->toArray());

        addFaqSchema();

        return Inertia::render('landing/product/detail', [
            'products' => $products,
            'product' => $product
        ]);
    }

    public function indexContact()
    {
        return Inertia::render('landing/contact', [
            'booking' => session('booking'),
            'warehouses' => WareHouse::select(['id as value', 'preview_address as label'])->whereActive(true)->get(),
            'guarantees' => ['KTP', 'SIM', 'PASPORT', 'OTHERS']
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
        $hasReturn = collect($request->input('carts', []))
            ->contains(fn($cart) => filter_var(
                $cart['return'] ?? false,
                FILTER_VALIDATE_BOOLEAN
            ));

        $validator = Validator::make($request->all(), [
            'firstname' => ['required', 'string', 'max:100'],
            'lastname' => ['required', 'string', 'max:100'],
            'phone' => ['required', 'numeric', 'digits_between:8,15'],
            'email' => ['required', 'email'],
            'address' => ['required', 'string'],
            'pickupdate' => ['required', 'date'],
            'returndate' => [
                Rule::requiredIf($hasReturn),
                'nullable',
                'date',
                'after_or_equal:pickupdate',
            ],

            'guarantee' => [
                Rule::requiredIf($hasReturn),
                'nullable',
                'string',
            ],
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

        $carts = collect($request->carts);

        $validator->validate();

        DB::beginTransaction();
        try {
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
                'warehouse_id' => $request->warehouseId,
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
                $qtyItem = $product->qty;
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
                    'qty_item' => $qtyItem,
                    'unit' => $product?->unit?->code ?? null,

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

                                'qty_item' => $item['qty'],
                                'qty' => $item['qtyItem'],
                                'unit' => $item['unit']['code'],

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

            Mail::to($data['email'])->bcc(config('app.landing.contact.email'))->send(new NewOrderMail($data, $attachmentData));

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

    public function siteMapXml()
    {
        $pages = [
            [
                'route' => 'landing',
                'changefreq' => 'daily',
                'priority' => '1.0',
            ],
            [
                'route' => 'landing.produk',
                'changefreq' => 'weekly',
                'priority' => '0.9',
            ],
            [
                'route' => 'landing.about',
                'changefreq' => 'monthly',
                'priority' => '0.8',
            ],
            [
                'route' => 'landing.contact',
                'changefreq' => 'monthly',
                'priority' => '0.7',
            ],
        ];

        $items = [];

        foreach ($pages as $page) {

            foreach (['id', 'en'] as $locale) {

                $items[] = [
                    'loc' => route($page['route'], [
                        'locale' => $locale,
                    ]),
                    'lastmod' => now()->toAtomString(),
                    'changefreq' => $page['changefreq'],
                    'priority' => $page['priority'],
                    'alternate' => [
                        [
                            'locale' => 'id',
                            'url' => route($page['route'], ['locale' => 'id']),
                        ],
                        [
                            'locale' => 'en',
                            'url' => route($page['route'], ['locale' => 'en']),
                        ],
                    ],
                ];
            }
        }

        return response()
            ->view('sitexml', compact('items'))
            ->header('Content-Type', 'application/xml');
    }
}
