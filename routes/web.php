<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\HouseController;
use App\Http\Controllers\HouseAssignmentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TenantDashboardController;
use App\Http\Controllers\MaintenanceRequestController;
use App\Http\Controllers\Auth\VerifyEmailController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// User Type Selection - Accessible without email verification
Route::middleware(['auth'])->group(function () {
    Route::get('/set-user-type', function () {
        return Inertia::render('auth/SelectUserType');
    })->name('set-user-type');

    Route::post('/set-user-type', function (Request $request) {
        $request->validate([
            'user_type' => 'required|in:Tenant,Caretaker,Admin,Landlord,Agent',
        ]);

        $user = Auth::user();
        $user->user_type = $request->user_type;
        $user->save();

        return redirect()->route('dashboard');
    });
});

// Email Verification Routes - Accessible without user type but require auth
Route::middleware(['auth'])->group(function () {
    Route::get('/email/verify', function () {
        return Inertia::render('auth/verify-email', [
            'status' => session('status'),
        ]);
    })->name('verification.notice');

    Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, '__invoke'])
        ->middleware(['signed'])
        ->name('verification.verify');

    // Use Fortify's built-in email verification notification
    Route::post('/email/verification-notification', function (Request $request) {
        $request->user()->sendEmailVerificationNotification();
        return back()->with('status', 'verification-link-sent');
    })->name('verification.send');

    // Logout route
    Route::post('/logout', function (Request $request) {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    })->name('logout');
});

// Main Dashboard - Requires auth and user type, but NOT email verification
Route::middleware(['auth', 'check.user.type'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

// ========== VERIFIED ROUTES (Require email verification) ==========

Route::middleware(['auth', 'verified', 'check.user.type'])->group(function () {
    
    // Tenant Routes
    Route::middleware(['check.user.type:Tenant'])->prefix('tenant')->name('tenant.')->group(function () {
        Route::get('/dashboard', [TenantDashboardController::class, 'index'])->name('dashboard');
        Route::get('/my-house', [TenantDashboardController::class, 'myHouse'])->name('my-house');
        Route::get('/payment-history', [TenantDashboardController::class, 'paymentHistory'])->name('payment-history');
        
        // Maintenance routes
        Route::prefix('maintenance')->name('maintenance.')->group(function () {
            Route::get('/', [MaintenanceRequestController::class, 'index'])->name('index');
            Route::get('/create', [MaintenanceRequestController::class, 'create'])->name('create');
            Route::post('/', [MaintenanceRequestController::class, 'store'])->name('store');
        });
    });

    // Landlord Routes
    Route::middleware(['check.user.type:Landlord'])->group(function () {
        // Properties
        Route::prefix('properties')->name('properties.')->group(function () {
            Route::get('/', [PropertyController::class, 'index'])->name('index');
            Route::get('/create', [PropertyController::class, 'create'])->name('create');
            Route::post('/', [PropertyController::class, 'store'])->name('store');
            Route::get('/{property}', [PropertyController::class, 'show'])->name('show');
            
            // Nested houses route
            Route::get('/{property}/houses', [HouseAssignmentController::class, 'getHousesByProperty'])->name('houses');
        });
        
        // Houses
        Route::prefix('houses')->name('houses.')->group(function () {
            Route::get('/create', [HouseController::class, 'create'])->name('create');
            Route::post('/', [HouseController::class, 'store'])->name('store');
            Route::get('/{house}/assignment-history', [HouseAssignmentController::class, 'history'])->name('assignment-history');
        });

        // House Assignments
        Route::prefix('house-assignments')->name('house-assignments.')->group(function () {
            Route::get('/create', [HouseAssignmentController::class, 'create'])->name('create');
            Route::post('/', [HouseAssignmentController::class, 'store'])->name('store');
            Route::post('/{assignment}/terminate', [HouseAssignmentController::class, 'terminate'])->name('terminate');
            Route::delete('/{assignment}', [HouseAssignmentController::class, 'destroy'])->name('destroy');
        });
    });

    // Tenant Search Routes - Accessible to landlords, admins, caretakers
    Route::middleware(['check.user.type:Landlord,Admin,Caretaker'])->group(function () {
        Route::prefix('tenants')->name('tenants.')->group(function () {
            Route::get('/{uuid}', [HouseAssignmentController::class, 'getTenantByUuid'])->name('show');
            Route::post('/search', [HouseAssignmentController::class, 'searchTenant'])->name('search');
        });
    });

    // Admin/Caretaker/Agent Routes
    Route::middleware(['check.user.type:Admin,Caretaker,Agent'])->group(function () {
        // Add admin/caretaker/agent specific routes here
    });
});

// Settings routes (from settings.php)
require __DIR__.'/settings.php';