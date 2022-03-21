<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\XsmsController;
use App\Http\Controllers\BomberController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\AppController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/


Route::group(["middleware" => "CORS", "as" => "api."], function () {
    Route::get("batchInfo", [AppController::class, 'show']);
    Route::group(['prefix' => 'user'], function () {
        Route::get('/', [UserController::class, 'viewProfile'])->name('profile');
        Route::post('register', [UserController::class, 'register'])->name('register');
        Route::post('login', [UserController::class, 'login'])->name('login');
        Route::get('logout', [UserController::class, 'logout'])->name('logout');

        Route::group(["prefix" => "profile"], function () {
            Route::get('/', [UserController::class, 'viewProfile'])->name('profile');
            Route::post('saveName', [UserController::class, 'saveName'])->name('profile.saveName');
        });
    });

    Route::group(["prefix" => "x-sms"], function () {
        Route::get("getConfig", [XsmsController::class, 'config'])->name("xsms.config");
        Route::get("getHistory", [XsmsController::class, 'history'])->name("xsms.history");
        Route::get("getProfile", [XsmsController::class, 'profile'])->name("xsms.profile");
        Route::post("sendSingleSms", [XsmsController::class, 'send'])->name("xsms.send");
    });


    Route::group(["prefix" => "bomber"], function () {
        Route::get("getProfile", [BomberController::class, "profile"]);
        Route::get("getHistory", [BomberController::class, "history"]);
        Route::post("bombing", [BomberController::class, "add"]);
        Route::get("blacklists", [BomberController::class, "showBlacklist"]);
        Route::post("blacklist", [BomberController::class, "addBlacklist"]);
        Route::get("blacklist/delete/{id}", [BomberController::class, "deleteBlacklist"]);
        Route::group(['prefix'=>'api'], function(){
            Route::get("get", [ApiController::class, "get"]);
            Route::post("add", [ApiController::class, 'add']);
            Route::post("save", [ApiController::class, 'save']);
            Route::get("delete/{id}", [ApiController::class, 'delete']);
        });
    });
});
