@extends("layouts.app")
@section("content")
<div class="container-sm d-flex flex-column align-items-center">
    <h3 class="text-muted">INFO</h3>
    <table class="table table-hover">
        <thead class="text-center">
            <tr>
                <th scope="col">Key</th>
                <th scope="col">Value</th>
            </tr>
        </thead>
        <tbody class="text-center">
            @foreach ($info as $column => $value)
            <tr>
                <td class="font-italic">{{ $column }}</td>
                <td class="fw-bold">{{ $value }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    <button class="btn btn-success">
        VIEW MORE
    </button>
</div>
@endsection
