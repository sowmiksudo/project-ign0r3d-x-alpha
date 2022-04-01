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
                            <th>Log</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>User</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($alerts as $alert)
                        <tr>
                            <td>{{ $alert->id }}</td>
                            <td style="max-width:200px; overflow:auto">{{ $alert->log }}</td>
                            <td>{{ $alert->user->name }}</td>
                            <td>{{ \Carbon\Carbon::parse($alert->created_at)->isoFormat("LLLL") }}</td>
                            <td><a href="/user/{{ $alert->user->id }}"><button
                                        class="btn btn-sm btn-success">PROFILE</button></a></td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            <div class="d-flex justify-content-center">
                {!! $alerts->links() !!}
            </div>
        </div>
    </div>
</div>
@endsection
