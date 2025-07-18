<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Address;

class AddressController extends Controller
{
    public function storeOrUpdate(Request $request, $id = null)
    {
        $validated = $request->validate([
            'address_line1' => 'required|string|max:255',
            'address_line2' => 'nullable|string|max:255',
            'city'          => 'required|string|max:100',
            'state'         => 'required|string|max:100',
            'zip_code'      => 'required|string|max:20',
            'country'       => 'required|string|max:100',
            'phone'         => 'required|string|max:20',
            'is_default'    => 'nullable|boolean',
        ]);

        $user = $request->user();

        // Set default to false if not passed
        $validated['is_default'] = $request->boolean('is_default');

        // If setting this address as default, unset others first
        if ($validated['is_default']) {
            $user->addresses()->update(['is_default' => false]);
        }

        if ($id === 'new') {
            $address = $user->addresses()->create($validated);
        } else {
            $address = $user->addresses()->where('id', $id)->firstOrFail();
            $address->update($validated);
        }

        return redirect()->back()->with('success', 'Address saved successfully.');
    }

    public function destroy(Request $request, $id)
    {
        $request->user()->addresses()->where('id', $id)->delete();
        return redirect()->back()->with('success', 'Address deleted.');
    }
}
