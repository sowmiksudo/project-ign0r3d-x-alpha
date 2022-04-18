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
        </div>
    </div>
</div>
@endsection
