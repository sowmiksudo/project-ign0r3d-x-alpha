<?php

namespace App\Http\Controllers;

use App\Models\Bombing;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(["auth", "hasAdminAccess"]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {

        $total_users = User::withTrashed()->count();
        $total_bombing = Bombing::all()->count();
        $total_sms_sent = Message::all()->count();
        $verified = User::where("is_verified", 1)->get()->count();
        $banned = User::onlyTrashed()->count();
        return view('home', [
            "total_users"=>$total_users,
            "total_bombing"=>$total_bombing,
            "total_sms"=>$total_sms_sent,
            "total_verified"=>$verified,
            "total_banned"=>$banned
        ]);
    }
}
