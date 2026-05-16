<?php

use App\Http\Controllers\LandingPageController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::prefix('{locale?}')->where(['locale' => 'id|en'])->group(function () {
    Route::inertia('welcome', 'welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ])->name('home');

    Route::controller(LandingPageController::class)->name('landing')->group(function () {
        Route::get('/', 'index');
        Route::get('produk', 'indexProduk')->name('.produk');
    });
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__ . '/settings.php';
