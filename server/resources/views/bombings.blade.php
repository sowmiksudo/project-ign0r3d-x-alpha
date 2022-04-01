@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">

            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Number</th>
                        <th>Amount</th>
                        <th>SenderName</th>
                        <th>Date</th>
                        <th>Profile</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($bombings as $bombing)
                    <tr>
                        <td>{{ $bombing->id }}</td>
                        <td>{{ $bombing->number }}</td>
                        <td>{{ $bombing->amount }}</td>
                        <td>{{ $bombing->user->name }}</td>
                        <td>{{ \Carbon\Carbon::parse($bombing->created_at)->isoFormat("LLLL") }}</td>
                        <td><a href="/user/{{ $bombing->user->id }}"><button
                            class="btn btn-sm btn-success">PROFILE</button></a></td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
            <div class="d-flex justify-content-center">
                {!! $bombings->links() !!}
            </div>
        </div>
    </div>
</div>
@endsection
