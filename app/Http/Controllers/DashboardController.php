<?php
// app/Http/Controllers/DashboardController.php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\House;
use App\Models\HouseAssignment;
use App\Models\HouseAssignment as TenantAssignment;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Redirect based on user type
        switch ($user->user_type) {
            case 'Tenant':
                return $this->tenantDashboard($user);
            case 'Landlord':
                return $this->landlordDashboard($user);
            case 'Admin':
            case 'Caretaker':
            case 'Agent':
                return $this->staffDashboard($user);
            default:
                return $this->defaultDashboard($user);
        }
    }

    private function landlordDashboard($user)
    {
        // Get basic stats for landlord
        $stats = [
            'total_properties' => Property::where('user_id', $user->id)->count(),
            'total_houses' => House::whereHas('property', function($query) use ($user) {
                $query->where('user_id', $user->id);
            })->count(),
            'occupied_houses' => House::whereHas('property', function($query) use ($user) {
                $query->where('user_id', $user->id);
            })->where('is_occupied', true)->count(),
            'total_tenants' => HouseAssignment::whereHas('house.property', function($query) use ($user) {
                $query->where('user_id', $user->id);
            })->where('is_active', true)->count(),
            'monthly_revenue' => HouseAssignment::whereHas('house.property', function($query) use ($user) {
                $query->where('user_id', $user->id);
            })->where('is_active', true)->sum('rent_amount'),
        ];

        // Calculate derived stats
        $stats['vacant_houses'] = $stats['total_houses'] - $stats['occupied_houses'];
        $stats['occupancy_rate'] = $stats['total_houses'] > 0 
            ? round(($stats['occupied_houses'] / $stats['total_houses']) * 100)
            : 0;
        $stats['recent_payments'] = 0; // Placeholder for future payment system

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'user_type' => 'Landlord'
        ]);
    }

    private function tenantDashboard($user)
    {
        // Get the tenant's current active assignment
        $currentAssignment = TenantAssignment::with([
            'house.property',
            'house' => function($query) {
                $query->select('id', 'property_id', 'house_no', 'type', 'floor', 'price');
            }
        ])
        ->where('user_id', $user->id)
        ->where('is_active', true)
        ->first();

        // Get payment history (placeholder for future payment system)
        $paymentHistory = [
            'total_paid' => 0,
            'last_payment' => null,
            'next_payment_due' => $currentAssignment ? now()->addMonth()->format('Y-m-d') : null,
        ];

        // Get maintenance requests (placeholder)
        $maintenanceRequests = [
            'pending' => 0,
            'resolved' => 0,
            'recent' => [],
        ];

        $stats = [
            'has_active_lease' => $currentAssignment ? true : false,
            'current_rent' => $currentAssignment ? $currentAssignment->rent_amount : 0,
            'days_until_next_payment' => $currentAssignment ? now()->diffInDays(now()->addMonth()) : 0,
            'lease_days_remaining' => $currentAssignment && $currentAssignment->lease_end_date 
                ? now()->diffInDays($currentAssignment->lease_end_date) 
                : null,
        ];

        return Inertia::render('tenant/Dashboard', [
            'currentAssignment' => $currentAssignment,
            'paymentHistory' => $paymentHistory,
            'maintenanceRequests' => $maintenanceRequests,
            'stats' => $stats,
            'user_type' => 'Tenant'
        ]);
    }



    private function defaultDashboard($user)
    {
        // Default dashboard for users without specific type or unknown type
        $stats = [
            'total_properties' => 0,
            'total_houses' => 0,
            'occupied_houses' => 0,
            'vacant_houses' => 0,
            'total_tenants' => 0,
            'monthly_revenue' => 0,
            'occupancy_rate' => 0,
            'recent_payments' => 0,
        ];

        return Inertia::render('tdashboard', [
            'stats' => $stats,
            'user_type' => 'default'
        ]);
    }
}