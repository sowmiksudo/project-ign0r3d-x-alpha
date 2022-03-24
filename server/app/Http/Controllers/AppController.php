<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use App\Models\Setting;
use App\Models\Notification;
use Illuminate\Support\Facades\Validator;

class AppController extends Controller
{

    /**
     * Class constructor.
     */
    public function __construct()
    {
        $this->middleware("auth:api");
    }

    public function show(){
        return response()->json([
            "success"=>true,
            "settings"=>Setting::all()->first(),
            "notifications"=>Notification::all()
        ]);
    }

    public function feedback(Request $request){
        $validator = Validator::make($request->all(), [
            "title"=>"required|max:150",
            "message"=>"required|max:1000"
        ]);

        if($validator->fails()) {
            return [
                "success" => false,
                "message" => $validator->messages()->toArray()
            ];
        }

        auth()->user()->feedbacks()->create([
            "about"=>$request->title,
            "message"=>$request->message
        ]);

        return [
            "success"=>true,
            "message"=>"You feedback is noted. Thanks for your contribution."
        ];
    }

    public function showFeedback(){
        return auth()->user()->feedbacks;
    }
}

