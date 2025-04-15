<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix("v1")->group(function () {
    
    Route::post('/register', [AuthController::class, 'register']);
    
    Route::post('/login', [AuthController::class, 'login']);
    
    Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');

    Route::post('/logout', [AuthController::class,'logout'])->middleware('auth:sanctum');

});