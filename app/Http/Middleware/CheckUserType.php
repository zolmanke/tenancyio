<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserType
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): \Symfony\Component\HttpFoundation\Response  $next
     * @param  string|null  $types  (optional: expected user types, e.g., 'Landlord' or 'Landlord,Admin,Tenant')
     */
    public function handle(Request $request, Closure $next, ?string $types = null): Response
    {
        $user = $request->user();

        // If user hasn't set their type yet, redirect them to set it
        if ($user && !$user->user_type && !$request->is('set-user-type', 'set-user-type/*')) {
            return redirect()->route('set-user-type');
        }

        // If no specific types are provided, just check if user type is set
        if (!$types) {
            return $next($request);
        }

        // Split the types by comma and check if user has one of the allowed types
        $allowedTypes = explode(',', $types);
        
        if ($user && !in_array($user->user_type, $allowedTypes)) {
            $allowedTypesString = implode(', ', $allowedTypes);
            abort(403, "Unauthorized — This page is only accessible to: {$allowedTypesString}");
        }

        return $next($request);
    }
}