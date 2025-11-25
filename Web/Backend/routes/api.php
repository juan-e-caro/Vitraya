<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);

    // Usuarios
    Route::get('ListUser', [UserController::class, 'index']);
    Route::post('CreateUser', [UserController::class, 'store']);
    Route::get('User/{id}', [UserController::class, 'show']);
    Route::put('UpdateUser/{id}', [UserController::class, 'update']);
    Route::delete('DeleteUser/{id}', [UserController::class, 'destroy']);

    // Productos
    Route::get('ListProduct', [ProductController::class, 'index']);
    Route::post('CreateProduct', [ProductController::class, 'store']);
    Route::get('Product/{id}', [ProductController::class, 'show']);
    Route::put('UpdateProduct/{id}', [ProductController::class, 'update']);
    Route::delete('DeleteProduct/{id}', [ProductController::class, 'destroy']);

    // Carrito
    Route::get('ListCart', [CartController::class, 'index']);
    Route::post('CreateCart', [CartController::class, 'store']);
    Route::get('Cart/{id}', [CartController::class, 'show']);
    Route::put('UpdateCart/{id}', [CartController::class, 'update']);
    Route::delete('DeleteCart/{id}', [CartController::class, 'destroy']);
});