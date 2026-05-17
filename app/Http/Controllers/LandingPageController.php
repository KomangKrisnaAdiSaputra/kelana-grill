<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class LandingPageController extends Controller
{
    function index()
    {
        $featuredProduct = $this->products()->firstWhere("isFeatured", true);
        $products = $this->products()->where("isFeatured", false)->where("type", "package")->where("isLanding", true)->take(3)->values();
        return Inertia::render("landing", compact("featuredProduct", "products"));
    }

    function indexProduk()
    {
        return Inertia::render("landing/produk");
    }

    function products()
    {
        $datas = [
            [
                "id" => Str::uuid7()->toString(),
                "type" => "package",
                "image" => "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1400&auto=format&fit=crop",
                "isFeatured" => true,
                "isLanding" => false,
                "isNew" => false,

                "translations" => [
                    "id" => [
                        "name" => "Promo Hemat",
                        "desc" => "Cocok untuk 2-3 orang",
                        "featuredLabel" => "Paket Paling Populer",
                    ],
                    "en" => [
                        "name" => "Budget Promo",
                        "desc" => "Perfect for 2-3 people",
                        "featuredLabel" => "Most Popular Package",
                    ],
                ],

                "categories" => [
                    [
                        "key" => "package",
                        "translations" => [
                            "id" => ["label" => "Paket"],
                            "en" => ["label" => "Package"],
                        ],
                    ],
                    [
                        "key" => "stove",
                        "translations" => [
                            "id" => ["label" => "Kompor"],
                            "en" => ["label" => "Stove"],
                        ],
                    ],
                    [
                        "key" => "meat",
                        "translations" => [
                            "id" => ["label" => "Daging"],
                            "en" => ["label" => "Meat"],
                        ],
                    ],
                ],

                "badges" => [
                    [
                        "key" => "bestSelling",
                        "translations" => [
                            "id" => ["label" => "Terlaris"],
                            "en" => ["label" => "Best Seller"],
                        ],
                    ],
                ],

                "variants" => [
                    [
                        "key" => "withoutStove",
                        "price" => 79000,
                        "originalPrice" => null,
                        "isDefault" => true,
                        "translations" => [
                            "id" => ["label" => "Tanpa Kompor"],
                            "en" => ["label" => "Without Stove"],
                        ],
                    ],
                    [
                        "key" => "withStove",
                        "price" => 119000,
                        "originalPrice" => null,
                        "isDefault" => false,
                        "translations" => [
                            "id" => ["label" => "Dengan Kompor"],
                            "en" => ["label" => "With Stove"],
                        ],
                    ],
                ],

                "details" => [
                    [
                        "translations" => [
                            "id" => [
                                "group" => "Isi Paket",
                                "items" => [
                                    ["name" => "Sosis ayam", "qty" => "200gr"],
                                    ["name" => "Bakso ayam", "qty" => "250gr"],
                                    ["name" => "Selada", "qty" => null],
                                    ["name" => "Bawang bombay", "qty" => null],
                                ],
                            ],
                            "en" => [
                                "group" => "Package Items",
                                "items" => [
                                    ["name" => "Chicken sausage", "qty" => "200gr"],
                                    ["name" => "Chicken meatballs", "qty" => "250gr"],
                                    ["name" => "Lettuce", "qty" => null],
                                    ["name" => "Onion", "qty" => null],
                                ],
                            ],
                        ],
                    ],
                    [
                        "translations" => [
                            "id" => [
                                "group" => "Peralatan",
                                "items" => [
                                    ["name" => "Kompor grill portable", "qty" => "1 unit"],
                                    ["name" => "Pan grill", "qty" => "1 pcs"],
                                    ["name" => "Capitan / penjepit BBQ", "qty" => "1 pcs"],
                                    ["name" => "Mangkok", "qty" => "2 pcs"],
                                    ["name" => "Sumpit", "qty" => "2 set"],
                                    ["name" => "Kuas", "qty" => "1 set"],
                                    ["name" => "Gas", "qty" => "1 pcs"],
                                ],
                            ],
                            "en" => [
                                "group" => "Equipment",
                                "items" => [
                                    ["name" => "Portable grill stove", "qty" => "1 unit"],
                                    ["name" => "Grill pan", "qty" => "1 pcs"],
                                    ["name" => "BBQ tongs", "qty" => "1 pcs"],
                                    ["name" => "Bowl", "qty" => "2 pcs"],
                                    ["name" => "Chopsticks", "qty" => "2 sets"],
                                    ["name" => "Brush", "qty" => "1 set"],
                                    ["name" => "Gas canister", "qty" => "1 pcs"],
                                ],
                            ],
                        ],
                    ],
                    [
                        "translations" => [
                            "id" => [
                                "group" => "Bumbu & Pelengkap",
                                "items" => [
                                    ["name" => "Saus Tomat", "qty" => "1 cup"],
                                    ["name" => "Saus Sambal", "qty" => "1 cup"],
                                    ["name" => "Margarin", "qty" => "1 cup"],
                                    ["name" => "Marinasi", "qty" => "termasuk"],
                                ],
                            ],
                            "en" => [
                                "group" => "Seasoning & Extras",
                                "items" => [
                                    ["name" => "Tomato sauce", "qty" => "1 cup"],
                                    ["name" => "Chili sauce", "qty" => "1 cup"],
                                    ["name" => "Margarine", "qty" => "1 cup"],
                                    ["name" => "Marinade", "qty" => "included"],
                                ],
                            ],
                        ],
                    ],
                ],
            ],

            [
                "id" => Str::uuid7()->toString(),
                "type" => "package",
                "image" => "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1400&auto=format&fit=crop",
                "isFeatured" => false,
                "isLanding" => true,
                "isNew" => false,

                "translations" => [
                    "id" => [
                        "name" => "Mix Favorit",
                        "desc" => "Cocok untuk 3-4 orang",
                        "featuredLabel" => null,
                    ],
                    "en" => [
                        "name" => "Favorite Mix",
                        "desc" => "Perfect for 3-4 people",
                        "featuredLabel" => null,
                    ],
                ],

                "categories" => [
                    [
                        "key" => "package",
                        "translations" => [
                            "id" => ["label" => "Paket"],
                            "en" => ["label" => "Package"],
                        ],
                    ],
                    [
                        "key" => "stove",
                        "translations" => [
                            "id" => ["label" => "Kompor"],
                            "en" => ["label" => "Stove"],
                        ],
                    ],
                    [
                        "key" => "meat",
                        "translations" => [
                            "id" => ["label" => "Daging"],
                            "en" => ["label" => "Meat"],
                        ],
                    ],
                ],

                "badges" => [],

                "variants" => [
                    [
                        "key" => "withoutStove",
                        "price" => 139000,
                        "originalPrice" => null,
                        "isDefault" => true,
                        "translations" => [
                            "id" => ["label" => "Tanpa Kompor"],
                            "en" => ["label" => "Without Stove"],
                        ],
                    ],
                    [
                        "key" => "withStove",
                        "price" => 179000,
                        "originalPrice" => null,
                        "isDefault" => false,
                        "translations" => [
                            "id" => ["label" => "Dengan Kompor"],
                            "en" => ["label" => "With Stove"],
                        ],
                    ],
                ],

                "details" => [
                    [
                        "translations" => [
                            "id" => [
                                "group" => "Isi Paket",
                                "items" => [
                                    ["name" => "Daging ayam", "qty" => "250gr"],
                                    ["name" => "Sosis ayam", "qty" => "200gr"],
                                    ["name" => "Tempura ikan", "qty" => "250gr"],
                                    ["name" => "Bakso ikan", "qty" => "200gr"],
                                    ["name" => "Selada", "qty" => null],
                                    ["name" => "Bawang bombay", "qty" => null],
                                ],
                            ],
                            "en" => [
                                "group" => "Package Items",
                                "items" => [
                                    ["name" => "Chicken meat", "qty" => "250gr"],
                                    ["name" => "Chicken sausage", "qty" => "200gr"],
                                    ["name" => "Fish tempura", "qty" => "250gr"],
                                    ["name" => "Fish meatballs", "qty" => "200gr"],
                                    ["name" => "Lettuce", "qty" => null],
                                    ["name" => "Onion", "qty" => null],
                                ],
                            ],
                        ],
                    ],
                    [
                        "translations" => [
                            "id" => [
                                "group" => "Peralatan",
                                "items" => [
                                    ["name" => "Kompor grill portable", "qty" => "1 unit"],
                                    ["name" => "Pan grill", "qty" => "1 pcs"],
                                    ["name" => "Capitan / penjepit BBQ", "qty" => "1 pcs"],
                                    ["name" => "Mangkok", "qty" => "2 pcs"],
                                    ["name" => "Sumpit", "qty" => "2 set"],
                                    ["name" => "Kuas", "qty" => "1 set"],
                                    ["name" => "Gas", "qty" => "1 pcs"],
                                ],
                            ],
                            "en" => [
                                "group" => "Equipment",
                                "items" => [
                                    ["name" => "Portable grill stove", "qty" => "1 unit"],
                                    ["name" => "Grill pan", "qty" => "1 pcs"],
                                    ["name" => "BBQ tongs", "qty" => "1 pcs"],
                                    ["name" => "Bowl", "qty" => "2 pcs"],
                                    ["name" => "Chopsticks", "qty" => "2 sets"],
                                    ["name" => "Brush", "qty" => "1 set"],
                                    ["name" => "Gas canister", "qty" => "1 pcs"],
                                ],
                            ],
                        ],
                    ],
                    [
                        "translations" => [
                            "id" => [
                                "group" => "Bumbu & Pelengkap",
                                "items" => [
                                    ["name" => "Saus Tomat", "qty" => "1 cup"],
                                    ["name" => "Saus Sambal", "qty" => "1 cup"],
                                    ["name" => "Margarin", "qty" => "1 cup"],
                                    ["name" => "Marinasi", "qty" => "termasuk"],
                                ],
                            ],
                            "en" => [
                                "group" => "Seasoning & Extras",
                                "items" => [
                                    ["name" => "Tomato sauce", "qty" => "1 cup"],
                                    ["name" => "Chili sauce", "qty" => "1 cup"],
                                    ["name" => "Margarine", "qty" => "1 cup"],
                                    ["name" => "Marinade", "qty" => "included"],
                                ],
                            ],
                        ],
                    ],
                ],
            ],

            [
                "id" => Str::uuid7()->toString(),
                "type" => "package",
                "image" => "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1400&auto=format&fit=crop",
                "isFeatured" => false,
                "isLanding" => true,
                "isNew" => false,

                "translations" => [
                    "id" => [
                        "name" => "BBQ Mantap",
                        "desc" => "Cocok untuk 3-4 orang",
                        "featuredLabel" => null,
                    ],
                    "en" => [
                        "name" => "Tasty BBQ",
                        "desc" => "Perfect for 3-4 people",
                        "featuredLabel" => null,
                    ],
                ],

                "categories" => [
                    [
                        "key" => "package",
                        "translations" => [
                            "id" => ["label" => "Paket"],
                            "en" => ["label" => "Package"],
                        ],
                    ],
                    [
                        "key" => "stove",
                        "translations" => [
                            "id" => ["label" => "Kompor"],
                            "en" => ["label" => "Stove"],
                        ],
                    ],
                    [
                        "key" => "meat",
                        "translations" => [
                            "id" => ["label" => "Daging"],
                            "en" => ["label" => "Meat"],
                        ],
                    ],
                ],

                "badges" => [],

                "variants" => [
                    [
                        "key" => "withoutStove",
                        "price" => 179000,
                        "originalPrice" => null,
                        "isDefault" => true,
                        "translations" => [
                            "id" => ["label" => "Tanpa Kompor"],
                            "en" => ["label" => "Without Stove"],
                        ],
                    ],
                    [
                        "key" => "withStove",
                        "price" => 219000,
                        "originalPrice" => null,
                        "isDefault" => false,
                        "translations" => [
                            "id" => ["label" => "Dengan Kompor"],
                            "en" => ["label" => "With Stove"],
                        ],
                    ],
                ],

                "details" => [
                    [
                        "translations" => [
                            "id" => [
                                "group" => "Isi Paket",
                                "items" => [
                                    ["name" => "Beef sirloin", "qty" => "250gr"],
                                    ["name" => "Daging ayam", "qty" => "250gr"],
                                    ["name" => "Sosis ayam", "qty" => "200gr"],
                                    ["name" => "Bakso ayam", "qty" => "200gr"],
                                    ["name" => "Selada", "qty" => null],
                                    ["name" => "Bawang bombay", "qty" => null],
                                ],
                            ],
                            "en" => [
                                "group" => "Package Items",
                                "items" => [
                                    ["name" => "Beef sirloin", "qty" => "250gr"],
                                    ["name" => "Chicken meat", "qty" => "250gr"],
                                    ["name" => "Chicken sausage", "qty" => "200gr"],
                                    ["name" => "Chicken meatballs", "qty" => "200gr"],
                                    ["name" => "Lettuce", "qty" => null],
                                    ["name" => "Onion", "qty" => null],
                                ],
                            ],
                        ],
                    ],
                    [
                        "translations" => [
                            "id" => [
                                "group" => "Peralatan",
                                "items" => [
                                    ["name" => "Kompor grill portable", "qty" => "1 unit"],
                                    ["name" => "Pan grill", "qty" => "1 pcs"],
                                    ["name" => "Capitan / penjepit BBQ", "qty" => "1 pcs"],
                                    ["name" => "Mangkok", "qty" => "2 pcs"],
                                    ["name" => "Sumpit", "qty" => "2 set"],
                                    ["name" => "Kuas", "qty" => "1 set"],
                                    ["name" => "Gas", "qty" => "1 pcs"],
                                ],
                            ],
                            "en" => [
                                "group" => "Equipment",
                                "items" => [
                                    ["name" => "Portable grill stove", "qty" => "1 unit"],
                                    ["name" => "Grill pan", "qty" => "1 pcs"],
                                    ["name" => "BBQ tongs", "qty" => "1 pcs"],
                                    ["name" => "Bowl", "qty" => "2 pcs"],
                                    ["name" => "Chopsticks", "qty" => "2 sets"],
                                    ["name" => "Brush", "qty" => "1 set"],
                                    ["name" => "Gas canister", "qty" => "1 pcs"],
                                ],
                            ],
                        ],
                    ],
                    [
                        "translations" => [
                            "id" => [
                                "group" => "Bumbu & Pelengkap",
                                "items" => [
                                    ["name" => "Saus Tomat", "qty" => "1 cup"],
                                    ["name" => "Saus Sambal", "qty" => "1 cup"],
                                    ["name" => "Margarin", "qty" => "1 cup"],
                                    ["name" => "Marinasi", "qty" => "termasuk"],
                                ],
                            ],
                            "en" => [
                                "group" => "Seasoning & Extras",
                                "items" => [
                                    ["name" => "Tomato sauce", "qty" => "1 cup"],
                                    ["name" => "Chili sauce", "qty" => "1 cup"],
                                    ["name" => "Margarine", "qty" => "1 cup"],
                                    ["name" => "Marinade", "qty" => "included"],
                                ],
                            ],
                        ],
                    ],
                ],
            ],

            [
                "id" => Str::uuid7()->toString(),
                "type" => "package",
                "image" => "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1400&auto=format&fit=crop",
                "isFeatured" => false,
                "isLanding" => true,
                "isNew" => false,

                "translations" => [
                    "id" => [
                        "name" => "BBQ Premium",
                        "desc" => "Cocok untuk 4-5 orang",
                        "featuredLabel" => null,
                    ],
                    "en" => [
                        "name" => "Premium BBQ",
                        "desc" => "Perfect for 4-5 people",
                        "featuredLabel" => null,
                    ],
                ],

                "categories" => [
                    [
                        "key" => "package",
                        "translations" => [
                            "id" => ["label" => "Paket"],
                            "en" => ["label" => "Package"],
                        ],
                    ],
                    [
                        "key" => "stove",
                        "translations" => [
                            "id" => ["label" => "Kompor"],
                            "en" => ["label" => "Stove"],
                        ],
                    ],
                    [
                        "key" => "meat",
                        "translations" => [
                            "id" => ["label" => "Daging"],
                            "en" => ["label" => "Meat"],
                        ],
                    ],
                ],

                "badges" => [],

                "variants" => [
                    [
                        "key" => "withoutStove",
                        "price" => 249000,
                        "originalPrice" => null,
                        "isDefault" => true,
                        "translations" => [
                            "id" => ["label" => "Tanpa Kompor"],
                            "en" => ["label" => "Without Stove"],
                        ],
                    ],
                    [
                        "key" => "withStove",
                        "price" => 289000,
                        "originalPrice" => null,
                        "isDefault" => false,
                        "translations" => [
                            "id" => ["label" => "Dengan Kompor"],
                            "en" => ["label" => "With Stove"],
                        ],
                    ],
                ],

                "details" => [
                    [
                        "translations" => [
                            "id" => [
                                "group" => "Isi Paket",
                                "items" => [
                                    ["name" => "Beef saikoro", "qty" => "250gr"],
                                    ["name" => "Beef sirloin", "qty" => "250gr"],
                                    ["name" => "Udang", "qty" => "150gr"],
                                    ["name" => "Daging ayam", "qty" => "250gr"],
                                    ["name" => "Selada", "qty" => null],
                                    ["name" => "Bawang bombay", "qty" => null],
                                ],
                            ],
                            "en" => [
                                "group" => "Package Items",
                                "items" => [
                                    ["name" => "Beef saikoro", "qty" => "250gr"],
                                    ["name" => "Beef sirloin", "qty" => "250gr"],
                                    ["name" => "Shrimp", "qty" => "150gr"],
                                    ["name" => "Chicken meat", "qty" => "250gr"],
                                    ["name" => "Lettuce", "qty" => null],
                                    ["name" => "Onion", "qty" => null],
                                ],
                            ],
                        ],
                    ],
                    [
                        "translations" => [
                            "id" => [
                                "group" => "Peralatan",
                                "items" => [
                                    ["name" => "Kompor grill portable", "qty" => "1 unit"],
                                    ["name" => "Pan grill", "qty" => "1 pcs"],
                                    ["name" => "Capitan / penjepit BBQ", "qty" => "1 pcs"],
                                    ["name" => "Mangkok", "qty" => "2 pcs"],
                                    ["name" => "Sumpit", "qty" => "2 set"],
                                    ["name" => "Kuas", "qty" => "1 set"],
                                    ["name" => "Gas", "qty" => "1 pcs"],
                                ],
                            ],
                            "en" => [
                                "group" => "Equipment",
                                "items" => [
                                    ["name" => "Portable grill stove", "qty" => "1 unit"],
                                    ["name" => "Grill pan", "qty" => "1 pcs"],
                                    ["name" => "BBQ tongs", "qty" => "1 pcs"],
                                    ["name" => "Bowl", "qty" => "2 pcs"],
                                    ["name" => "Chopsticks", "qty" => "2 sets"],
                                    ["name" => "Brush", "qty" => "1 set"],
                                    ["name" => "Gas canister", "qty" => "1 pcs"],
                                ],
                            ],
                        ],
                    ],
                    [
                        "translations" => [
                            "id" => [
                                "group" => "Bumbu & Pelengkap",
                                "items" => [
                                    ["name" => "Saus Tomat", "qty" => "1 cup"],
                                    ["name" => "Saus Sambal", "qty" => "1 cup"],
                                    ["name" => "Margarin", "qty" => "1 cup"],
                                    ["name" => "Marinasi", "qty" => "termasuk"],
                                ],
                            ],
                            "en" => [
                                "group" => "Seasoning & Extras",
                                "items" => [
                                    ["name" => "Tomato sauce", "qty" => "1 cup"],
                                    ["name" => "Chili sauce", "qty" => "1 cup"],
                                    ["name" => "Margarine", "qty" => "1 cup"],
                                    ["name" => "Marinade", "qty" => "included"],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ];

        return collect($datas);
    }
}
