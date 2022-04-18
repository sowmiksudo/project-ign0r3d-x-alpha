@extends("layouts.app")
@section("content")
<div class="container-sm">
    @if ($pending->count() > 0)
    <h3 class="text-center">PENDING</h3>
    <table class="table table-hover">
        <thead class="text-center">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Amount</th>
                <th scope="col">BDT</th>
                <th scope="col">METHOD</th>
                <th scope="col">SENDER</th>
                <th scope="col">TRNX</th>
                <th scope="col">STATUS</th>
                <th scope="col">Time</th>
                <th scope="col">APPROVE</th>
                <th scope="col">REJECT</th>
            </tr>
        </thead>
        <tbody class="text-center">
            @forelse ($pending as $data)
            <tr>
                <td>{{ $data->id }}</td>
                <td>{{ $data->amount }}</td>
                <td>{{ $data->payment_money }}</td>
                <td>{{ $data->payment_method }}</td>
                <td>{{ $data->sender_number }}</td>
                <td>{{ $data->trnx_id }}</td>
                <td>{{ $data->status }}</td>
                <td>{{ $data->created_at }}</td>
                <td>
                    <form action="{{ route("admin.action") }}" method="POST">
                        @csrf
                        <input type="hidden" name="type" value="approve">
                        <input type="hidden" name="id" value="{{ $data->id }}">
                        <button type="submit" class="btn btn-sm btn-success">&#10004;</button>
                    </form>
                </td>
                <td>
                    <form action="{{ route("admin.action") }}" method="POST">
                        @csrf
                        <input type="hidden" name="type" value="reject">
                        <input type="hidden" name="id" value="{{ $data->id }}">
                        <button type="submit" class="btn btn-sm btn-success">&#10060;</button>
                    </form>
                </td>
            </tr>
            @empty
            <div class="alert alert-info">
                No records found.
            </div>
            @endforelse
        </tbody>
    </table>
    @else
    <div class="alert alert-info text-center">
        No pending requests
    </div>
    @endif
    <br>
    <hr>
    <br>
    <h3 class="text-center">ALL</h3>
    <table class="table table-hover">
        <thead class="text-center">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Amount</th>
                <th scope="col">BDT</th>
                <th scope="col">METHOD</th>
                <th scope="col">SENDER</th>
                <th scope="col">TRNX</th>
                <th scope="col">STATUS</th>
                <th scope="col">Time</th>
                <th scope="col">APPROVE</th>
                <th scope="col">REJECT</th>
            </tr>
        </thead>
        <tbody class="text-center">
            @forelse ($others as $data)
            <tr>
                <td>{{ $data->id }}</td>
                <td>{{ $data->amount }}</td>
                <td>{{ $data->payment_money }}</td>
                <td>{{ $data->payment_method }}</td>
                <td>{{ $data->sender_number }}</td>
                <td>{{ $data->trnx_id }}</td>
                <td>{{ $data->status }}</td>
                <td>{{ $data->created_at }}</td>
                <td>
                    <form action="{{ route("admin.action") }}" method="POST">
                        @csrf
                        <input type="hidden" name="type" value="approve">
                        <input type="hidden" name="id" value="{{ $data->id }}">
                        <button type="submit" class="btn btn-sm btn-success">&#10004;</button>
                    </form>
                </td>
                <td>
                    <form action="{{ route("admin.action") }}" method="POST">
                        @csrf
                        <input type="hidden" name="type" value="reject">
                        <input type="hidden" name="id" value="{{ $data->id }}">
                        <button type="submit" class="btn btn-sm btn-success">&#10060;</button>
                    </form>
                </td>
            </tr>
            @empty
            <div class="alert alert-info">
                No records found.
            </div>
            @endforelse
        </tbody>
    </table>
    {!! $others->links() !!}
</div>
@endsection
