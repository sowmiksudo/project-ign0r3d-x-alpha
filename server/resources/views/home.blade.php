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

            <h3 class="text-center mt-4">SEARCH USER</h3>
            <hr>
            <div class="d-flex flex-row justify-content-between">
                <div class="">
                    <form method="POST" action="/user/search">
                        @csrf
                        <div class="mb-2">
                            <label for="email" class="form-label">Search by Email</label>
                            <input type="hidden" name="searchBy" value="email">
                            <input type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp"
                                placeholder="someone@gmail.com">
                        </div>
                        <button type="submit" class="btn btn-primary mx-auto">SEARCH</button>
                    </form>
                </div>
                <div class="">
                    <form method="POST" action="/user/search">
                        @csrf
                        <div class="mb-2">
                            <input type="hidden" name="searchBy" value="number">
                            <label for="number" class="form-label">Search by Number</label>
                            <input type="phone" name="number" class="form-control" id="number" placeholder="01xxxxxxxxx">
                        </div>
                        <button type="submit" class="btn btn-primary mx-auto">SEARCH</button>
                    </form>
                </div>
            </div>
            <hr>

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
                            <h6 class="text-center text-muted mt-2">TOTAL MESSAGE SENT</h6>
                            <h1 class="text-center" style="font-size: 500%">{{ $total_sms }}</h1>
                        </div>
                    </div>

                </div>
            </section>
            @endcan
        </div>
    </div>
</div>
@endsection
