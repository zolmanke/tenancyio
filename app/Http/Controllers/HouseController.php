<?php
// app/Http/Controllers/HouseController.php

namespace App\Http\Controllers;

use App\Models\House;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HouseController extends Controller
{
    public function create()
    {
        // Check if user is a landlord
        if (Auth::user()->user_type !== 'Landlord') {
            abort(403, 'Only landlords can add houses.');
        }

        // Only get properties that belong to the authenticated user
        $properties = Property::where('user_id', Auth::id())->get();

        return Inertia::render('houses/Create', [
            'properties' => $properties
        ]);
    }

    public function store(Request $request)
    {
        // Check if user is a landlord
        if (Auth::user()->user_type !== 'Landlord') {
            abort(403, 'Only landlords can add houses.');
        }

        $validated = $request->validate([
            'property_id' => 'required|exists:properties,id',
            'house_no' => 'required|string|max:50',
            'type' => 'required|string|max:100',
            'floor' => 'required|string|max:50',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        // Verify the property belongs to the authenticated user
        $property = Property::where('id', $validated['property_id'])
            ->where('user_id', Auth::id())
            ->firstOrFail();

        House::create($validated);

        if ($request->has('submit_and_add_another')) {
            return redirect()->route('houses.create')
                ->with('success', 'House added successfully! Add another house.');
        }

        return redirect()->route('properties.index')
            ->with('success', 'House added successfully!');
    }
}