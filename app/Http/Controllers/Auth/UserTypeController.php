<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserTypeController extends Controller
{
    public function show()
    {
        return Inertia::render('auth/SelectUserType');
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_type' => 'required|in:Tenant,Caretaker,Admin,Landlord,Agent',
        ]);

        $user = $request->user();
        $user->update(['user_type' => $request->user_type]);

        return redirect()->route('dashboard');
    }
}