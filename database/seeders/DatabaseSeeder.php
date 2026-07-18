<?php

namespace Database\Seeders;

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
    }
}
