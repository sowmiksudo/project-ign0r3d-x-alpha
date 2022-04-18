<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BalanceController;
use App\Http\Controllers\DepositController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\AdminPanelController;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes(["register" => false, "password.reset" => false]);

Route::middleware(['auth'])->group(function () {
    Route::get('/', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
    Route::post("/", [BalanceController::class, 'get'])->name('info.get');
    Route::get("/history", [HistoryController::class, 'index'])->name('history');
    Route::get("/deposits", [DepositController::class, 'index'])->name('deposits');
    Route::get("/add", [DepositController::class, 'create'])->name('deposit.show');
});

Route::middleware('throttle:3,1')->post("/add", [DepositController::class, 'store'])->name('deposit.add');

Route::middleware(['auth', 'isAdmin'])->prefix("admin")->name('admin.')->group(function () {
    Route::get("/", [AdminPanelController::class, 'index'])->name('index');
    Route::get("/requests", [AdminPanelController::class, 'requests'])->name('requests');
    Route::post("/action", [AdminPanelController::class, 'action'])->name('action');
    Route::get("/blacklists", [AdminPanelController::class, 'blacklists'])->name('blacklists');
    Route::post("/blacklists", [AdminPanelController::class, 'blacklists_add'])->name('blacklists.add');
    Route::delete("/blacklists", [AdminPanelController::class, 'blacklists_delete'])->name('blacklists.delete');
});


Route::get('artisan/{command}', function ($command) {
    $artisan = Artisan::call($command);
    $output = Artisan::output();
    return $output;
});
