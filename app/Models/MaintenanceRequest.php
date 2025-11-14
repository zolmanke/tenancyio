<?php
// app/Models/MaintenanceRequest.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaintenanceRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'house_assignment_id',
        'title',
        'description',
        'category',
        'priority',
        'status',
        'notes',
        'assigned_to',
        'completed_at',
    ];

    protected $casts = [
        'completed_at' => 'datetime',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function houseAssignment()
    {
        return $this->belongsTo(HouseAssignment::class);
    }

    // Scopes for easy querying
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeInProgress($query)
    {
        return $query->where('status', 'in_progress');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeHighPriority($query)
    {
        return $query->where('priority', 'high');
    }
}