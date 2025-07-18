<?php

use App\Http\Controllers\Account\AccountController;
use App\Http\Controllers\Account\AddressController;
use App\Http\Controllers\Account\BillController;
use App\Http\Controllers\Account\SettingController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\WorkOS\Http\Middleware\ValidateSessionWithWorkOS;

Route::middleware([
    'auth',
    ValidateSessionWithWorkOS::class,
])->group(function () {
    Route::redirect('settings', 'settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');
});
//frontend settings routes
Route::middleware([
    'auth',
    ValidateSessionWithWorkOS::class,
])->prefix('account')->group(function () {
    Route::resource('account', AccountController::class);
    Route::resource('billing', BillController::class);
    Route::get('setting', [SettingController::class, 'index'])->name('setting.index');
    Route::patch('setting', [SettingController::class, 'update'])->name('setting.update');
    Route::delete('setting', [SettingController::class, 'destroy'])->name('setting.destroy');
});

// address routes
Route::middleware(['auth'])->prefix('account')->group(function () {
    Route::post('/addresses/{id}', [AddressController::class, 'storeOrUpdate'])->name('addresses.save');
    Route::delete('/addresses/{id}', [AddressController::class, 'destroy'])->name('addresses.delete');
});
