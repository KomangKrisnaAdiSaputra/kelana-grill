<?php

namespace Database\Seeders;

use App\Models\Badge;
use App\Models\BadgeTranslation;
use App\Models\Category;
use App\Models\CategoryTranslation;
use App\Models\Type;
use App\Models\Unit;
use App\Models\User;
use App\Models\WareHouse;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Krisna Adi',
                'email' => 'krisnaadii2328@gmail.com',
                'password' => Hash::make(100917)

            ],
            [
                'name' => 'Diah Gayatri',
                'email' => 'gdiah04@gmail.com',
                'password' => Hash::make(100917)
            ]
        ];
        foreach ($users as $user) {
            User::create($user);
        }

        $units = [
            [
                'code' => 'kg',
                'name' => 'Kilogram'
            ],
            [
                'code' => 'g',
                'name' => 'Gram'
            ],
            [
                'code' => 'l',
                'name' => 'Liter'
            ],
            [
                'code' => 'ml',
                'name' => 'Milliliter'
            ],
            [
                'code' => 'pcs',
                'name' => 'Pieces'
            ],
            [
                'code' => 'box',
                'name' => 'Box'
            ],
            [
                'code' => 'pack',
                'name' => 'Pack'
            ],
            [
                'code' => 'cup',
                'name' => 'Cup'
            ],
            [
                'code' => 'pkg',
                'name' => 'Package'
            ]
        ];
        foreach ($units as $unit) {
            Unit::create($unit);
        }

        $warehouses = [
            [
                'name' => 'Antasura',
                'preview_address' => 'Jl. Antasura, Denpasar, Bali',
                'address' => 'Jl. Antasura gang dewi ratih no 18a, Denpasar, Bali',
                'active' => 1
            ],
            [
                'name' => 'Siulan',
                'preview_address' => 'Jl. Siulan, Batubulan, Bali',
                'address' => 'Jl. Siulan gang flamboyan II no 11, Batubulan, Bali',
                'active' => 1
            ]
        ];
        foreach ($warehouses as $warehouse) {
            WareHouse::create($warehouse);
        }

        $types = [
            [
                'name' => 'ALA CARTE',
                'active' => 1
            ],
            [
                'name' => 'PACKAGE',
                'active' => 1
            ],
            [
                'name' => 'CHOICE',
                'active' => 1
            ],
            [
                'name' => 'MARINADE',
                'active' => 1
            ],
        ];
        foreach ($types as $type) {
            Type::create([
                ...$type,
                'slug' => Str::slug($type['name'])
            ]);
        }

        $categories = [
            "Paket BBQ|BBQ Package",
            "Sewa Alat Grill|Grill Equipment Rental",
            "Daging & BBQ|Meat & BBQ",
            "Frozen Food|Frozen Food",
            "Saus & Marinasi|Sauce & Marinade",
            "Makanan|Food",
            "Dessert|Dessert",
            "Minuman|Drinks",
            "Lainnya|Others",
            "Hidangan Laut|Seafood",
            "Sayuran|Vegetables",
        ];
        foreach ($categories as $category) {
            $categoryDatas = explode("|", $category);
            $categoryDB =  Category::create([
                'active' => 1
            ]);

            $loop = 0;
            foreach ($categoryDatas as $categoryData) {
                CategoryTranslation::create([
                    "category_id" => $categoryDB->id,
                    "language" => $loop == 0 ? "id" : "en",
                    "name" => $categoryData,
                    "slug" => Str::slug($categoryData)
                ]);
                $loop++;
            }
        }

        $badges = [
            "Baru|New",
            "Terlaris|Best Seller",
            "Promo|Promo",
            "Rekomendasi|Recommended",
            "Favorit|Favorite",
            "Hemat|Best Value",
            "Stok Terbatas|Limited Stock",
            "Spesial|Special",
            "Pedas|Spicy",
            "Pre-Order|Pre-Order",
        ];
        foreach ($badges as $badge) {
            $badgeDatas = explode("|", $badge);
            $badgeDB =  Badge::create([
                'active' => 1
            ]);

            $loop = 0;
            foreach ($badgeDatas as $badgeData) {
                BadgeTranslation::create([
                    "badge_id" => $badgeDB->id,
                    "language" => $loop == 0 ? "id" : "en",
                    "name" => $badgeData,
                    "slug" => Str::slug($badgeData)
                ]);
                $loop++;
            }
        }
    }
}
