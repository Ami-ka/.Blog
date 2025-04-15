<?php

use App\Http\Controllers\Api\v1\AuthController;
use App\Http\Controllers\Api\v1\RegisterController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\MyUser;




Route::prefix('v1')->group(function () {
    Route::post('/login', [AuthController::class,'login'])->middleware(['web']);
    
});
Route::post('v1/register', [RegisterController::class,'register']);