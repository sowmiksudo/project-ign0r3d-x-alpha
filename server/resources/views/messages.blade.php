@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
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
