<?php

use App\Http\Controllers\Product\ManageProductController;
use Illuminate\Support\Facades\Route;

Route::controller(ManageProductController::class)->prefix('manage-product')->name('.manage-product')->group(function () {
  Route::get('/', 'index');
  Route::post('save', 'save')->name('.save');
  Route::delete('delete/{id}', 'delete')->name('.delete');
});
