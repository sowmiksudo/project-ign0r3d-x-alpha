@extends("layouts.app")
@section("content")
<div class="container-sm d-flex flex-column align-items-center">
    <h3 class="text-muted">Blacklist</h3>
    <form method="POST">
        @csrf
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Number</label>
            <input type="text" name="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="01819400400">
        </div>
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Number</label>
            <textarea type="text" name="note" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                placeholder="Note to this number"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <hr>
    <ul class="list-group">
        @forelse ($blacklists as $item)
        <li class="list-group-item">{{ $item->number }} - {{ $item->note }} |
            <form method="POST">
                @csrf
                @method('DELETE')
                <input type="hidden" name="id" value="{{ $item->id }}">
                <button class="btn btn-sm btn-danger">REMOVE</button>
            </form>
        </li>
        @empty
        <p class="text-danger">No blacklisted numbers</p>
        @endforelse
    </ul>
</div>
@endsection
