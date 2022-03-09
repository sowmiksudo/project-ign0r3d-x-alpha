<?php

namespace App\Http\Controllers;

use App\Models\Blacklist;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Bombing;
use Illuminate\Support\Facades\Validator;

class BomberController extends Controller
{

    public function api(Request $request){
        $user = Auth::guard("api")->user();
        $apis = json_decode($user->api->apis);

        return [
            "success"=>true,
            "user"=>$user,
            "api_json"=>$apis
        ];
    }


    public function profile(Request $request){
        $user = Auth::guard("api")->user();
        $bombings = $user->bombings;

        $total_bombing_sessions = $bombings->count();

        // dd($total_bombing);

        return [
            "success"=>true,
            "total_bombing_sessions"=>$total_bombing_sessions,
            "profile"=>$user
        ];

    }

    public function add(Request $request){
        $validator = Validator::make([
            "number"=>"required|digits:11|unique:blacklists"
        ]);

        if($validator->fails()){
            return [
                "success"=>false,
                "message"=>$validator->messages()->toArray()
            ];
        }
    }


    public function addBlacklist(Request $request){
        $validator = Validator::make([
            "number"=>"required|digits:11|unique:blacklists"
        ]);

        if($validator->fails()){
            return [
                "success"=>false,
                "message"=>$validator->messages()->toArray()
            ];
        }

        $user = Auth::guard("api")->user()->blacklists()->create([
            "number"=>$request->number
        ]);

        return $user->blacklists;

    }

}
