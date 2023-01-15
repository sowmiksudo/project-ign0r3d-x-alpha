<?php

namespace App\Http\Controllers;

use App\Models\BlacklistedWords;
use App\Models\User;
use App\Models\Setting;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class XsmsController extends Controller
{

    public function __construct()
    {
        $this->middleware("auth:api", ["except" => ["login", "register"]]);
        $this->user = new User;
    }


    public function send_sms($message, $number)
    {
        $user = Auth::guard('api')->user();
        $url = ($user->is_verified === 1) ? "https://proxy.ignoredhaxor.xyz/index.php?user=mojib&number=$number&message=".urlencode($message) : "https://proxy.ignoredhaxor.xyz/index.php?user=mojib2&number=$number&message=".urlencode($message);
        $response = Http::withOptions(["verify" => false])->get($url);
        return $response->body();
    }

    public function config(Request $request)
    {
        return [
            "success" => true,
            "version" => "1.0-alpha",
            "notice" => "Hello there, this is a test notice."
        ];
    }


    public function send(Request $request)
    {
        if (Setting::all()->first()->is_under_maintanance) {
            return [
                "success" => false,
                "message" => "Please wait while we are adding some new feature, APIs are under maintanance."
            ];
        }

        $validator = Validator::make($request->all(), [
            "number" => "required|numeric|digits:11",
            "message" => "required|max:150"
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->toArray()
            ], 200);
        }

        $prohibited_words = BlacklistedWords::pluck("word")->toArray();
        $input = $request->message;
        $input_array = explode(' ', $input);
        $intersect = array_intersect($prohibited_words, $input_array);
        foreach ($intersect as $item) {

            auth()->user()->alerts()->create([
                "log"=>"message with $item"
            ]);

            return [
                "success"=>false,
                "message"=>"Message contains banned word."
            ];
        }


        $id = Auth::guard("api")->user()->id;
        $user = User::find($id);
        $sent_today = User::find($user->id)->messages()->whereDate('created_at', Carbon::today())->get()->count();
        $sent = User::find($user->id)->messages()->count();
        // if ($user->is_verified) {
        //     $limit = Setting::all()->first()->daily_limit_verified;
        // } else {
        //     $limit = Setting::all()->first()->daily_limit_non_verified;
        // }
        $limit = $user->limit;
        if ($sent >= $limit) {
            return [
                "success" => false,
                "message" => "Daily limit reached!"
            ];
        }

        $user->messages()->create([
            "number" => $request->number,
            "message" => $request->message,
            "ip" => $request->ip(),
            "user_agent" => $request->userAgent()
        ]);

        $user->limit = $user->limit - 1;
        $user->save();

        $number = $request->number;

        $message = ($user->is_verified === 1) ? $request->message : $request->message . "%0A%0ASent%20by%20MR%20TOOLS";


        $success = $this->send_sms($message, $number);

        if ($success) {
            return [
                "success" => $success,
                "message" => "Message was sent successfully."
            ];
        } else {
            return [
                "success" => $success,
                "message" => "Something went wrong on our side."
            ];
        }
    }

    public function history(Request $request)
    {
        $user = Auth::guard("api")->user();
        $messages = User::find($user->id)->messages;
        return [
            "success" => true,
            "data" => $messages
        ];
    }

    public function profile(Request $request)
    {
        $user = Auth::guard("api")->user();
        $messages = User::find($user->id)->messages();
        $sent_today = $messages->whereDate('created_at', Carbon::today())->get()->count();
        $all_time_count = $messages->count();
        // if ($user->is_verified) {
        //     $limit = Setting::all()->first()->daily_limit_verified;
        // } else {
        //     $limit = Setting::all()->first()->daily_limit_non_verified;
        // }
        $limit = $user->limit;

        return [
            "success" => true,
            "total_sent" => $all_time_count,
            "sms_sent_today" => $sent_today,
            "sms_left_today" => $limit,
            "total_daily_sms" => $limit,
            "is_verified" => ($user->is_verified === 0) ? false : true,
            "profile" => $user,
        ];
    }
}
