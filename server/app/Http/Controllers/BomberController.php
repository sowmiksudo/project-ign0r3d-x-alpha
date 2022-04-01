<?php

namespace App\Http\Controllers;

use App\Models\Blacklist;
use App\Models\User;
use App\Models\PublicApi;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BomberController extends Controller
{

    public function __construct()
    {
        $this->middleware("auth:api");
        $this->user = Auth::guard("api")->user();
    }


    public function profile(Request $request)
    {
        $user = $this->user;
        $bombings = $user->bombings;

        $total_bombing_sessions = $bombings->count();
        $total_sent = $bombings->sum('amount');

        return [
            "success" => true,
            "total_bombing_sessions" => $total_bombing_sessions,
            "total_otp_sent" => $total_sent,
            "profile" => $user
        ];
    }

    public function add(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "number" => "required|digits:10",
            "amount" => "required|integer|max:500",
        ]);

        if ($validator->fails()) {
            return [
                "success" => false,
                "message" => $validator->messages()->toArray()
            ];
        }

        if (Blacklist::where("number", $request->number)->first() !== null) {
            auth()->user()->alerts()->create([
                "log"=>"bombing on blacklisted number ".$request->number
            ]);
            return [
                "success" => false,
                "message" => "The number is blacklisted."
            ];
        }
        if (User::where("number", "0".$request->number)->first() !== null) {
            auth()->user()->alerts()->create([
                "log"=>"bombing on blacklisted number ".$request->number
            ]);
            return [
                "success" => false,
                "message" => "The number is blacklisted."
            ];
        }


        $count = $this->user->apis->count() + PublicApi::all()->count();

        $inserted = $this->user->bombings()->create([
            "number" => $request->number,
            "amount"=> $request->amount,
            "total_api_available" => $count,
            "ip" => $request->ip(),
            "userAgent" => $request->userAgent()
        ]);

        return $inserted ? [
            "success" => true,
            "message" => "Bombing started!"
        ] : [
            "success" => false,
            "message" => "Something went wrong on our side."
        ];
    }


    public function addBlacklist(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "number" => "required|digits:10|unique:blacklists",
            "note"=>"required|max:50"
        ]);

        if ($validator->fails()) {
            return [
                "success" => false,
                "message" => $validator->messages()->toArray()
            ];
        }

        $added = $this->user->blacklists()->create([
            "number" => $request->number,
            "note"=>$request->note
        ]);

        return $added ? [
            "success" => true,
            "message" => "Number successfully added to blacklist."
        ] :  [
            "success" => false,
            "message" => "Something went wrong on our side."
        ];
    }


    public function history(Request $request){
        return [
            "success"=>true,
            "bombings"=>$this->user->bombings
        ];
    }

    public function showBlacklist(){
        return [
            "success"=>true,
            "blacklists"=>$this->user->blacklists
        ];
    }

    public function deleteBlacklist(Request $request){
        $entry = Blacklist::find($request->id);
        if($entry === null){
            return [
                "success"=>false,
                "message"=>"NOT FOUND"
            ];
        }

        $deleted = $entry->delete();
        return [
            "success"=>true,
            "message"=>"Deleted successfully."
        ];
    }
}
