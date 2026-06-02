<?php

use App\Http\Controllers\Master\CategoryController;
use Illuminate\Support\Facades\Route;

Route::controller(CategoryController::class)->prefix('category')->name('.category')->group(function () {
  Route::get('/', 'index');
  Route::post('save', 'save')->name('.save');
  Route::delete('delete/{id}', 'delete')->name('.delete');
});
