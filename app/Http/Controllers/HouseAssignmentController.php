<?php
// app/Http/Controllers/HouseAssignmentController.php

namespace App\Http\Controllers;

use App\Models\House;
use App\Models\HouseAssignment;
use App\Models\Property;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HouseAssignmentController extends Controller
{
    public function create()
    {
        // Get properties and houses that belong to the landlord and are vacant
        $properties = Property::where('user_id', Auth::id())
            ->with(['houses' => function($query) {
                $query->where('is_occupied', false);
            }])
            ->get();

        return Inertia::render('house-assignments/Create', [
            'properties' => $properties
        ]);
    }

    public function getTenantByUuid($uuid)
    {
        \Log::info("Searching for tenant with UUID: {$uuid}");

        try {
            $tenant = User::where('user_type', 'Tenant')
                ->where('uuid', $uuid)
                ->select(['id', 'uuid', 'name', 'email'])
                ->first();

            if (!$tenant) {
                \Log::warning("Tenant not found with UUID: {$uuid}");
                return response()->json([
                    'success' => false,
                    'error' => 'Tenant not found with this ID'
                ], 404);
            }

            \Log::info("Tenant found: {$tenant->name} ({$tenant->email})");
            return response()->json([
                'success' => true,
                'tenant' => $tenant
            ]);

        } catch (\Exception $e) {
            \Log::error("Error searching for tenant UUID {$uuid}: " . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Server error while searching for tenant'
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_uuid' => 'required|exists:users,uuid',
            'house_id' => 'required|exists:houses,id',
            'lease_start_date' => 'required|date',
            'lease_end_date' => 'nullable|date|after:lease_start_date',
            'rent_amount' => 'required|numeric|min:0',
            'payment_frequency' => 'required|in:monthly,quarterly,annually',
            'security_deposit' => 'nullable|numeric|min:0',
            'terms' => 'nullable|string',
        ]);

        try {
            // Get the user ID from UUID
            $user = User::where('uuid', $validated['user_uuid'])->firstOrFail();
            
            // Verify this user is actually a tenant
            if ($user->user_type !== 'Tenant') {
                return back()->withErrors([
                    'user_uuid' => 'The selected user is not a Tenant.'
                ]);
            }

            $validated['user_id'] = $user->id;

            // Verify the house belongs to the landlord
            $house = House::where('id', $validated['house_id'])
                ->whereHas('property', function($query) {
                    $query->where('user_id', Auth::id());
                })
                ->firstOrFail();

            // Verify the house is not already occupied
            if ($house->is_occupied) {
                return back()->withErrors(['house_id' => 'This house is already occupied.']);
            }

            // Create the assignment
            HouseAssignment::create($validated);

            // Mark house as occupied
            $house->update(['is_occupied' => true]);

            return redirect()->route('properties.index')
                ->with('success', 'Tenant assigned to house successfully!');

        } catch (\Exception $e) {
            \Log::error("Error assigning tenant to house: " . $e->getMessage());
            return back()->withErrors([
                'general' => 'An error occurred while assigning the tenant. Please try again.'
            ]);
        }
    }

    public function getHousesByProperty(Property $property)
    {
        // Verify the property belongs to the landlord
        if ($property->user_id !== Auth::id()) {
            abort(403);
        }

        $houses = $property->houses()->where('is_occupied', false)->get();
        return response()->json($houses);
    }

    // Alternative method using POST request (more reliable)
    public function searchTenant(Request $request)
    {
        $request->validate([
            'uuid' => 'required|string'
        ]);

        $uuid = $request->input('uuid');

        try {
            $tenant = User::where('user_type', 'Tenant')
                ->where('uuid', $uuid)
                ->select(['id', 'uuid', 'name', 'email'])
                ->first();

            if (!$tenant) {
                return response()->json([
                    'success' => false,
                    'error' => 'Tenant not found with this ID'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'tenant' => $tenant
            ]);

        } catch (\Exception $e) {
            \Log::error("Error searching for tenant: " . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Server error while searching for tenant'
            ], 500);
        }
    }

    // NEW METHODS FOR TERMINATION AND HISTORY

    public function terminate(Request $request, HouseAssignment $assignment)
    {
        // Verify the assignment belongs to the landlord's property
        if ($assignment->house->property->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'vacate_reason' => 'required|string|max:255',
            'termination_notes' => 'nullable|string',
        ]);

        $assignment->terminate(
            $validated['vacate_reason'],
            $validated['termination_notes'],
            Auth::id()
        );

        return redirect()->back()
            ->with('success', 'Tenant assignment terminated successfully.');
    }

    public function history(House $house)
    {
        // Verify the house belongs to the landlord
        if ($house->property->user_id !== Auth::id()) {
            abort(403);
        }

        $assignments = $house->assignments()
            ->with(['user', 'terminatedBy'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('houses/AssignmentHistory', [
            'house' => $house,
            'assignments' => $assignments
        ]);
    }

    public function destroy(HouseAssignment $assignment)
    {
        // Verify the assignment belongs to the landlord's property
        if ($assignment->house->property->user_id !== Auth::id()) {
            abort(403);
        }

        $assignment->delete();

        return redirect()->back()
            ->with('success', 'Assignment record deleted successfully.');
    }
}