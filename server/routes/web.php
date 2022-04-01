<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
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

Route::get('/', function () {
    return redirect()->route('dashboard');
});

require __DIR__ . '/auth.php';

Auth::routes([
    'register' => false,
    'reset' => false,
    'verify' => false,
]);

Route::get('/dashboard', [App\Http\Controllers\HomeController::class, 'index'])->name('dashboard');

Route::get("/users", [UserController::class, "all"])->name("users");
Route::get("/user/{id}", [UserController::class, "show"])->name("user");
Route::post("/user/search", [UserController::class, "search"])->name("search");
Route::post("/user/{id}/update", [UserController::class, 'update'])->name("update");
Route::get("/user/{id}/messages", [UserController::class, 'messages'])->name("user.messages");
Route::get("/user/{id}/bombings", [UserController::class, 'bombings'])->name("user.bombings");
Route::get("/user/{id}/alerts", [UserController::class, 'alerts'])->name("user.alerts");
Route::get("/user/{id}/feedbacks", [UserController::class, 'feedbacks'])->name("user.feedbacks");

Route::get("/verify/{id}", [UserController::class, "verify"]);
Route::get("/ban/{id}", [UserController::class, "ban"]);
Route::get("/unban/{id}", [UserController::class, "unban"]);
Route::get("/user/{id}/promote", [UserController::class, 'promote']);
Route::get("/user/{id}/demote", [UserController::class, 'demote']);

Route::get("/history/bombings", [HistoryController::class, 'bombings'])->name("bombings");
Route::get("/history/messages", [HistoryController::class, 'messages'])->name("messages");

Route::get("/feedbacks", [HomeController::class, 'feedbacks'])->name('feedbacks');
Route::get("/alerts", [HomeController::class, 'alerts'])->name('alerts');
Route::prefix("/banned")->group(function(){
    Route::get("/", [HomeController::class, 'banned'])->name("banned");
    Route::post("/", [HomeController::class, 'banned_add'])->name("banned_add");
    Route::get("/delete/{id}", [HomeController::class, 'banned_delete'])->name("banned_delete");
});

Route::prefix('/notifications')->group(function () {
    Route::get("/", [HomeController::class, 'notifications'])->name('notifications');
    Route::post("/", [HomeController::class, 'notifications_add'])->name('notifications.add');
    Route::get("/delete/{id}", [HomeController::class, 'notifications_delete'])->name('notifications.delete');
});


Route::get('artisan/{command}', function ($command) {
    $artisan = Artisan::call($command);
    $output = Artisan::output();
    return $output;
});
