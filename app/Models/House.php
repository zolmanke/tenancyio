<?php
// app/Models/House.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class House extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'house_no',
        'type',
        'floor',
        'price',
        'description',
        'is_occupied'
    ];

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }

    public function activeAssignment(): HasOne
    {
        return $this->hasOne(HouseAssignment::class)->active();
    }

    public function assignments()
    {
        return $this->hasMany(HouseAssignment::class);
    }

    public function currentTenant()
    {
        return $this->hasOneThrough(
            User::class,
            HouseAssignment::class,
            'house_id', 
            'id', 
            'id',
            'user_id'
        )->where('house_assignments.is_active', true);
    }
}