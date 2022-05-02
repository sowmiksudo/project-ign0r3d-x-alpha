@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <form action="" method="post" class="d-flex">
                @csrf
                <input type="text" class="form-control m-1" name="victim" placeholder="Victim (1810400400)" value="{{ $victim }}">
                <button class="btn btn-success m-1" type="submit">Search</button>
            </form>
            <hr>
            <h3 class="text-center">Bombings</h3>
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
            <hr>
            <h3 class="text-center">Messages</h3>
            <div class="">
                <table class="table table-bordered" style="">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Number</th>
                            <th>Message</th>
                            <th>SenderName</th>
                            <th>PROFILE</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($messages as $message)
                        <tr>
                            <td>{{ $message->id }}</td>
                            <td>{{ $message->number }}</td>
                            <td style="max-width:200px; overflow:auto">{{ $message->message }}</td>
                            <td>{{ $message->user->name }}</td>
                            <td><a href="/user/{{ $message->user->id }}"><button
                                        class="btn btn-sm btn-success">PROFILE</button></a></td>
                            <td>{{ \Carbon\Carbon::parse($message->created_at)->isoFormat("LLLL") }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            <div class="d-flex justify-content-center">
                {!! $messages->links() !!}
            </div>
        </div>
    </div>
</div>
@endsection
