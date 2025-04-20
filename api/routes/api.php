<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix("v1")->group(function () {
    Route::post("/register", [AuthController::class, "register"]);

    Route::post("/login", [AuthController::class, "login"]);

    Route::get("/me", [ProfileController::class, "me"])->middleware(
        "auth:sanctum"
    );
    Route::put("/me", [ProfileController::class, "edit"])->middleware(
        "auth:sanctum"
    );

    Route::post("/logout", [AuthController::class, "logout"])->middleware(
        "auth:sanctum"
    );

    Route::post("/post", [PostController::class, "store"])->middleware(
        "auth:sanctum"
    );
    Route::get("/post/{id}", [PostController::class, "show"]);

    Route::get("/posts", [PostController::class, "index"])->middleware(
        "auth:sanctum"
    );
});
