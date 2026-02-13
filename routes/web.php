<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AgentController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\DriverController;
use App\Http\Controllers\JobSiteController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\LocationController;

Route::get('/', function () {
    if (Route::has('login')) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth', 'verified')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('users', UserController::class);
    Route::resource('groups', GroupController::class);
    Route::resource('jobs', JobSiteController::class);
    Route::resource('agents', AgentController::class);
    Route::resource('districts', DistrictController::class);
    Route::resource('drivers', DriverController::class);
    Route::resource('locations', LocationController::class);
});

require __DIR__.'/auth.php';
