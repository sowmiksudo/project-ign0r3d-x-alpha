<?php

namespace App\Http\Controllers;

use App\Models\Deposit;
use App\Models\SimInfoSetting;
use Illuminate\Http\Request;

class DepositController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("deposits", [
            "deposits"=>Deposit::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $settings = SimInfoSetting::all()->first();
        if($settings->is_accepting_deposits === 0){
            return back()->with("error", "We are currently accepting no more payments.");
        }
        return view("deposit", [
            "bkash"=>$settings->bkash_number,
            "nagad"=>$settings->nagad_number,
            "rate"=>$settings->cost_per_search
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
        $settings = SimInfoSetting::all()->first();
        $request->validate([
            "trnxid"=>"required",
            "number"=>"required|digits:11",
            "method"=>"required",
            "package"=>"required"
        ]);

        auth()->user()->deposits()->create([
            "status"=>"pending",
            "trnx_id"=>$request->input("trnxid"),
            "payment_method"=>$request->input("method"),
            "payment_money"=>$request->input("package") * $settings->cost_per_search,
            "amount"=>$request->input("package"),
            "sender_number"=>$request->input("number")
        ]);
        return back()->with("success", "Your request has been noted. Admins will check and approve if all details are correct.");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Deposit  $deposit
     * @return \Illuminate\Http\Response
     */
    public function show(Deposit $deposit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Deposit  $deposit
     * @return \Illuminate\Http\Response
     */
    public function edit(Deposit $deposit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Deposit  $deposit
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Deposit $deposit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Deposit  $deposit
     * @return \Illuminate\Http\Response
     */
    public function destroy(Deposit $deposit)
    {
        //
    }
}
