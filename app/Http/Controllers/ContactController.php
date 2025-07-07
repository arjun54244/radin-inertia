<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Mail\ContactSubmitted;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'subject' => 'nullable|string|max:255',
            'comments' => 'required|string',
        ]);

        $contact = Contact::create($data);

        Mail::to(env('MAIL_FROM_ADDRESS'))->send(new ContactSubmitted($contact));

        return redirect()->back()->with('success', 'Your message has been sent successfully!');
    }
}
