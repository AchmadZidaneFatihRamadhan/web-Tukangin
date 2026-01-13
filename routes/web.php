<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;

// ================= ADMIN =================
use App\Http\Controllers\Admin\AdminProductController;

// ================= CUSTOMER =================
use App\Http\Controllers\Customer\HomeController;
use App\Http\Controllers\Customer\OrderController;
use App\Http\Controllers\Customer\CustomerProductController;
use App\Http\Controllers\Customer\ServiceController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// ================= PUBLIC / CUSTOMER =================
Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/products', [CustomerProductController::class, 'index'])
    ->name('customer.products');

Route::get('/services', [ServiceController::class, 'index'])
    ->name('services');

Route::get('/services/{id}', [ServiceController::class, 'show'])
    ->name('service.detail');


// ================= DASHBOARD AUTH AREA =================
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth'])->group(function () {

    // ================= ADMIN =================
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::resource('products', AdminProductController::class);
    });

    // ================= CUSTOMER =================
    Route::middleware('customer')->group(function () {
        Route::post('/checkout', [OrderController::class, 'checkout'])
            ->name('checkout');
    });

    // ================= PROFILE (BREEZE) =================
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/', fn () => view('customer.home'))->name('home');

});

require __DIR__ . '/auth.php';
