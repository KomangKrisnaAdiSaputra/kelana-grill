<?php

use App\Http\Controllers\OrderPaymentController;
use Illuminate\Support\Facades\Route;

Route::controller(OrderPaymentController::class)->prefix('order-payment')->name('order-payment')->group(function () {
  Route::get('/', 'index');
  Route::post('save', 'save')->name('.save');
});
