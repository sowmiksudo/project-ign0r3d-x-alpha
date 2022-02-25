<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::group(['prefix' => 'user', 'middleware' => 'CORS'], function () {
    Route::post('/register', [UserController::class, 'register'])->name('register');
    Route::post('/login', [UserController::class, 'login'])->name('login');
    Route::get('/login', function(){
        return response()->json([
            "success" => false
        ]);
    });
    Route::get('/profile', [UserController::class, 'viewProfile'])->name('profile');
    Route::get('/logout', [UserController::class, 'logout'])->name('logout');
});
