<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\QualificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('signup', [AuthController::class, 'signup']);
Route::post('login', [AuthController::class, 'login']);

Route::get('qualifications', [QualificationController::class, 'index']);
Route::get('categories', [CategoryController::class, 'home']);
Route::get('posts', [PostController::class, 'home']);
Route::post('posts/index', [PostController::class, 'index']);
Route::get('posts/detail/{post_id}', [PostController::class, 'detail']);
Route::put('posts/{post_id}', [PostController::class, 'edit']);
Route::delete('posts/{post_id}', [PostController::class, 'destroy']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
