<?php
// app/Http/Controllers/PropertyController.php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function index()
    {
        // Check if user is a landlord
        if (Auth::user()->user_type !== 'Landlord') {
            abort(403, 'Only landlords can access properties.');
        }

        $properties = Property::where('user_id', Auth::id())
            ->withCount(['houses as total_units', 'houses as occupied_units' => function($query) {
                $query->where('is_occupied', true);
            }])
            ->get();

        return Inertia::render('properties/Index', [
            'properties' => $properties
        ]);
    }

    public function create()
    {
        // Check if user is a landlord
        if (Auth::user()->user_type !== 'Landlord') {
            abort(403, 'Only landlords can create properties.');
        }

        return Inertia::render('properties/Create');
    }

    public function store(Request $request)
    {
        // Check if user is a landlord
        if (Auth::user()->user_type !== 'Landlord') {
            abort(403, 'Only landlords can create properties.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'no_of_floors' => 'required|integer|min:1',
            'lift_stairs' => 'required|in:lift,stairs,both',
            'electricity_account' => 'nullable|string|max:255',
            'water_charges_account' => 'nullable|string|max:255',
        ]);

        // Use the authenticated user's ID
        $validated['user_id'] = Auth::id();

        Property::create($validated);

        return redirect()->route('properties.index')
            ->with('success', 'Property added successfully!');
    }

    public function show(Property $property)
    {
        // Verify the property belongs to the authenticated user and user is landlord
        if ($property->user_id !== Auth::id() || Auth::user()->user_type !== 'Landlord') {
            abort(403);
        }

        // Load houses with their active assignments and tenant user data
        $property->load(['houses.activeAssignment' => function($query) {
            $query->where('is_active', true);
        }, 'houses.activeAssignment.user']);

        $property->total_units = $property->houses->count();
        $property->occupied_units = $property->houses->where('is_occupied', true)->count();

        return Inertia::render('properties/Show', [
            'property' => $property
        ]);
    }
}