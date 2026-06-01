<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'name' => 'Krisna Adi',
            'email' => 'krisnaadii2328@gmail.com',
            'password' => Hash::make(100917)
        ]);

        User::create([
            'name' => 'Diah Gayatri',
            'email' => 'gdiah04@gmail.com',
            'password' => Hash::make(100917)
        ]);
    }
}
