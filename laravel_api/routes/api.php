<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FavoriteController;
Route::post('orders', [OrderController::class, 'store']);



// register user
Route::post('register', [AuthController::class, 'register']);

// login user
Route::post('login', [AuthController::class, 'login']);

// store messages
Route::post('/messages', [MessageController::class, 'store']);

// auth routes
Route::middleware('auth:sanctum')->group(function () {

    // get user data
    Route::get('/user/{id}', [UserController::class, 'getUserData']);

    // update user 
    Route::put('user', [UserController::class, 'update']);

    // get all products
    //Route::get('products', [ProductController::class, 'index']);

    // get product
    //Route::get('/product/{id}', [ProductController::class, 'getProduct']);

    // get all products for one user
    Route::get('products/user', [ProductController::class, 'userProducts']);

    // add new product
    Route::post('products', [ProductController::class, 'store']);

    // update product
    Route::put('/products/{id}', [ProductController::class, 'update']);

    // get all the orders for one user
    Route::get('orders', [OrderController::class, 'userOrders']);

    // get order
    Route::get('/order/{id}', [OrderController::class, 'getOrder']);

    // add new order

    // remove product from favorites
    Route::delete('favorites/{productId}', [FavoriteController::class, 'destroy']);

    // add product to favorites
    Route::post('favorites', [FavoriteController::class, 'store']);

    // get all categories
    Route::get('categories', [CategoryController::class, 'index']);


});

 // get all products
 Route::get('products', [ProductController::class, 'index']);

 // get product
 Route::get('/product/{id}', [ProductController::class, 'getProduct']);
