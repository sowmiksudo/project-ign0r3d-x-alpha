@extends('layouts.app')

@section('content')
<div class="container-sm">
    <div class="justify-content-center">
        <div>
            <div class="d-flex justify-content-center">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title text-center">{{ $user->name }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted text-center">{{ $user->email }} | {{ $user->number }}
                        </h6>
                        <p class="card-text">
                        <table class="table table-bordered">
                            <tbody>
                                <tr>
                                    <td>TOTAL DEPOSITS</td>
                                    <td>{{ $user->deposits->sum("amount") }}</td>
                                </tr>
                                <tr>
                                    <td>TOTAL DEPOSIT SESSION</td>
                                    <td>{{ $user->deposits->count() }}</td>
                                </tr>
                                <tr>
                                    <td>TOTAL SEARCH</td>
                                    <td>{{ $user->histories->count() }}</td>
                                </tr>
                                <tr>
                                    <td>BALANCE</td>
                                    <td>{{ $user->balance->balance }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-2">
            <table class="table table-bordered col-lg-6 col-md-6 col-sm-12 text-center">
                <thead class="fw-bold">
                    <tr>
                        <td>Number</td>
                        <td>BL</td>
                        <td>LR</td>
                        <td>Time</td>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($user->histories as $item)
                    <tr>
                        <td>{{ $item->msisdn }}</td>
                        <td>{{ $item->balance }}</td>
                        <td>{{ $item->last_recharge }}</td>
                        <td>{{ \Carbon\Carbon::parse($item->created_at)->diffForHumans() }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
            <table class="table table-bordered col-lg-6 col-md-6 col-sm-12 text-center">
                <thead class="fw-bold">
                    <tr>
                        <td>Method</td>
                        <td>BDT</td>
                        <td>Tokens</td>
                        <td>TRNXID</td>
                        <td>STATUS</td>
                        <td>TIME</td>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($user->deposits as $item)
                    <tr>
                        <td>{{ $item->payment_method }}</td>
                        <td>{{ $item->payment_money }}</td>
                        <td>{{ $item->amount }}</td>
                        <td>{{ $item->trnx_id }}</td>
                        <td>{{ $item->status }}</td>
                        <td>{{ \Carbon\Carbon::parse($item->created_at)->diffForHumans() }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        <div class="col-12 d-flex justify-content-center">
            <form action="{{ route("admin.user.action", ["id"=>$user->id]) }}" method="post" class="d-flex flex-column align-items-center">
                @csrf
                <input type="hidden" name="action" value="change_balance">
                <input type="number" name="balance" id="" placeholder="New balance" class="form-control">
                <button class="btn btn-block btn-success mt-1" type="submit">SAVE</button>
            </form>

        </div>
    </div>
</div>
@endsection
