<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\CategoryController;


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::put('user', [UserController::class, 'update']);

    Route::get('products', [ProductController::class, 'index']);
    Route::get('products/user', [ProductController::class, 'userProducts']);
    Route::post('products', [ProductController::class, 'store']);

    Route::get('orders', [OrderController::class, 'userOrders']);
    Route::post('orders', [OrderController::class, 'store']);


    Route::post('favorites', [FavoriteController::class, 'store']);
    Route::delete('favorites/{productId}', [FavoriteController::class, 'destroy']);

    Route::get('categories', [CategoryController::class, 'index']);
});
