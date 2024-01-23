<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\QualificationController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\UserController;
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
Route::get('qualificationRank', [PostController::class, 'getQualificationRanking']);
Route::get('categories', [ CategoryController::class, 'home']);
Route::get('statuses', [StatusController::class, 'home']);


Route::get('posts/new', [PostController::class, 'home']);
Route::post('posts/create', [PostController::class, 'store']);
Route::get('posts/index', [PostController::class, 'index']);
Route::get('posts/detail/{post_id}', [PostController::class, 'detail']);
Route::put('posts/{post_id}', [PostController::class, 'update']);
Route::delete('posts/{post_id}', [PostController::class, 'destroy']);

Route::get('comments/index/{post_id}', [CommentController::class, 'index']);
Route::post('comment/post', [CommentController::class, 'create']);
Route::put('comment/update/{comment_id}', [CommentController::class, 'update']);
Route::delete('comment/delete/{comment_id}', [CommentController::class, 'destroy']);



Route::post('favorite', [FavoriteController::class, 'toggleFavorite']);
Route::get('favorite/status', [FavoriteController::class, 'getFavoriteStatus']);
Route::get('favorite/index', [FavoriteController::class, 'index']);
Route::get('favorite/user/rank', [FavoriteController::class, 'userRank']);

Route::get('user/profile/{user_id}', [UserController::class, 'userProfile']);
Route::post('profile/edit', [UserController::class, 'edit']);


Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
