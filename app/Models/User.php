<?php

namespace App\Models;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    protected $fillable = [
        'uuid',
        'name',
        'email',
        'password',
        'user_type',
    ];

    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }


// Add these relationships to your User model
public function tenantAssignments()
{
    return $this->hasMany(HouseAssignment::class, 'user_id');
}

public function currentAssignment()
{
    return $this->hasOne(HouseAssignment::class, 'user_id')->active();
}

// Scope to get only tenants
public function scopeTenants($query)
{
    return $query->where('user_type', 'tenant');
}

    /**
     * Automatically generate a short, readable UUID when creating a user.
     * Example: LND-4832 or TEN-9271
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            if (empty($user->uuid)) {
                // Choose prefix based on user type
                $prefix = match ($user->user_type) {
                    'landlord' => 'LND',
                    'tenant' => 'TEN',
                    default => 'TNC',
                };

                do {
                    $uuid = $prefix . '-' . random_int(100000, 999999);
                } while (self::where('uuid', $uuid)->exists());

                $user->uuid = $uuid;
            }
        });
    }
}
