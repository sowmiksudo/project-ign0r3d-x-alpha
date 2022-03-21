<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;
use App\Models\Notification;

class AppController extends Controller
{

    /**
     * Class constructor.
     */
    public function __construct()
    {
        $this->middleware("auth:api");
        $this->user = auth()->user();
    }

    public function show(){
        return response()->json([
            "success"=>true,
            "settings"=>Setting::all()->first(),
            "notifications"=>Notification::all()
        ]);
    }
}
