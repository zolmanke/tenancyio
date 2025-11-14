<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\CheckUserType;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Preserve your cookie exceptions
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        // ✅ Add middleware for web routes (order matters)
        $middleware->web(append: [
            HandleAppearance::class,                 // theme handling
            HandleInertiaRequests::class,            // Inertia support
            AddLinkHeadersForPreloadedAssets::class, // preload assets
            CheckUserType::class,                    // ensure user type is set
        ]);

        // ✅ Register alias for manual use in routes
        $middleware->alias([
            'check.user.type' => CheckUserType::class,
        ]);
    })

    
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })
    ->create();
