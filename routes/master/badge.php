<?php

use App\Http\Controllers\Master\BadgeController;
use Illuminate\Support\Facades\Route;

Route::controller(BadgeController::class)->prefix('badge')->name('.badge')->group(function () {
  Route::get('/', 'index');
  Route::post('save', 'save')->name('.save');
  Route::delete('delete/{id}', 'delete')->name('.delete');
});
