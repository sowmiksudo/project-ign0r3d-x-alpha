<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Balance;
use App\Models\Deposit;
use App\Models\History;
use Illuminate\Http\Request;
use App\Models\InfoNumberBlacklist;

class AdminPanelController extends Controller
{

    public function index()
    {
        return view("admin.index", [
            "deposit" => Deposit::all()->count(),
            "money" => Deposit::all()->sum("deposit_money"),
            "used" => History::all()->count(),
            "reserve" => Balance::all()->sum("balance"),
            "pending" => Deposit::where("status", "pending")->get()->count(),
            "approved" => Deposit::where("status", "approved")->get()->count(),
            "rejected" => Deposit::where("status", "rejected")->get()->count(),
            "user"=>Balance::all()->count()
        ]);
    }

    public function requests()
    {
        return view("admin.requests", [
            "pending" => Deposit::where("status", "pending")->get(),
            "others" => Deposit::where("status", "!=", "pending")->paginate(50),
        ]);
    }

    public function action(Request $request)
    {
        $request->validate([
            "type" => "required",
            "id" => "required"
        ]);

        switch ($request->input("type")) {
            case 'approve':
                Deposit::find($request->input("id"))->update([
                    "status" => "approved"
                ]);
                Deposit::find($request->input("id"))->user->balance()->update([
                    "balance"=> Deposit::find($request->input("id"))->user->balance->balance + Deposit::find($request->input("id"))->amount,
                ]);
                return back()->with("success", "Approved");
                break;
            case 'reject':
                Deposit::find($request->input("id"))->update([
                    "status" => "rejected"
                ]);
                return back()->with("success", "Rejected");
            default:
                break;
        }
    }


    public function blacklists(){
        return view("admin.blacklist", [
            "blacklists" => InfoNumberBlacklist::all()
        ]);
    }

    public function blacklists_add(Request $request){
        $request->validate([
            "number"=>"required"
        ]);
        InfoNumberBlacklist::create([
            "number"=>$request->number,
            "note"=>$request->note ?? ""
        ]);
        return back()->with("success", "Number blacklisted");
    }

    public function blacklists_delete(Request $request){
        $request->validate([
            "id"=>"required"
        ]);
        $deleted = InfoNumberBlacklist::find($request->id)->delete();
        return back()->with("success", "Number deleted");
    }

    public function users(){
        return view("admin.users", [
            "users"=>Balance::orderBy("balance", "desc")->with('user')->paginate(50)
        ]);
    }

    public function user(Request $request){
        return view("admin.user", [
            "user"=>User::find($request->id)
        ]);
    }

    public function user_action(Request $request){
        $request->validate([
            "action"=>"required"
        ]);

        switch ($request->input("action")) {
            case 'change_balance':
                User::find($request->id)->balance()->update([
                    "balance" => $request->input("balance")
                ]);
                return back()->with("success", "Balance updated");
                break;
            default:
                break;
        }
    }

}
