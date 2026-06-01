<?php

use App\Http\Controllers\Master\TypeController;
use App\Http\Controllers\Master\WareHouseController;
use Illuminate\Support\Facades\Route;

Route::controller(WareHouseController::class)->prefix('warehouse')->name('.warehouse')->group(function () {
  Route::get('/', 'index');
  Route::post('save', 'save')->name('.save');
  Route::delete('delete/{id}', 'delete')->name('.delete');
});
