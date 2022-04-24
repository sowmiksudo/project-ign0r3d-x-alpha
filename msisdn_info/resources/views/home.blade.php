@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="card col-md-5 col-sm-12 m-2">
            <div class="card-body d-flex align-items-center flex-column">
                <h5 class="card-title">BALANCE</h5>
                <h1 class="card-text fw-bold">{{ $balance }}</h1>
            </div>
        </div>
        <div class="card col-md-5 col-sm-12 m-2">
            <div class="card-body d-flex align-items-center flex-column">
                <h5 class="card-title">TOTAL USED TOKEN</h5>
                <h1 class="card-text fw-bold">{{ $token }}</h1>
            </div>
        </div>
        <hr>
        <div class="col-12 d-flex align-items-center flex-column">
            <h2>GET INFO</h2>
            @if ($errors->any())
            <ul class="alert alert-danger px-5 my-1">
                @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
                @endforeach
            </ul>
            @endif
            @if ($balance === 0)
            <div class="alert alert-warning">
                আপনার একাউন্ট ব্যালেন্স ০। কোনো ইনফো বের করতে হলে টোকেন কিনতে হবে। টোকেন কিনতে উপরের ৩ডট মেনু থেকে ADD
                MONEY অপশনে গিয়ে স্টেপগুলো ফলো করুন।
            </div>
            @endif
            <form class="col-8" action="" method="POST">
                @csrf
                <div class="mb-3">
                    <label for="number" class="form-label">Robi/Airtel Number</label>
                    <input type="text" name="number" class="form-control" id="number" aria-describedby="help"
                        placeholder="01819400400">
                    <div id="help" class="form-text">শুধুমাত্র রবি/এয়ার্টেল নম্বর এর ইনফো বের করতে পারবেন। ভুল
                        নম্বর/অপারেটর দিলে ব্যালেন্স রিফান্ড করা হবেনা। </div>
                </div>
                <button type="submit" class="btn btn-danger w-100">GET INFO</button>
            </form>
            <div class="footer d-flex justify-content-center mt-3">
                <span class="pt-1">ADMIN CONTACT :: &nbsp;</span>
                <a href="https://facebook.com/ffsowmik" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30"
                        viewBox="0 0 30 30" style=" fill:#000000;">
                        <path
                            d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z">
                        </path>
                    </svg></a>
            </div>
        </div>
    </div>
</div>
@endsection
