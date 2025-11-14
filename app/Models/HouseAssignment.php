<?php
// app/Models/HouseAssignment.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class HouseAssignment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'house_id',
        'user_id',
        'lease_start_date',
        'lease_end_date',
        'rent_amount',
        'payment_frequency',
        'security_deposit',
        'terms',
        'is_active',
        'vacated_at',
        'vacate_reason',
        'terminated_by',
        'termination_notes'
    ];

    protected $casts = [
        'lease_start_date' => 'date',
        'lease_end_date' => 'date',
        'rent_amount' => 'decimal:2',
        'security_deposit' => 'decimal:2',
        'is_active' => 'boolean',
        'vacated_at' => 'date',
    ];

    public function house(): BelongsTo
    {
        return $this->belongsTo(House::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function terminatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'terminated_by');
    }

    // Scope for active assignments
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // Scope for inactive (historical) assignments
    public function scopeInactive($query)
    {
        return $query->where('is_active', false);
    }

    // Method to terminate assignment
    public function terminate($reason = null, $notes = null, $terminatedBy = null)
    {
        $this->update([
            'is_active' => false,
            'vacated_at' => now(),
            'vacate_reason' => $reason,
            'termination_notes' => $notes,
            'terminated_by' => $terminatedBy ?? auth()->id(),
        ]);

        // Mark house as vacant
        $this->house->update(['is_occupied' => false]);

        return $this;
    }
}