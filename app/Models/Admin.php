<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Filament\Models\Contracts\FilamentUser;

class Admin extends Authenticatable implements FilamentUser
{
    use Notifiable;

    protected $table = 'admins'; // Ensure the correct table is set

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function canAccessFilament(): bool
    {
        return true; // Allow all admins to access Filament
    }

    public function canAccessPanel(\Filament\Panel $panel): bool
    {
        return true; // Allow all admins to access the panel
    }
}
