<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

// Route::inertia('/', 'welcome', [
//     'canRegister' => Features::enabled(Features::registration()),
// ])->name('home');

// Route::inertia('/', 'landing', [])->name('landing');

Route::get('/', function () {
    return inertia('landing');
})->name('landing');

Route::get('produk', function () {
    return inertia('landing/produk');
})->name('landing.produk');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__ . '/settings.php';
