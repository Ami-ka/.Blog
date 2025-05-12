<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix("v1")->group(function () {
    Route::post("/register", [AuthController::class, "register"]);
    Route::post("/posts/{index}", [PostController::class, "pIndex"]);

    Route::post("/login", [AuthController::class, "login"]);

    Route::get("/users/", [ProfileController::class, "index"]);

    Route::get("/user/{id}", [ProfileController::class, "user_by_id"]);
    Route::get("/user/{id}/posts", [PostController::class, "post_by_user_id"]);
    Route::get("/user", [ProfileController::class, "me"])->middleware(
        "auth:sanctum"
    );

    Route::put("/user", [ProfileController::class, "edit"])->middleware(
        "auth:sanctum"
    );

    Route::post("/logout", [AuthController::class, "logout"])->middleware(
        "auth:sanctum"
    );

    Route::post("/post", [PostController::class, "store"])->middleware(
        "auth:sanctum"
    );
    Route::post("/post/{id}/like", [PostController::class, "like"])->middleware(
        "auth:sanctum"
    );
    Route::get("/post/{id}/like", [PostController::class, "likeIndex"]);
    Route::post("/post/{id}/unlike", [
        PostController::class,
        "unlike"
    ])->middleware("auth:sanctum");
    Route::get("/post/{id}", [PostController::class, "show"]);


    Route::get("/posts", [PostController::class, "index"])->middleware(
        "auth:sanctum"
    );
    Route::get("/", [PostController::class, "all"]);
});
