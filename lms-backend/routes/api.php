<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BooksUsersController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
 Route::group(['middleware'=>'auth:api'],function () {
   
});

// Route::middleware('auth:api')->group(function () {
    
// });
Route::post('/register/user',[UserController::class,'register']);
Route::post('/login/user',[UserController::class,'userlogin']);
Route::post('/register/admin',[AdminController::class,'adminreg']);
Route::post('/login/admin',[AdminController::class,'adminlogin']);
Route::get('/users',[UserController::class,'showusers']);
Route::get('/books/display',[BookController::class,'display']);
Route::post('/books/add',[BookController::class,'addBook']);
Route::delete('/books/delete/{id}',[BookController::class,'delete']);
Route::delete('users/delete/{id}',[UserController::class,'delete']);
Route::get('/books/{id}',[BookController::class,'getBook']);
Route::put('/books/update/{id}',[BookController::class,'update']);
Route::put('/users/update/{id}',[UserController::class,'update']);
Route::get('/users/get/{id}',[UserController::class,'getUser']);
Route::get("find/{name}",[UserController::class,'searchUser']);
Route::get('/books/search/{id}',[BookController::class,'findBook']);
Route::post('/books/assign',[BooksUsersController::class,'assign']);
Route::delete('/delete/{id}',[BooksUsersController::class,'delete']);
Route::get('/show/{user_id}',[BooksUsersController::class,'show']);