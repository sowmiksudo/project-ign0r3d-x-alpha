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
                            <th>Title</th>
                            <th>Message</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>User</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($feedbacks as $feedback)
                        <tr>
                            <td>{{ $feedback->id }}</td>
                            <td>{{ $feedback->about }}</td>
                            <td style="max-width:200px; overflow:auto">{{ $feedback->message }}</td>
                            <td>{{ $feedback->user->name }}</td>
                            <td>{{ \Carbon\Carbon::parse($feedback->created_at)->isoFormat("LLLL") }}</td>
                            <td><a href="/user/{{ $feedback->user->id }}"><button
                                        class="btn btn-sm btn-success">PROFILE</button></a></td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            <div class="d-flex justify-content-center">
                {!! $feedbacks->links() !!}
            </div>
        </div>
    </div>
</div>
@endsection
