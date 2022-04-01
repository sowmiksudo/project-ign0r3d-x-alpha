<?php

namespace App\Http\Controllers;

use App\Models\Alert;
use App\Models\BlacklistedWords;
use App\Models\Bombing;
use App\Models\Message;
use App\Models\User;
use App\Models\Feedback;
use App\Models\Notification;
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
        $amount = Bombing::all()->sum("amount");
        $total_sms_sent = Message::all()->count();
        $verified = User::where("is_verified", 1)->get()->count();
        $banned = User::onlyTrashed()->count();
        $feedbacks = Feedback::all()->count();
        return view('home', [
            "total_users"=>$total_users,
            "total_bombing"=>$total_bombing,
            "total_sms"=>$total_sms_sent,
            "total_verified"=>$verified,
            "total_banned"=>$banned,
            "amount"=>$amount,
            "feedbacks"=>$feedbacks
        ]);
    }

    public function feedbacks(Request $request){
        $feedbacks = Feedback::orderBy("id", "desc")->paginate(50);
        return view('feedbacks', [
            "feedbacks"=>$feedbacks
        ]);
    }

    public function alerts(Request $request) {
        $alerts = Alert::orderBy("id", "desc")->paginate(50);
        return view("alerts", [
            "alerts"=>$alerts
        ]);
    }

    public function banned(Request $request){
        $bans = BlacklistedWords::all();
        return view('banned', [
            "words"=>$bans
        ]);
    }

    public function banned_delete(Request $request){
        $word = BlacklistedWords::findOrFail($request->id);
        $word->delete();
        return back();
    }

    public function banned_add(Request $request){
        $word = new BlacklistedWords();
        $word->word = $request->word;
        $word->save();
        return back();
    }

    public function notifications(Request $request){
        return view("notifications", [
            "notifications"=>Notification::all()
        ]);
    }

    public function notifications_add(Request $request){
        $item = new Notification();
        $item->message = $request->message;
        $item->action_link = $request->link;
        if($request->link === ""){
            $item->has_action_link = false;
        } else {
            $item->has_action_link = true;
        }
        $item->save();
        return back();
    }

    public function notifications_delete(Request $request){
        $item = Notification::findOrFail($request->id);
        $item->delete();
        return back();

    }
}

