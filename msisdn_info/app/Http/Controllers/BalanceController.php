<?php

namespace App\Http\Controllers;

use App\Models\Balance;
use App\Models\InfoNumberBlacklist;
use App\Models\SimInfoSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class BalanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function get(Request $request)
    {

        $request->validate([
            "number"=>"required"
        ]);

        $balance = auth()->user()->balance->balance;
        if ($balance < 1) {
            return back()->with("error", "আপনার একাউন্ট এ টোকেন নেই। টোকেন কিনতে উপরে ৩ডট এ ক্লিক করে ADD MONEY তে যান।");
        }

        if(InfoNumberBlacklist::all()->pluck("number")->contains($request->number)){
            return back()->with("error", "এই নাম্বার ব্লাকলিস্ট করা হয়েছে।");
        }

        $response = Http::withOptions(["verify"=>false])->get("https://rbarinfo.azurewebsites.net/info?msisdn=" . ltrim($request->number, "0"));

        $success = ($response->json("bl") !== null);

        if (!$success) {
            return back()->with([
                "error" => "নাম্বার ভুল অথবা রবি/এয়ারটেল অপারেটর না।"
            ]);
        }

        auth()->user()->balance()->update([
            "balance" => $balance - 1
        ]);

        $response = $response->json();

        auth()->user()->histories()->create([
            "msisdn" => $request->number,
            "balance" => $response['bl'],
            "last_recharge" => $response['lr'],
            "cost" => 1
        ]);

        return view("info", [
            'info' => [
                "NUMBER" => $request->number,
                "BALANCE" => $response['bl'],
                "COST" => "-1"
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Balance  $balance
     * @return \Illuminate\Http\Response
     */
    public function show(Balance $balance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Balance  $balance
     * @return \Illuminate\Http\Response
     */
    public function edit(Balance $balance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Balance  $balance
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Balance $balance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Balance  $balance
     * @return \Illuminate\Http\Response
     */
    public function destroy(Balance $balance)
    {
        //
    }
}
