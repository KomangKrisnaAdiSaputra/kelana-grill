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
        return Inertia::render("landing", compact('featuredProduct'));
    }

    function indexProduk()
    {
        return Inertia::render("landing/produk");
    }

    function products()
    {
        $datas = [
            "id" => Str::uuid7()->toString(),
            "type" => "package",
            "image" => "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1400&auto=format&fit=crop",
            "isFeatured" => true,
            "isNew" => false,

            "translations" => [
                "id" => [
                    "name" => "Promo Hemat",
                    "desc" => "Cocok untuk 2-3 orang",
                    "featuredLabel" => "Paket Paling Populer",
                ],
                "en" => [
                    "name" => "Value Promo",
                    "desc" => "Perfect for 2-3 people",
                    "featuredLabel" => "Most Popular Package",
                ],
            ],

            "categories" => [
                [
                    "key" => "package",
                    "translations" => [
                        "id" => [
                            "label" => "Paket",
                        ],
                        "en" => [
                            "label" => "Package",
                        ],
                    ],
                ],
                [
                    "key" => "stove",
                    "translations" => [
                        "id" => [
                            "label" => "Kompor",
                        ],
                        "en" => [
                            "label" => "Stove",
                        ],
                    ],
                ],
                [
                    "key" => "meat",
                    "translations" => [
                        "id" => [
                            "label" => "Daging",
                        ],
                        "en" => [
                            "label" => "Meat",
                        ],
                    ],
                ],
            ],

            "badges" => [
                [
                    "key" => "promo",
                    "translations" => [
                        "id" => [
                            "label" => "Promo",
                        ],
                        "en" => [
                            "label" => "Promo",
                        ],
                    ],
                ],
                [
                    "key" => "bestSelling",
                    "translations" => [
                        "id" => [
                            "label" => "Terlaris",
                        ],
                        "en" => [
                            "label" => "Best Seller",
                        ],
                    ],
                ],
            ],

            "variants" => [
                [
                    "key" => "withoutStove",
                    "price" => 249000,
                    "originalPrice" => 349000,
                    "isDefault" => false,
                    "translations" => [
                        "id" => [
                            "label" => "Tanpa Kompor",
                        ],
                        "en" => [
                            "label" => "Without Stove",
                        ],
                    ],
                ],
                [
                    "key" => "withStove",
                    "price" => 299000,
                    "originalPrice" => 399000,
                    "isDefault" => true,
                    "translations" => [
                        "id" => [
                            "label" => "Dengan Kompor",
                        ],
                        "en" => [
                            "label" => "With Stove",
                        ],
                    ],
                ],
            ],

            "details" => [
                [
                    "translations" => [
                        "id" => [
                            "group" => "Isi Paket",
                            "items" => [
                                [
                                    "name" => "Sosis ayam",
                                    "qty" => "200gr",
                                ],
                                [
                                    "name" => "Chicken wings",
                                    "qty" => "250gr",
                                ],
                                [
                                    "name" => "Beef slice",
                                    "qty" => "150gr",
                                ],
                                [
                                    "name" => "Jagung manis",
                                    "qty" => "2 pcs",
                                ],
                            ],
                        ],
                        "en" => [
                            "group" => "Package Items",
                            "items" => [
                                [
                                    "name" => "Chicken sausage",
                                    "qty" => "200gr",
                                ],
                                [
                                    "name" => "Chicken wings",
                                    "qty" => "250gr",
                                ],
                                [
                                    "name" => "Beef slice",
                                    "qty" => "150gr",
                                ],
                                [
                                    "name" => "Sweet corn",
                                    "qty" => "2 pcs",
                                ],
                            ],
                        ],
                    ],
                ],
                [
                    "translations" => [
                        "id" => [
                            "group" => "Peralatan",
                            "items" => [
                                [
                                    "name" => "Kompor grill portable",
                                    "qty" => "1 unit",
                                ],
                                [
                                    "name" => "Capitan / penjepit BBQ",
                                    "qty" => "1 pcs",
                                ],
                                [
                                    "name" => "Piring saji",
                                    "qty" => "1 set",
                                ],
                                [
                                    "name" => "Tissue dan sarung tangan",
                                    "qty" => "1 set",
                                ],
                            ],
                        ],
                        "en" => [
                            "group" => "Equipment",
                            "items" => [
                                [
                                    "name" => "Portable grill stove",
                                    "qty" => "1 unit",
                                ],
                                [
                                    "name" => "BBQ tongs",
                                    "qty" => "1 pcs",
                                ],
                                [
                                    "name" => "Serving plate",
                                    "qty" => "1 set",
                                ],
                                [
                                    "name" => "Tissue and gloves",
                                    "qty" => "1 set",
                                ],
                            ],
                        ],
                    ],
                ],
                [
                    "translations" => [
                        "id" => [
                            "group" => "Bumbu & Pelengkap",
                            "items" => [
                                [
                                    "name" => "Saus BBQ",
                                    "qty" => "1 cup",
                                ],
                                [
                                    "name" => "Saus sambal",
                                    "qty" => "1 cup",
                                ],
                                [
                                    "name" => "Butter",
                                    "qty" => "1 cup",
                                ],
                                [
                                    "name" => "Marinasi basic",
                                    "qty" => "termasuk",
                                ],
                            ],
                        ],
                        "en" => [
                            "group" => "Seasoning & Extras",
                            "items" => [
                                [
                                    "name" => "BBQ sauce",
                                    "qty" => "1 cup",
                                ],
                                [
                                    "name" => "Chili sauce",
                                    "qty" => "1 cup",
                                ],
                                [
                                    "name" => "Butter",
                                    "qty" => "1 cup",
                                ],
                                [
                                    "name" => "Basic marinade",
                                    "qty" => "included",
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
