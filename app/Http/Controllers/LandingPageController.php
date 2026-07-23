<?php

namespace App\Http\Controllers;

use App\Helpers\MetaHelper;
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
    private $breadcrumbs = [];

    function __construct()
    {
        $marinades = Product::active()->whereHas("type", fn($q) => $q->where("name", Type::MARINADE))->get()->map->generateDataMarinade();

        $urlArr = explode("/", url()->current());
        $urlHome = ($urlArr[0] ?? "") . "//" . ($urlArr[2] ?? "") . "/" . ($urlArr[3] ?? "");
        $breadcrumbs = collect([
            [
                "label" => "Home",
                "url" => $urlHome
            ]
        ]);
        if (isset($urlArr[0])) unset($urlArr[0]);
        if (isset($urlArr[1])) unset($urlArr[1]);
        if (isset($urlArr[2])) unset($urlArr[2]);
        if (isset($urlArr[3])) unset($urlArr[3]);

        foreach ($urlArr as $url) {
            $urlHome .= "/" . $url;
            $breadcrumbs->push([
                "label" => Str::title(str_replace("-", " ", $url)),
                "url" => $urlHome
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

        $seoKeyword = implode(', ', array_map(fn($keyword) => translate($keyword), $keywords));

        $locale = app()->getLocale();

        $ogLocale = match ($locale) {
            'id' => 'id_ID',
            'en' => 'en_US',
            default => 'id_ID',
        };

        MetaHelper::setTitle($seoTitle);

        MetaHelper::addMeta('description', $metaDescription);
        MetaHelper::addMeta('keywords', $seoKeyword); // Optional (Google hampir tidak menggunakannya)
        MetaHelper::addMeta('author', config('app.name'));
        MetaHelper::addMeta('robots', 'index,follow');
        MetaHelper::addMeta('revisit-after', '7 days');

        MetaHelper::setCanonical(url()->current());

        /*
        |--------------------------------------------------------------------------
        | Open Graph
        |--------------------------------------------------------------------------
        */

        MetaHelper::addOpenGraph('type', 'website');
        MetaHelper::addOpenGraph('site_name', config('app.name'));
        MetaHelper::addOpenGraph('locale', $ogLocale);
        MetaHelper::addOpenGraph('title', $seoTitle);
        MetaHelper::addOpenGraph('description', $metaDescription);
        MetaHelper::addOpenGraph('url', url()->current());
        MetaHelper::addOpenGraph('image', $image);
        MetaHelper::addOpenGraph('image:alt', config('app.name'));

        /*
        |--------------------------------------------------------------------------
        | Twitter
        |--------------------------------------------------------------------------
        */

        MetaHelper::addTwitter('card', 'summary_large_image');
        MetaHelper::addTwitter('title', $seoTitle);
        MetaHelper::addTwitter('description', $metaDescription);
        MetaHelper::addTwitter('image', $image);
        MetaHelper::addTwitter('url', url()->current());

        MetaHelper::setCanonical(url()->current());

        /*
        |--------------------------------------------------------------------------
        | Breadcrumb
        |--------------------------------------------------------------------------
        */

        MetaHelper::addBreadcrumbLists(
            collect($this->breadcrumbs)->toArray()
        );

        /*
        |--------------------------------------------------------------------------
        | Organization Schema
        |--------------------------------------------------------------------------
        */

        MetaHelper::addSchema([
            '@context' => 'https://schema.org',
            '@type' => 'Organization',

            'name' => config('app.name'),
            'url' => url('/'),
            'logo' => $image,
            'image' => $image,
            'description' => $metaDescription,
            'inLanguage' => $locale,
        ]);

        /*
        |--------------------------------------------------------------------------
        | Local Business Schema
        |--------------------------------------------------------------------------
        */

        MetaHelper::addSchema([
            '@context' => 'https://schema.org',
            '@type' => 'LocalBusiness',

            'name' => config('app.name'),
            'url' => url('/'),
            'image' => $image,
            'description' => $metaDescription,
            'inLanguage' => $locale,

            'telephone' => config('app.landing.contact.whatsapp_number'),
            'email' => config('app.landing.contact.email'),

            'priceRange' => '$$',

            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => 'Jl. Antasura',
                'addressLocality' => 'Denpasar',
                'addressRegion' => 'Bali',
                'postalCode' => '80111',
                'addressCountry' => 'ID',
            ],

            'areaServed' => [
                [
                    '@type' => 'AdministrativeArea',
                    'name' => 'Bali',
                ],
            ],

            'openingHoursSpecification' => [
                [
                    '@type' => 'OpeningHoursSpecification',
                    'dayOfWeek' => [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday',
                    ],
                    'opens' => '08:00',
                    'closes' => '22:00',
                ],
            ],

            'sameAs' => array_filter([
                "https://www.instagram.com/kelanagrill",
                "https://www.facebook.com/kelana.grill",
                "https://www.tiktok.com/@kelana.grill",
            ]),
        ]);

        /*
        |--------------------------------------------------------------------------
        | WebSite Schema
        |--------------------------------------------------------------------------
        */

        MetaHelper::addSchema([
            '@context' => 'https://schema.org',
            '@type' => 'WebSite',

            'name' => config('app.name'),
            'url' => url('/'),
            'inLanguage' => $locale,
        ]);

        /*
        |--------------------------------------------------------------------------
        | Service Schema
        |--------------------------------------------------------------------------
        */

        MetaHelper::addSchema([
            '@context' => 'https://schema.org',
            '@type' => 'Service',

            'name' => $seoTitle,
            'description' => $metaDescription,
            'url' => url()->current(),
            'image' => $image,
            'inLanguage' => $locale,

            'serviceType' => 'BBQ Grill Rental',

            'provider' => [
                '@type' => 'LocalBusiness',
                'name' => config('app.name'),
            ],

            'areaServed' => [
                [
                    '@type' => 'AdministrativeArea',
                    'name' => 'Bali',
                ],
            ],
        ]);

        MetaHelper::addSchema([
            '@context' => 'https://schema.org',
            '@type' => 'FAQPage',

            'mainEntity' => [
                [
                    '@type' => 'Question',
                    'name' => translate('Apakah tersedia layanan antar?'),
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => translate('Ya, kami melayani pengantaran grill BBQ ke seluruh area Bali.'),
                    ],
                ],
                [
                    '@type' => 'Question',
                    'name' => translate('Apakah sudah termasuk arang?'),
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => translate('Kami menyediakan paket dengan maupun tanpa arang sesuai kebutuhan Anda.'),
                    ],
                ],
                [
                    '@type' => 'Question',
                    'name' => translate('Apakah bisa sewa harian?'),
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => translate('Ya, tersedia paket sewa harian maupun beberapa hari.'),
                    ],
                ],
            ],
        ]);


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

        $product = Product::notShow()->active()->whereHas("translation", fn($q) => $q->where("slug", $slug))->first()->generateDataLanding();
        if (!$product) return abort(404);

        $products = Product::notShow()->active()->whereNot("id", $product['id'])->get()->map->generateDataLanding();

        return Inertia::render('landing/product/detail', [
            'products' => $products,
            'product' => $product
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
