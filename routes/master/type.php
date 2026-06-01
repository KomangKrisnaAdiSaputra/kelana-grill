<?php

use App\Http\Controllers\Master\TypeController;
use Illuminate\Support\Facades\Route;

Route::controller(TypeController::class)->prefix('type')->name('.type')->group(function () {
  Route::get('/', 'index');
  Route::post('save', 'save')->name('.save');
  Route::delete('delete/{id}', 'delete')->name('.delete');
});
