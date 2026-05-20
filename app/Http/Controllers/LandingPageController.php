<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Inertia\Inertia;

class LandingPageController extends Controller
{
    public function index(Request $request)
    {
        $language = $request->get('locale', 'id');

        $featuredProduct = $this->getProductData([
            'language' => $language,
            'is_featured' => true,
        ])->first();

        $products = $this->getProductData([
            'language' => $language,
            'type' => 'package',
            'is_featured' => false,
            'is_landing' => true,
            'limit' => 3,
        ]);

        return Inertia::render('landing/index', [
            'featuredProduct' => $featuredProduct,
            'products' => $products,
        ]);
    }

    public function indexProduk(Request $request)
    {
        $language = $request->get('lang', 'id');

        return Inertia::render('landing/produk', [
            'products' => $this->getProductData([
                'language' => $language,
            ]),
        ]);
    }

    private function getProductData(array $filters = []): Collection
    {
        $language = $filters['language'] ?? 'id';

        /*
        |--------------------------------------------------------------------------
        | Products
        |--------------------------------------------------------------------------
        */

        $products = collect([
            [
                'id' => 1,
                'type' => 'package',
                'image' => 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1400&auto=format&fit=crop',
                'is_featured' => true,
                'is_landing' => false,
                'is_new' => false,
                'sort_order' => 1,
            ],
            [
                'id' => 2,
                'type' => 'package',
                'image' => 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1400&auto=format&fit=crop',
                'is_featured' => false,
                'is_landing' => true,
                'is_new' => false,
                'sort_order' => 2,
            ],
            [
                'id' => 3,
                'type' => 'package',
                'image' => 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1400&auto=format&fit=crop',
                'is_featured' => false,
                'is_landing' => true,
                'is_new' => true,
                'sort_order' => 3,
            ],
            [
                'id' => 4,
                'type' => 'package',
                'image' => 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1400&auto=format&fit=crop',
                'is_featured' => false,
                'is_landing' => true,
                'is_new' => false,
                'sort_order' => 4,
            ],
        ]);

        $productTranslations = collect([
            [
                'id' => 1,
                'product_id' => 1,
                'locale' => 'id',
                'name' => 'Promo Hemat',
                'description' => 'Cocok untuk 2-3 orang',
                'featured_label' => 'Paket Paling Populer',
            ],
            [
                'id' => 2,
                'product_id' => 1,
                'locale' => 'en',
                'name' => 'Budget Promo',
                'description' => 'Perfect for 2-3 people',
                'featured_label' => 'Most Popular Package',
            ],
            [
                'id' => 3,
                'product_id' => 2,
                'locale' => 'id',
                'name' => 'Mix Favorit',
                'description' => 'Cocok untuk 3-4 orang',
                'featured_label' => null,
            ],
            [
                'id' => 4,
                'product_id' => 2,
                'locale' => 'en',
                'name' => 'Favorite Mix',
                'description' => 'Perfect for 3-4 people',
                'featured_label' => null,
            ],
            [
                'id' => 5,
                'product_id' => 3,
                'locale' => 'id',
                'name' => 'BBQ Mantap',
                'description' => 'Cocok untuk 3-4 orang',
                'featured_label' => null,
            ],
            [
                'id' => 6,
                'product_id' => 3,
                'locale' => 'en',
                'name' => 'Tasty BBQ',
                'description' => 'Perfect for 3-4 people',
                'featured_label' => null,
            ],
            [
                'id' => 7,
                'product_id' => 4,
                'locale' => 'id',
                'name' => 'BBQ Premium',
                'description' => 'Cocok untuk 4-5 orang',
                'featured_label' => null,
            ],
            [
                'id' => 8,
                'product_id' => 4,
                'locale' => 'en',
                'name' => 'Premium BBQ',
                'description' => 'Perfect for 4-5 people',
                'featured_label' => null,
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Categories
        |--------------------------------------------------------------------------
        */

        $categories = collect([
            [
                'id' => 1,
                'key' => 'package',
                'sort_order' => 1,
            ],
            [
                'id' => 2,
                'key' => 'stove',
                'sort_order' => 2,
            ],
            [
                'id' => 3,
                'key' => 'meat',
                'sort_order' => 3,
            ],
        ]);

        $categoryTranslations = collect([
            ['id' => 1, 'category_id' => 1, 'locale' => 'id', 'label' => 'Paket'],
            ['id' => 2, 'category_id' => 1, 'locale' => 'en', 'label' => 'Package'],

            ['id' => 3, 'category_id' => 2, 'locale' => 'id', 'label' => 'Kompor'],
            ['id' => 4, 'category_id' => 2, 'locale' => 'en', 'label' => 'Stove'],

            ['id' => 5, 'category_id' => 3, 'locale' => 'id', 'label' => 'Daging'],
            ['id' => 6, 'category_id' => 3, 'locale' => 'en', 'label' => 'Meat'],
        ]);

        $productCategories = collect([
            ['product_id' => 1, 'category_id' => 1],
            ['product_id' => 1, 'category_id' => 2],
            ['product_id' => 1, 'category_id' => 3],

            ['product_id' => 2, 'category_id' => 1],
            ['product_id' => 2, 'category_id' => 2],
            ['product_id' => 2, 'category_id' => 3],

            ['product_id' => 3, 'category_id' => 1],
            ['product_id' => 3, 'category_id' => 2],
            ['product_id' => 3, 'category_id' => 3],

            ['product_id' => 4, 'category_id' => 1],
            ['product_id' => 4, 'category_id' => 2],
            ['product_id' => 4, 'category_id' => 3],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Badges
        |--------------------------------------------------------------------------
        */

        $badges = collect([
            [
                'id' => 1,
                'key' => 'bestSelling',
                'sort_order' => 1,
            ],
            [
                'id' => 2,
                'key' => 'new',
                'sort_order' => 2,
            ],
            // [
            //     'id' => 3,
            //     'key' => 'promo',
            //     'sort_order' => 3,
            // ],
        ]);

        $badgeTranslations = collect([
            ['id' => 1, 'badge_id' => 1, 'locale' => 'id', 'label' => 'Terlaris'],
            ['id' => 2, 'badge_id' => 1, 'locale' => 'en', 'label' => 'Best Seller'],

            ['id' => 3, 'badge_id' => 2, 'locale' => 'id', 'label' => 'Baru'],
            ['id' => 4, 'badge_id' => 2, 'locale' => 'en', 'label' => 'New'],

            ['id' => 5, 'badge_id' => 3, 'locale' => 'id', 'label' => 'Promo'],
            ['id' => 6, 'badge_id' => 3, 'locale' => 'en', 'label' => 'Promo'],
        ]);

        $productBadges = collect([
            ['product_id' => 1, 'badge_id' => 1],
            ['product_id' => 1, 'badge_id' => 3],
            ['product_id' => 3, 'badge_id' => 2],
            ['product_id' => 3, 'badge_id' => 3],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Variants
        |--------------------------------------------------------------------------
        */

        $productVariants = collect([
            [
                'id' => 1,
                'product_id' => 1,
                'key' => 'withoutStove',
                'price' => 79000,
                'original_price' => 99000,
                'is_default' => true,
                'sort_order' => 1,
            ],
            [
                'id' => 2,
                'product_id' => 1,
                'key' => 'withStove',
                'price' => 119000,
                'original_price' => 139000,
                'is_default' => false,
                'sort_order' => 2,
            ],

            [
                'id' => 3,
                'product_id' => 2,
                'key' => 'withoutStove',
                'price' => 139000,
                'original_price' => null,
                'is_default' => true,
                'sort_order' => 1,
            ],
            [
                'id' => 4,
                'product_id' => 2,
                'key' => 'withStove',
                'price' => 179000,
                'original_price' => null,
                'is_default' => false,
                'sort_order' => 2,
            ],

            [
                'id' => 5,
                'product_id' => 3,
                'key' => 'withoutStove',
                'price' => 179000,
                'original_price' => null,
                'is_default' => true,
                'sort_order' => 1,
            ],
            [
                'id' => 6,
                'product_id' => 3,
                'key' => 'withStove',
                'price' => 219000,
                'original_price' => null,
                'is_default' => false,
                'sort_order' => 2,
            ],

            [
                'id' => 7,
                'product_id' => 4,
                'key' => 'withoutStove',
                'price' => 249000,
                'original_price' => null,
                'is_default' => true,
                'sort_order' => 1,
            ],
            [
                'id' => 8,
                'product_id' => 4,
                'key' => 'withStove',
                'price' => 289000,
                'original_price' => null,
                'is_default' => false,
                'sort_order' => 2,
            ],
        ]);

        $variantLabels = [
            'withoutStove' => [
                'id' => 'Tanpa Kompor',
                'en' => 'Without Stove',
            ],
            'withStove' => [
                'id' => 'Dengan Kompor',
                'en' => 'With Stove',
            ],
        ];

        $productVariantTranslations = $productVariants
            ->flatMap(function ($variant) use ($variantLabels) {
                return collect(['id', 'en'])->map(function ($locale) use ($variant, $variantLabels) {
                    return [
                        'id' => (($variant['id'] - 1) * 2) + ($locale === 'id' ? 1 : 2),
                        'product_variant_id' => $variant['id'],
                        'locale' => $locale,
                        'label' => $variantLabels[$variant['key']][$locale],
                    ];
                });
            })
            ->values();

        /*
        |--------------------------------------------------------------------------
        | Promos
        |--------------------------------------------------------------------------
        */

        $promos = collect([
            // [
            //     'id' => 1,
            //     'product_id' => 1,
            //     'product_variant_id' => null,
            //     'type' => 'fixed',
            //     'value' => 20000,
            //     'starts_at' => null,
            //     'ends_at' => null,
            //     'is_active' => true,
            //     'sort_order' => 1,
            // ],
            // [
            //     'id' => 2,
            //     'product_id' => 3,
            //     'product_variant_id' => null,
            //     'type' => 'percent',
            //     'value' => 10,
            //     'starts_at' => null,
            //     'ends_at' => null,
            //     'is_active' => true,
            //     'sort_order' => 1,
            // ],
        ]);

        $promoTranslations = collect([
            // [
            //     'id' => 1,
            //     'promo_id' => 1,
            //     'locale' => 'id',
            //     'label' => 'Promo Hemat',
            //     'description' => 'Diskon Rp20.000 untuk paket ini',
            // ],
            // [
            //     'id' => 2,
            //     'promo_id' => 1,
            //     'locale' => 'en',
            //     'label' => 'Budget Promo',
            //     'description' => 'Save Rp20,000 for this package',
            // ],
            // [
            //     'id' => 3,
            //     'promo_id' => 2,
            //     'locale' => 'id',
            //     'label' => 'Diskon 10%',
            //     'description' => 'Lebih hemat untuk BBQ Mantap',
            // ],
            // [
            //     'id' => 4,
            //     'promo_id' => 2,
            //     'locale' => 'en',
            //     'label' => '10% Off',
            //     'description' => 'Save more on Tasty BBQ',
            // ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Details
        |--------------------------------------------------------------------------
        */

        $productDetails = collect([
            ['id' => 1, 'product_id' => 1, 'key' => 'package_items', 'sort_order' => 1],
            ['id' => 2, 'product_id' => 1, 'key' => 'equipment', 'sort_order' => 2],
            ['id' => 3, 'product_id' => 1, 'key' => 'seasoning_extras', 'sort_order' => 3],
            ['id' => 4, 'product_id' => 1, 'key' => 'seasoning_options', 'sort_order' => 4],

            ['id' => 5, 'product_id' => 2, 'key' => 'package_items', 'sort_order' => 1],
            ['id' => 6, 'product_id' => 2, 'key' => 'equipment', 'sort_order' => 2],
            ['id' => 7, 'product_id' => 2, 'key' => 'seasoning_extras', 'sort_order' => 3],
            ['id' => 8, 'product_id' => 2, 'key' => 'seasoning_options', 'sort_order' => 4],

            ['id' => 9, 'product_id' => 3, 'key' => 'package_items', 'sort_order' => 1],
            ['id' => 10, 'product_id' => 3, 'key' => 'equipment', 'sort_order' => 2],
            ['id' => 11, 'product_id' => 3, 'key' => 'seasoning_extras', 'sort_order' => 3],
            ['id' => 12, 'product_id' => 3, 'key' => 'seasoning_options', 'sort_order' => 4],

            ['id' => 13, 'product_id' => 4, 'key' => 'package_items', 'sort_order' => 1],
            ['id' => 14, 'product_id' => 4, 'key' => 'equipment', 'sort_order' => 2],
            ['id' => 15, 'product_id' => 4, 'key' => 'seasoning_extras', 'sort_order' => 3],
            ['id' => 16, 'product_id' => 4, 'key' => 'seasoning_options', 'sort_order' => 4],
        ]);

        $detailGroups = collect([
            'package_items' => [
                'id' => 'Isi Paket',
                'en' => 'Package Items',
            ],
            'equipment' => [
                'id' => 'Peralatan',
                'en' => 'Equipment',
            ],
            'seasoning_extras' => [
                'id' => 'Bumbu & Pelengkap',
                'en' => 'Seasoning & Extras',
            ],
            'seasoning_options' => [
                'id' => 'Pilihan Bumbu',
                'en' => 'Seasoning Options',
            ],
        ]);

        $productDetailTranslations = $productDetails
            ->flatMap(function ($detail) use ($detailGroups) {
                return collect(['id', 'en'])->map(function ($locale) use ($detail, $detailGroups) {
                    return [
                        'id' => (($detail['id'] - 1) * 2) + ($locale === 'id' ? 1 : 2),
                        'product_detail_id' => $detail['id'],
                        'locale' => $locale,
                        'group' => $detailGroups[$detail['key']][$locale],
                    ];
                });
            })
            ->values();

        $packageItems = collect([
            1 => [
                'id' => [
                    ['name' => 'Sosis ayam', 'qty' => '200gr'],
                    ['name' => 'Bakso ayam', 'qty' => '250gr'],
                    ['name' => 'Selada', 'qty' => null],
                    ['name' => 'Bawang bombay', 'qty' => null],
                ],
                'en' => [
                    ['name' => 'Chicken sausage', 'qty' => '200gr'],
                    ['name' => 'Chicken meatballs', 'qty' => '250gr'],
                    ['name' => 'Lettuce', 'qty' => null],
                    ['name' => 'Onion', 'qty' => null],
                ],
            ],
            2 => [
                'id' => [
                    ['name' => 'Daging ayam', 'qty' => '250gr'],
                    ['name' => 'Sosis ayam', 'qty' => '200gr'],
                    ['name' => 'Tempura ikan', 'qty' => '250gr'],
                    ['name' => 'Bakso ikan', 'qty' => '200gr'],
                    ['name' => 'Selada', 'qty' => null],
                    ['name' => 'Bawang bombay', 'qty' => null],
                ],
                'en' => [
                    ['name' => 'Chicken meat', 'qty' => '250gr'],
                    ['name' => 'Chicken sausage', 'qty' => '200gr'],
                    ['name' => 'Fish tempura', 'qty' => '250gr'],
                    ['name' => 'Fish meatballs', 'qty' => '200gr'],
                    ['name' => 'Lettuce', 'qty' => null],
                    ['name' => 'Onion', 'qty' => null],
                ],
            ],
            3 => [
                'id' => [
                    ['name' => 'Beef sirloin', 'qty' => '250gr'],
                    ['name' => 'Daging ayam', 'qty' => '250gr'],
                    ['name' => 'Sosis ayam', 'qty' => '200gr'],
                    ['name' => 'Bakso ayam', 'qty' => '200gr'],
                    ['name' => 'Selada', 'qty' => null],
                    ['name' => 'Bawang bombay', 'qty' => null],
                ],
                'en' => [
                    ['name' => 'Beef sirloin', 'qty' => '250gr'],
                    ['name' => 'Chicken meat', 'qty' => '250gr'],
                    ['name' => 'Chicken sausage', 'qty' => '200gr'],
                    ['name' => 'Chicken meatballs', 'qty' => '200gr'],
                    ['name' => 'Lettuce', 'qty' => null],
                    ['name' => 'Onion', 'qty' => null],
                ],
            ],
            4 => [
                'id' => [
                    ['name' => 'Beef saikoro', 'qty' => '250gr'],
                    ['name' => 'Beef sirloin', 'qty' => '250gr'],
                    ['name' => 'Udang', 'qty' => '150gr'],
                    ['name' => 'Daging ayam', 'qty' => '250gr'],
                    ['name' => 'Selada', 'qty' => null],
                    ['name' => 'Bawang bombay', 'qty' => null],
                ],
                'en' => [
                    ['name' => 'Beef saikoro', 'qty' => '250gr'],
                    ['name' => 'Beef sirloin', 'qty' => '250gr'],
                    ['name' => 'Shrimp', 'qty' => '150gr'],
                    ['name' => 'Chicken meat', 'qty' => '250gr'],
                    ['name' => 'Lettuce', 'qty' => null],
                    ['name' => 'Onion', 'qty' => null],
                ],
            ],
        ]);

        $sharedDetailItems = collect([
            'equipment' => [
                'id' => [
                    ['name' => 'Kompor grill portable', 'qty' => '1 unit'],
                    ['name' => 'Pan grill', 'qty' => '1 pcs'],
                    ['name' => 'Capitan / penjepit BBQ', 'qty' => '1 pcs'],
                    ['name' => 'Mangkok', 'qty' => '2 pcs'],
                    ['name' => 'Sumpit', 'qty' => '2 set'],
                    ['name' => 'Kuas', 'qty' => '1 set'],
                    ['name' => 'Gas', 'qty' => '1 pcs'],
                ],
                'en' => [
                    ['name' => 'Portable grill stove', 'qty' => '1 unit'],
                    ['name' => 'Grill pan', 'qty' => '1 pcs'],
                    ['name' => 'BBQ tongs', 'qty' => '1 pcs'],
                    ['name' => 'Bowl', 'qty' => '2 pcs'],
                    ['name' => 'Chopsticks', 'qty' => '2 sets'],
                    ['name' => 'Brush', 'qty' => '1 set'],
                    ['name' => 'Gas canister', 'qty' => '1 pcs'],
                ],
            ],
            'seasoning_extras' => [
                'id' => [
                    ['name' => 'Saus Tomat', 'qty' => '1 cup'],
                    ['name' => 'Saus Sambal', 'qty' => '1 cup'],
                    ['name' => 'Margarin', 'qty' => '1 cup'],
                    ['name' => 'Marinasi', 'qty' => 'termasuk'],
                ],
                'en' => [
                    ['name' => 'Tomato sauce', 'qty' => '1 cup'],
                    ['name' => 'Chili sauce', 'qty' => '1 cup'],
                    ['name' => 'Margarine', 'qty' => '1 cup'],
                    ['name' => 'Marinade', 'qty' => 'included'],
                ],
            ],
            'seasoning_options' => [
                'id' => [
                    ['name' => 'BBQ', 'qty' => null],
                    ['name' => 'Teriyaki', 'qty' => null],
                    ['name' => 'Bulgogi', 'qty' => null],
                ],
                'en' => [
                    ['name' => 'BBQ', 'qty' => null],
                    ['name' => 'Teriyaki', 'qty' => null],
                    ['name' => 'Bulgogi', 'qty' => null],
                ],
            ],
        ]);

        $productDetailItems = collect();
        $itemId = 1;

        foreach ($productDetails as $detail) {
            foreach (['id', 'en'] as $locale) {
                $items = $detail['key'] === 'package_items'
                    ? $packageItems[$detail['product_id']][$locale]
                    : $sharedDetailItems[$detail['key']][$locale];

                foreach ($items as $index => $item) {
                    $productDetailItems->push([
                        'id' => $itemId++,
                        'product_detail_id' => $detail['id'],
                        'locale' => $locale,
                        'name' => $item['name'],
                        'qty' => $item['qty'],
                        'sort_order' => $index + 1,
                    ]);
                }
            }
        }

        /*
        |--------------------------------------------------------------------------
        | Filters
        |--------------------------------------------------------------------------
        */

        $filteredProducts = $products
            ->when(array_key_exists('type', $filters), function ($collection) use ($filters) {
                return $collection->where('type', $filters['type']);
            })
            ->when(array_key_exists('is_landing', $filters), function ($collection) use ($filters) {
                return $collection->where('is_landing', $filters['is_landing']);
            })
            ->when(array_key_exists('is_featured', $filters), function ($collection) use ($filters) {
                return $collection->where('is_featured', $filters['is_featured']);
            })
            ->when(array_key_exists('is_new', $filters), function ($collection) use ($filters) {
                return $collection->where('is_new', $filters['is_new']);
            })
            ->when(array_key_exists('category_key', $filters), function ($collection) use ($filters, $categories, $productCategories) {
                $category = $categories->firstWhere('key', $filters['category_key']);

                if (!$category) {
                    return collect();
                }

                $productIds = $productCategories
                    ->where('category_id', $category['id'])
                    ->pluck('product_id');

                return $collection->whereIn('id', $productIds);
            })
            ->when(array_key_exists('has_promo', $filters), function ($collection) use ($filters, $promos) {
                $promoProductIds = $promos
                    ->where('is_active', true)
                    ->pluck('product_id')
                    ->unique()
                    ->values();

                return $filters['has_promo']
                    ? $collection->whereIn('id', $promoProductIds)
                    : $collection->whereNotIn('id', $promoProductIds);
            })
            ->sortBy('sort_order')
            ->values();

        /*
        |--------------------------------------------------------------------------
        | Transform to Frontend Data
        |--------------------------------------------------------------------------
        */

        $result = $filteredProducts
            ->map(function ($product) use (
                $language,
                $productTranslations,
                $categories,
                $categoryTranslations,
                $productCategories,
                $badges,
                $badgeTranslations,
                $productBadges,
                $productVariants,
                $productVariantTranslations,
                $promos,
                $promoTranslations,
                $productDetails,
                $productDetailTranslations,
                $productDetailItems
            ) {
                $productTranslation = $productTranslations
                    ->where('product_id', $product['id'])
                    ->firstWhere('locale', $language)
                    ?? $productTranslations
                    ->where('product_id', $product['id'])
                    ->firstWhere('locale', 'id');

                $activePromo = $promos
                    ->where('product_id', $product['id'])
                    ->where('is_active', true)
                    ->sortBy('sort_order')
                    ->first();

                $promoTranslation = null;

                if ($activePromo) {
                    $promoTranslation = $promoTranslations
                        ->where('promo_id', $activePromo['id'])
                        ->firstWhere('locale', $language)
                        ?? $promoTranslations
                        ->where('promo_id', $activePromo['id'])
                        ->firstWhere('locale', 'id');
                }

                $variants = $productVariants
                    ->where('product_id', $product['id'])
                    ->sortBy('sort_order')
                    ->map(function ($variant) use ($language, $productVariantTranslations, $activePromo) {
                        $translation = $productVariantTranslations
                            ->where('product_variant_id', $variant['id'])
                            ->firstWhere('locale', $language)
                            ?? $productVariantTranslations
                            ->where('product_variant_id', $variant['id'])
                            ->firstWhere('locale', 'id');

                        $variantPromo = null;

                        if (
                            $activePromo
                            && (
                                $activePromo['product_variant_id'] === null
                                || $activePromo['product_variant_id'] === $variant['id']
                            )
                        ) {
                            $variantPromo = $activePromo;
                        }

                        $basePrice = $variant['price'];
                        $finalPrice = $basePrice;

                        if ($variantPromo) {
                            if ($variantPromo['type'] === 'fixed') {
                                $finalPrice = max(0, $basePrice - $variantPromo['value']);
                            }

                            if ($variantPromo['type'] === 'percent') {
                                $finalPrice = max(0, $basePrice - (($basePrice * $variantPromo['value']) / 100));
                            }
                        }

                        return [
                            'id' => $variant['id'],
                            'key' => $variant['key'],
                            'label' => $translation['label'] ?? null,
                            'price' => (int) $finalPrice,
                            'originalPrice' => $variantPromo ? $basePrice : $variant['original_price'],
                            'isDefault' => $variant['is_default'],
                        ];
                    })
                    ->values();

                $defaultVariant = $variants->firstWhere('isDefault', true) ?? $variants->first();

                return [
                    'id' => $product['id'],
                    'type' => $product['type'],
                    'image' => $product['image'],

                    'name' => $productTranslation['name'] ?? null,
                    'desc' => $productTranslation['description'] ?? null,
                    'featuredLabel' => $productTranslation['featured_label'] ?? null,

                    'price' => $defaultVariant['price'] ?? 0,
                    'originalPrice' => $defaultVariant['originalPrice'] ?? null,

                    'hasPromo' => (bool) $activePromo,
                    'promo' => $activePromo ? [
                        'id' => $activePromo['id'],
                        'type' => $activePromo['type'],
                        'value' => $activePromo['value'],
                        'label' => $promoTranslation['label'] ?? null,
                        'description' => $promoTranslation['description'] ?? null,
                    ] : null,

                    'isFeatured' => $product['is_featured'],
                    'isLanding' => $product['is_landing'],
                    'isNew' => $product['is_new'],

                    'categories' => $productCategories
                        ->where('product_id', $product['id'])
                        ->map(function ($pivot) use ($language, $categories, $categoryTranslations) {
                            $category = $categories->firstWhere('id', $pivot['category_id']);

                            $translation = $categoryTranslations
                                ->where('category_id', $pivot['category_id'])
                                ->firstWhere('locale', $language)
                                ?? $categoryTranslations
                                ->where('category_id', $pivot['category_id'])
                                ->firstWhere('locale', 'id');

                            return [
                                'id' => $category['id'] ?? null,
                                'key' => $category['key'] ?? null,
                                'label' => $translation['label'] ?? null,
                            ];
                        })
                        ->values(),

                    'badges' => $productBadges
                        ->where('product_id', $product['id'])
                        ->map(function ($pivot) use ($language, $badges, $badgeTranslations) {
                            $badge = $badges->firstWhere('id', $pivot['badge_id']);

                            $translation = $badgeTranslations
                                ->where('badge_id', $pivot['badge_id'])
                                ->firstWhere('locale', $language)
                                ?? $badgeTranslations
                                ->where('badge_id', $pivot['badge_id'])
                                ->firstWhere('locale', 'id');

                            return [
                                'id' => $badge['id'] ?? null,
                                'key' => $badge['key'] ?? null,
                                'label' => $translation['label'] ?? null,
                            ];
                        })
                        ->values(),

                    'variants' => $variants,

                    'details' => $productDetails
                        ->where('product_id', $product['id'])
                        ->sortBy('sort_order')
                        ->map(function ($detail) use ($language, $productDetailTranslations, $productDetailItems) {
                            $translation = $productDetailTranslations
                                ->where('product_detail_id', $detail['id'])
                                ->firstWhere('locale', $language)
                                ?? $productDetailTranslations
                                ->where('product_detail_id', $detail['id'])
                                ->firstWhere('locale', 'id');

                            return [
                                'id' => $detail['id'],
                                'key' => $detail['key'],
                                'group' => $translation['group'] ?? null,
                                'items' => $productDetailItems
                                    ->where('product_detail_id', $detail['id'])
                                    ->where('locale', $language)
                                    ->sortBy('sort_order')
                                    ->map(fn($item) => [
                                        'id' => $item['id'],
                                        'name' => $item['name'],
                                        'qty' => $item['qty'],
                                    ])
                                    ->values(),
                            ];
                        })
                        ->values(),
                ];
            })
            ->values();

        if (array_key_exists('limit', $filters) && $filters['limit']) {
            $result = $result->take((int) $filters['limit'])->values();
        }

        return $result;
    }
}
