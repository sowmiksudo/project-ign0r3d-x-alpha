@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>
                <div class="card-body">
                    @if (session('status'))
                    <div class="alert alert-success" role="alert">
                        {{ session('status') }}
                    </div>
                    @endif
                    <p>Welcome {{ auth()->user()->name }}! ( @foreach (auth()->user()->getRoleNames() as $role)
                        {{ $role }}
                        @endforeach )</p>
                </div>
            </div>

            @can("view user stat")
            <section class="stats">
                <h3 class="text-center mb-2">STATISTICS</h3>
                <div class="row justify-content-center">
                    <div class="col-sm-12 col-md-4 col-lg-3 mb-3">
                        <div class="card">
                            <h6 class="text-center text-muted mt-2">TOTAL USERS</h6>
                            <h1 class="text-center" style="font-size: 500%">{{ $total_users }}</h1>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-4 col-lg-3 mb-3">
                        <div class="card">
                            <h6 class="text-center text-muted mt-2">VERIFIED</h6>
                            <h1 class="text-center" style="font-size: 500%">{{ $total_verified }}</h1>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-4 col-lg-3 mb-3">
                        <div class="card">
                            <h6 class="text-center text-muted mt-2">BANNED</h6>
                            <h1 class="text-center" style="font-size: 500%">{{ $total_banned }}</h1>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-4 col-lg-3 mb-3">
                        <div class="card">
                            <h6 class="text-center text-muted mt-2">TOTAL BOMBINGS</h6>
                            <h1 class="text-center" style="font-size: 500%">{{ $total_bombing }}</h1>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-4 col-lg-3 mb-3">
                        <div class="card">
                            <h6 class="text-center text-muted mt-2">TOTAL BOMBINGS AMOUNT</h6>
                            <h1 class="text-center" style="font-size: 500%">{{ $amount }}</h1>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-4 col-lg-3 mb-3">
                        <div class="card">
                            <h6 class="text-center text-muted mt-2">TOTAL MESSAGE SENT</h6>
                            <h1 class="text-center" style="font-size: 500%">{{ $total_sms }}</h1>
                        </div>
                    </div>
                    @can("view user stat")
                    <div class="col-sm-12 col-md-4 col-lg-3 mb-3">
                        <div class="card">
                            <h6 class="text-center text-muted mt-2">FEEDBACKS</h6>
                            <h1 class="text-center" style="font-size: 500%">{{ $feedbacks }}</h1>
                        </div>
                    </div>
                    @endcan
                </div>
            </section>
            @endcan
        </div>
    </div>
</div>
@endsection
