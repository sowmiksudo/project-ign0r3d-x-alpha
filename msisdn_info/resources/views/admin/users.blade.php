@extends("layouts.app")
@section("content")
<div class="container-sm">
    <h3 class="text-center">PENDING</h3>
    <table class="table table-hover table-bordered table-condensed">
        <thead class="text-center">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Number</th>
                <th scope="col">Email</th>
                <th scope="col">Balance</th>
                <th scope="col">Searches</th>
                <th scope="col">Bought</th>
                <th scope="col">Deposits</th>
                <th scope="col">Pending</th>
                <th scope="col">Approved</th>
                <th scope="col">Rejected</th>
                <th scope="col">Profile</th>
            </tr>
        </thead>
        <tbody class="text-center">
            @forelse ($users as $data)
            <tr>
                <td>{{ $data->user->id }}</td>
                <td>{{ $data->user->name }}</td>
                <td>{{ $data->user->number }}</td>
                <td>{{ $data->user->email }}</td>
                <td>{{ $data->balance }}</td>
                <td>{{ $data->user->histories->count() }}</td>
                <td>{{ $data->user->deposits->sum("amount") }}</td>
                <td>{{ $data->user->deposits->count() }}</td>
                <td>{{ $data->user->deposits()->where("status", "pending")->count() }}</td>
                <td>{{ $data->user->deposits()->where("status", "approved")->count() }}</td>
                <td>{{ $data->user->deposits()->where("status", "rejected")->count() }}</td>
                <td><a href="{{ route("admin.user", ["id"=>$data->id]) }}"><button class="btn btn-sm btn-success">PROFILE</button></a></td>
                {{-- <td>
                    <form action="{{ route(" admin.action") }}" method="POST">
                        @csrf
                        <input type="hidden" name="type" value="approve">
                        <input type="hidden" name="id" value="{{ $data->id }}">
                        <button type="submit" class="btn btn-sm btn-success">&#10004;</button>
                    </form>
                </td>
                <td>
                    <form action="{{ route(" admin.action") }}" method="POST">
                        @csrf
                        <input type="hidden" name="type" value="reject">
                        <input type="hidden" name="id" value="{{ $data->id }}">
                        <button type="submit" class="btn btn-sm btn-success">&#10060;</button>
                    </form>
                </td> --}}
            </tr>
            @empty
            <div class="alert alert-info">
                No records found.
            </div>
            @endforelse
        </tbody>
    </table>
    {!! $users->links() !!}
</div>
@endsection
