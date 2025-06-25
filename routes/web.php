<?php

use App\Http\Controllers\Mods\ModsController;

use App\Http\Controllers\Servers\ServerController;
use App\Http\Controllers\Servers\ServerModController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/login');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');

    Route::get('servers', [ServerController::class, 'index'])->name('servers.index');
    Route::post('servers', [ServerController::class, 'store'])->name('servers.store');

    Route::prefix('servers/{server}')->name('servers.')->middleware('server.auth')->group(function () {

        // GET
        Route::get('/', [ServerController::class, 'show'])->name('show');
        Route::get('/settings', [ServerController::class, 'showSettings'])->name('settings');
        Route::get('/mods', [ServerController::class, 'showMods'])->name('mods');
        Route::get('/files', [ServerController::class, 'showFiles'])->name('files');
        Route::get('/console', [ServerController::class, 'showConsole'])->name('console');

        // POST
        Route::post('/start', [ServerController::class, 'start'])->name('start');
        Route::post('/stop', [ServerController::class, 'stop'])->name('stop');
        Route::post('/mods/{mod}/toggle', [ServerModController::class, 'toggle'])->name('mods.toggle');

        // PATCH
        Route::patch('/settings', [ServerController::class, 'updateSettings'])->name('settings.update');
    });


    Route::middleware('role:admin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/mods', [ModsController::class, 'index'])->name('mods.index');
        Route::post('/mods', [ModsController::class, 'store'])->name('mods.store');
        Route::delete('/mods/{mod}', [ModsController::class, 'destroy'])->name('mods.destroy');
    });
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
