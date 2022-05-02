<?php

namespace App\Http\Controllers;

use App\Models\Bombing;
use App\Models\Message;
use Illuminate\Http\Request;

class HistoryController extends Controller
{

    public function __construct()
    {
        $this->middleware(["auth","hasAdminAccess"]);
    }

    public function all(){
        $bombings = Bombing::all();
        $messages = Message::all();
        return view("histories")->with([
                "bombings"=>$bombings,
                "messages"=>$messages
        ]);
    }

    public function bombings(){
        $bombings = Bombing::orderBy("id", "DESC")->paginate(50);
        return view("bombings")->with([
            "bombings"=>$bombings
        ]);
    }
    public function messages(){
        $messages = Message::orderBy("id", "DESC")->paginate(50);
        return view("messages")->with([
            "messages"=>$messages
        ]);
    }
}
