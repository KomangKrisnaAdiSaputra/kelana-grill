<?php

use App\Http\Controllers\Product\InventoryController;
use Illuminate\Support\Facades\Route;

Route::prefix('inventory')->name('.inventory')->controller(InventoryController::class)->group(function () {
  Route::get('/', 'index');
  Route::post('save', 'save')->name('.save');
  Route::delete('delete/{id}', 'delete')->name('.delete');
});
