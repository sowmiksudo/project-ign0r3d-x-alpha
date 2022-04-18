@extends('layouts.app')

@section('content')
<div class="container-sm">
<div class="row justify-content-center">
    <div class="card col-4 m-2 text-center">
        <div class="card-body">
            <p class="text-danger">PENDING</p>
            <h1 class="fw-bold text-danger">{{ $pending }}</h1>
        </div>
    </div>
    <div class="card col-4 m-2 text-center">
        <div class="card-body">
            <p class="text-muted">APPROVED</p>
            <h1 class="fw-bold">{{ $approved }}</h1>
        </div>
    </div>
    <div class="card col-4 m-2 text-center">
        <div class="card-body">
            <p class="text-muted">REJECTED</p>
            <h1 class="fw-bold">{{ $rejected }}</h1>
        </div>
    </div>
    <div class="card col-4 m-2 text-center">
        <div class="card-body">
            <p class="text-muted">TOTAL DEPOSIT</p>
            <h1 class="fw-bold">{{ $deposit }}</h1>
        </div>
    </div>
    <div class="card col-4 m-2 text-center">
        <div class="card-body">
            <p class="text-muted">TOTAL USED TOKEN</p>
            <h1 class="fw-bold">{{ $used }}</h1>
        </div>
    </div>
    <div class="card col-4 m-2 text-center">
        <div class="card-body">
            <p class="text-muted">TOTAL BALANCE RESERVED</p>
            <h1 class="fw-bold">{{ $reserve }}</h1>
        </div>
    </div>
    <div class="card col-4 m-2 text-center">
        <div class="card-body">
            <p class="text-muted">TOTAL MONEY EARNED</p>
            <h1 class="fw-bold">{{ $money }}</h1>
        </div>
    </div>
    <div class="card col-4 m-2 text-center">
        <div class="card-body">
            <p class="text-muted">TOTAL USER</p>
            <h1 class="fw-bold">{{ $user }}</h1>
        </div>
    </div>
</div>
</div>
@endsection
