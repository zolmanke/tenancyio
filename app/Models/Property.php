<?php
// app/Models/Property.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'no_of_floors',
        'lift_stairs',
        'electricity_account',
        'water_charges_account',
        'user_id' // Changed to user_id
    ];

    /**
     * Get the user that owns the property
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the houses for the property
     */
    public function houses(): HasMany
    {
        return $this->hasMany(House::class);
    }

    /**
     * Get the number of occupied units
     */
    public function getOccupiedUnitsAttribute(): int
    {
        return $this->houses()->where('is_occupied', true)->count();
    }

    /**
     * Get the total number of units
     */
    public function getTotalUnitsAttribute(): int
    {
        return $this->houses()->count();
    }

    /**
     * Scope a query to only include properties for a specific user
     */
    public function scopeForUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }
}