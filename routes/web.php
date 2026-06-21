<?php

use App\Http\Controllers\LandingPageController;
use App\Http\Middleware\Locale;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::prefix('{locale?}')->middleware(Locale::class)->where(['locale' => 'id|en'])->group(function () {
    Route::prefix('produk')->get('/{a1?}/{a2?}/{a3?}/{a4?}/{a5?}/{a6?}/{a7?}/{a8?}/{a9?}/{a10?}', function () {
        return;
    });

    Route::inertia('welcome', 'welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ])->name('home');

    Route::controller(LandingPageController::class)->name('landing')->group(function () {
        Route::get('/', 'index');
        Route::get('product', 'indexProduct')->name('.produk');
        Route::get('contact', 'indexContact')->name('.contact');
        Route::get('about', 'indexAbout')->name('.about');
        Route::get('booking/status/{id}', 'indexStatus')->name('.booking.status');

        Route::post('contact/booking', 'booking')->name('.contact.booking');
    });
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    require __DIR__ . '/orderpayment.php';

    Route::prefix('product')->name('product')->group(function () {
        require __DIR__ . '/product/manageproduct.php';
    });

    Route::prefix('master')->name('master')->group(function () {
        require __DIR__ . '/master/type.php';
        require __DIR__ . '/master/category.php';
        require __DIR__ . '/master/badge.php';
        require __DIR__ . '/master/warehouse.php';
    });
});

require __DIR__ . '/settings.php';
