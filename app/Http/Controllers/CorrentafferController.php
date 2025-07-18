<?php

namespace App\Http\Controllers;

use App\Models\Correntaffer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class CorrentafferController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $timeout =  env('CACHE_TIMEOUT');

        $correntaffer = Cache::remember('correntaffer_first', $timeout, function () {
            return Correntaffer::first();
        });

        return inertia('CurrentAffairs/corrent-affairs', [
            'correntaffer' => $correntaffer,
        ]);
    }

    public function show($file)
    {
         $timeout =  env('CACHE_TIMEOUT');
        $cacheKey = "correntaffer_column_{$file}";

        $data = Cache::remember($cacheKey, $timeout, function () use ($file) {
            return Correntaffer::select($file)->first();
        });
        return inertia('CurrentAffairs/language-affairs', [
            'file' => $data,
            'appurl' => env('APP_URL'),
        ]);
    }
}
