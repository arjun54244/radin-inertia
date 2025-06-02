<?php

namespace App\Http\Controllers;

use App\Models\Correntaffer;
use Illuminate\Http\Request;

class CorrentafferController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $correntaffer = Correntaffer::first();
        return inertia('CurrentAffairs/corrent-affairs', [
            'correntaffer' => $correntaffer,
        ]);
    }

    public function show($file)
    {
        $file = Correntaffer::select($file)->first();
        return inertia('CurrentAffairs/language-affairs', [
            'file' => $file,
            'appurl' => env('APP_URL'),
        ]);
    }
}
