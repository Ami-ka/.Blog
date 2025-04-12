<?php

use App\Http\Controllers\Api\v1\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\MyUser;




Route::prefix('v1')->group(function () {
    Route::post('/register', [AuthController::class,'register'])->middleware(['throttle:5,1', 'guest']);
    Route::post('/login', [AuthController::class,'login'])->middleware(['web']);
    
});