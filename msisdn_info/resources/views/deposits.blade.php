@extends("layouts.app")
@section("content")
<div class="container-sm">
    <h3 class="text-center">INFO</h3>
    <table class="table table-hover">
        <thead class="text-center">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Amount</th>
                <th scope="col">BDT</th>
                <th scope="col">METHOD</th>
                <th scope="col">SENDER</th>
                <th scope="col">STATUS</th>
                <th scope="col">Time</th>
            </tr>
        </thead>
        <tbody class="text-center">
            @forelse ($deposits as $data)
            <tr>
                <td>{{ $data->id }}</td>
                <td>{{ $data->amount }}</td>
                <td>{{ $data->payment_money }}</td>
                <td>{{ $data->payment_method }}</td>
                <td>{{ $data->sender_number }}</td>
                <td>{{ $data->status }}</td>
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
