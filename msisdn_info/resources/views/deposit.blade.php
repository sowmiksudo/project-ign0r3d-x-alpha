@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-12 d-flex align-items-center flex-column">
            <h2>ADD BALANCE</h2>
            @if ($error = Session::get("error"))
            <div class="alert alert-danger">
                {{ Session::get("error") }}
            </div>
            @endif
            <div class="col-6 card">
                <div class="card-body border border-warning">
                    বিকাশ নম্বর ({{ $bkash }}) এবং নগদ নম্বর ({{ $nagad }})। অবশ্যই পার্সনাল একাউন্ট থেকে সেন্ড মানি
                    করতে হবে। রেফারেন্স এ <strong>{{ str_pad(auth()->user()->id, 4, '0', STR_PAD_LEFT) }}</strong> দিতে
                    হবে।
                </div>
            </div>
            <form class="col-8" action="/add" method="POST">
                @csrf
                @if ($errors->any())
                <ul class="alert alert-danger px-5 my-1">
                    @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                    @endforeach
                </ul>
                @endif
                <div class="mb-3">
                    <label for="number" class="form-label">Transaction ID</label>
                    <input type="text" name="trnxid" class="form-control" id="trnxid" aria-describedby="help"
                        placeholder="5H7Y5N2PON">
                    <div id="help" class="form-text">ভুল ইনফো দিলে ব্যালেন্সসহ একাউন্ট ব্লোক করা হবে।</div>
                </div>
                <div class="mb-3">
                    <label for="number" class="form-label">Sender Number</label>
                    <input type="number" name="number" class="form-control" id="number" aria-describedby="help"
                        placeholder="01819400400">
                    <div id="help" class="form-text">যে নম্বর থেকে টাকা পাঠিয়েছেন সেই নম্বর।</div>
                </div>
                <select class="form-select mb-3" aria-label="Select Payment Method" name="method">
                    <option selected value=""> -- Payment Method --</option>
                    <option value="bkash">Bkash</option>
                    <option value="nagad">Nagad</option>
                </select>
                <select class="form-select mb-3" aria-label="Select Package" name="package" id="package">
                    <option value=""> -- Package --</option>
                    <option value="5" selected>5 INFO TOKEN</option>
                    <option value="10">10 INFO TOKEN</option>
                    <option value="20">20 INFO TOKEN</option>
                    <option value="100">100 INFO TOKEN</option>
                    <option value="200">200 INFO TOKEN</option>
                </select>
                <div class="alert alert-warning text-center">
                    উপরে দেয়া যেকোনো নম্বরে <strong id="money"></strong> টাকা <i>সেন্ড মানি</i> করবেন।
                </div>
                <button type="submit" class="btn btn-danger w-100 mx-auto">REQUEST APPROVAL</button>
            </form>
        </div>
    </div>
</div>
@endsection

@section("scripts")
<script>
    $(()=>{
        $("#money").text(5 * {{ $rate }})
        $("#package").on("change", function(e){
            $("#money").text(e.target.value * {{ $rate }})
        })
    });
</script>
@endsection
