<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\Bombing;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Hash;

class UserController extends BaseController
{

    function __construct()
    {
        $this->middleware(["auth", "hasAdminAccess"]);
    }

    public function all()
    {
        $users = User::withTrashed()->orderBy("id", 'desc')->paginate(50);
        return view("users", [
            "users" => $users
        ]);
    }

    public function show(Request $request)
    {

        $user = User::withTrashed()->findOrFail($request->id);
        return view("user", [
            "user" => $user
        ]);
    }


    public function search(Request $request)
    {
        if ($request->searchBy === "email") {
            $user = User::where("email", $request->email)->get()->first();
        } else {
            $user = User::where("number", $request->number)->get()->first();
        }

        if ($user === null) {
            return back()->with([
                "error" => "User not found"
            ]);
        }

        return redirect("/user/" . $user->id);
    }


    public function verify(Request $request)
    {
        $user = User::findOrFail($request->id);
        $user->is_verified = 1;
        $user->save();
        return back();
    }

    public function ban(Request $request)
    {
        $user = User::findOrFail($request->id);
        if ($user->hasRole(["Super Admin", "Moderator"])) {
            return abort(406, "You can't do this action.");
        }
        User::destroy($user->id);
        return back();
    }
    public function unban(Request $request)
    {
        $user = User::withTrashed()->findOrFail($request->id);
        $user->restore();
        return back();
    }

    public function update(Request $request)
    {

        abort_unless(auth()->user()->can("user edit"), 403);
        $user = User::findOrFail($request->id);
        if ($user->hasRole(["Super Admin", "Moderator"])) {
            return abort(406, "You can't do this action.");
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->number = $request->number;
        $saved = $user->save();
        return back();
    }

    public function changePass(Request $request)
    {
        abort_unless(auth()->user()->can("user changePass"), 403);
        $user = User::findOrFail($request->id);
        if ($user->hasRole(["Super Admin", "Moderator"])) {
            return abort(406, "You can't do this action.");
        }
        $user->password = Hash::make($request->password);
        $user->save();
        return back();
    }


    public function promote(Request $request)
    {
        abort_unless(auth()->user()->can("promote"), 403);
        $user = User::findOrFail($request->id);
        $user->assignRole("moderator");
        return back();
    }

    public function demote(Request $request)
    {
        abort_unless(auth()->user()->can("demote"), 403);
        $user = User::findOrFail($request->id);
        $user->removeRole("moderator");
        return back();
    }

    public function messages(Request $request){
        $messages = User::withTrashed()->find($request->id)->messages()->paginate(50);
        return view("messages", [
            "messages"=>$messages
        ]);
    }

    public function bombings(Request $request){
        $bombings = User::withTrashed()->find($request->id)->bombings()->paginate(50);
        return view("bombings", [
            "bombings"=>$bombings
        ]);
    }
    public function alerts(Request $request){
        $alerts = User::withTrashed()->find($request->id)->alerts()->paginate(50);
        return view("alerts", [
            "alerts"=>$alerts
        ]);
    }
    public function feedbacks(Request $request){
        $feedbacks = User::withTrashed()->find($request->id)->feedbacks()->paginate(50);
        return view("feedbacks", [
            "feedbacks"=>$feedbacks
        ]);
    }

}
