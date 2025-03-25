<?php

use App\Http\Controllers\PhoneController;
use Illuminate\Support\Facades\Route;

Route::apiResource('phones', PhoneController::class);
