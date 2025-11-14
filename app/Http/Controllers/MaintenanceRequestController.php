<?php
// app/Http/Controllers/MaintenanceRequestController.php

namespace App\Http\Controllers;

use App\Models\MaintenanceRequest;
use App\Models\HouseAssignment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MaintenanceRequestController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $currentAssignment = HouseAssignment::where('user_id', $user->id)
            ->where('is_active', true)
            ->with(['house.property'])
            ->first();

        $maintenanceRequests = MaintenanceRequest::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('tenant/MaintenanceList', [
            'auth' => [
                'user' => $user
            ],
            'maintenanceRequests' => $maintenanceRequests,
            'currentAssignment' => $currentAssignment,
        ]);
    }

    public function create(Request $request)
    {
        $user = $request->user();
        $currentAssignment = HouseAssignment::where('user_id', $user->id)
            ->where('is_active', true)
            ->with(['house.property'])
            ->firstOrFail();

        return Inertia::render('tenant/MaintenanceRequest', [
            'auth' => [
                'user' => $user
            ],
            'currentAssignment' => $currentAssignment,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'priority' => 'required|in:low,medium,high',
            'category' => 'required|in:general,plumbing,electrical,structural,appliance,other',
            'house_assignment_id' => 'required|exists:house_assignments,id',
        ]);

        $validated['user_id'] = $request->user()->id;
        $validated['status'] = 'pending';

        MaintenanceRequest::create($validated);

        return redirect()->route('maintenance.index')
            ->with('success', 'Maintenance request submitted successfully!');
    }
}