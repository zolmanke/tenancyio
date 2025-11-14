<?php
// app/Http/Controllers/TenantDashboardController.php

namespace App\Http\Controllers;

use App\Models\HouseAssignment;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Inertia\Inertia;

class TenantDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Get the tenant's current active assignment
        $currentAssignment = HouseAssignment::with([
            'house.property',
            'house' => function($query) {
                $query->select('id', 'property_id', 'house_no', 'type', 'floor', 'price');
            }
        ])
        ->where('user_id', $user->id)
        ->where('is_active', true)
        ->first();

        // Calculate rent based on move-in date
        $rentDetails = $this->calculateRentDetails($currentAssignment);

        // Get payment history
        $paymentHistory = [
            'total_paid' => 0,
            'last_payment' => null,
            'next_payment_due' => $currentAssignment ? $rentDetails['next_payment_due'] : null,
            'current_month_rent' => $currentAssignment ? $rentDetails['current_month_rent'] : 0,
            'is_prorated' => $currentAssignment ? $rentDetails['is_prorated'] : false,
        ];

        // Get maintenance requests
        $maintenanceRequests = [
            'pending' => 0,
            'resolved' => 0,
            'recent' => [],
        ];

        $stats = [
            'has_active_lease' => $currentAssignment ? true : false,
            'current_rent' => $currentAssignment ? $rentDetails['current_month_rent'] : 0,
            'days_until_next_payment' => $currentAssignment ? now()->diffInDays($rentDetails['next_payment_due']) : 0,
            'lease_days_remaining' => $currentAssignment && $currentAssignment->lease_end_date 
                ? now()->diffInDays($currentAssignment->lease_end_date) 
                : null,
            'is_prorated_month' => $currentAssignment ? $rentDetails['is_prorated'] : false,
        ];

        return Inertia::render('tenant/Dashboard', [
            'currentAssignment' => $currentAssignment,
            'paymentHistory' => $paymentHistory,
            'maintenanceRequests' => $maintenanceRequests,
            'stats' => $stats,
            'rentDetails' => $rentDetails,
        ]);
    }

    /**
     * Calculate rent details based on move-in date
     */
    private function calculateRentDetails($assignment)
    {
        if (!$assignment) {
            return [
                'current_month_rent' => 0,
                'next_payment_due' => null,
                'is_prorated' => false,
                'prorated_days' => 0,
                'full_rent_amount' => 0,
            ];
        }

        $moveInDate = Carbon::parse($assignment->lease_start_date);
        $today = Carbon::now();
        $fullRent = $assignment->rent_amount;

        // Check if tenant moved in this month
        if ($moveInDate->format('Y-m') === $today->format('Y-m')) {
            // Tenant moved in this month - calculate prorated rent
            $daysInMonth = $today->daysInMonth;
            $daysRemaining = $today->diffInDays($today->copy()->endOfMonth()) + 1; // +1 to include today
            
            $proratedRent = ($fullRent / $daysInMonth) * $daysRemaining;
            
            return [
                'current_month_rent' => round($proratedRent, 2),
                'next_payment_due' => $today->copy()->addMonth()->startOfMonth()->format('Y-m-d'),
                'is_prorated' => true,
                'prorated_days' => $daysRemaining,
                'full_rent_amount' => $fullRent,
                'prorated_explanation' => "Prorated rent for {$daysRemaining} days of {$daysInMonth} total days this month"
            ];
        } else {
            // Regular full month rent
            return [
                'current_month_rent' => $fullRent,
                'next_payment_due' => $today->copy()->addMonth()->startOfMonth()->format('Y-m-d'),
                'is_prorated' => false,
                'prorated_days' => 0,
                'full_rent_amount' => $fullRent,
            ];
        }
    }

    /**
     * Calculate rent for a specific month
     */
    public function calculateMonthlyRent($assignment, $month = null)
    {
        if (!$assignment) return 0;

        $month = $month ? Carbon::parse($month) : Carbon::now();
        $moveInDate = Carbon::parse($assignment->lease_start_date);
        $fullRent = $assignment->rent_amount;

        // If this is the move-in month, calculate prorated rent
        if ($moveInDate->format('Y-m') === $month->format('Y-m')) {
            $daysInMonth = $month->daysInMonth;
            $daysRemaining = $moveInDate->diffInDays($month->copy()->endOfMonth()) + 1;
            
            return round(($fullRent / $daysInMonth) * $daysRemaining, 2);
        }

        // Full rent for subsequent months
        return $fullRent;
    }

    public function myHouse()
    {
        $user = Auth::user();

        $assignment = HouseAssignment::with([
            'house.property',
            'house' => function($query) {
                $query->select('id', 'property_id', 'house_no', 'type', 'floor', 'price', 'description');
            }
        ])
        ->where('user_id', $user->id)
        ->where('is_active', true)
        ->firstOrFail();

        // Calculate rent details for the current assignment
        $rentDetails = $this->calculateRentDetails($assignment);

        return Inertia::render('Tenant/MyHouse', [
            'assignment' => $assignment,
            'rentDetails' => $rentDetails,
        ]);
    }

    public function paymentHistory()
    {
        $user = Auth::user();

        $assignment = HouseAssignment::where('user_id', $user->id)
            ->where('is_active', true)
            ->first();

        // Generate payment schedule based on move-in date
        $paymentSchedule = [];
        if ($assignment) {
            $paymentSchedule = $this->generatePaymentSchedule($assignment);
        }

        return Inertia::render('Tenant/PaymentHistory', [
            'payments' => $paymentSchedule,
            'assignment' => $assignment,
        ]);
    }

    /**
     * Generate payment schedule for the tenant
     */
    private function generatePaymentSchedule($assignment)
    {
        $schedule = [];
        $moveInDate = Carbon::parse($assignment->lease_start_date);
        $currentDate = Carbon::now();
        
        // Start from move-in month
        $date = $moveInDate->copy()->startOfMonth();
        
        while ($date <= $currentDate->copy()->addMonths(6)) { // Show next 6 months
            $rentAmount = $this->calculateMonthlyRent($assignment, $date);
            $dueDate = $date->copy()->startOfMonth();
            $status = $dueDate < $currentDate ? 'paid' : 'pending';
            
            $schedule[] = [
                'month' => $date->format('F Y'),
                'due_date' => $dueDate->format('Y-m-d'),
                'amount' => $rentAmount,
                'status' => $status,
                'is_prorated' => $date->format('Y-m') === $moveInDate->format('Y-m'),
            ];
            
            $date->addMonth();
        }
        
        return $schedule;
    }
}