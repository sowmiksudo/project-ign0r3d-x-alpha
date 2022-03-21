<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\HistoryController;
use Illuminate\Support\Facades\Route;
use Psy\Command\HistoryCommand;

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
    return response()->json([
        "success" => true,
        "message" => "Hello dude!"
    ]);
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

Route::get("/verify/{id}", [UserController::class, "verify"]);
Route::get("/ban/{id}", [UserController::class, "ban"]);
Route::get("/unban/{id}", [UserController::class, "unban"]);
Route::get("/user/{id}/promote", [UserController::class, 'promote']);
Route::get("/user/{id}/demote", [UserController::class, 'demote']);

Route::get("/history/bombings", [HistoryController::class, 'bombings'])->name("bombings");
Route::get("/history/messages", [HistoryController::class, 'messages'])->name("messages");
