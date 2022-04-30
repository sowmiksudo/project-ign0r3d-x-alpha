@extends("layouts.app")
@section("content")
<div class="container-sm">
    <h3 class="text-center">INFO</h3>
    <table class="table table-hover">
        <thead class="text-center">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Number</th>
                <th scope="col">Balance</th>
                <th scope="col">Last Recharge</th>
                <th scope="col">Cost</th>
                <th scope="col">Time</th>
            </tr>
        </thead>
        <tbody class="text-center">
            @forelse ($history as $data)
            <tr>
                <td>{{ $data->id }}</td>
                <td>{{ $data->msisdn }}</td>
                <td>{{ $data->balance }}</td>
                <td>{{ $data->last_recharge }}</td>
                <td>{{ $data->cost }}</td>
                <td>{{ $data->created_at }}</td>
            </tr>
            @empty
            <div class="alert alert-info">
                No records found.
            </div>
            @endforelse
        </tbody>
    </table>
</div>
@endsection
