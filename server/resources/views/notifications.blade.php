@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="m-3 col-10">
            <form action="" method="POST" class="d-flex flex-column">
                @csrf
                <textarea type="text" class="form-control m-1" name="message" placeholder="Add another notification"></textarea>
                <input type="text" class="form-control m-1" name="link" placeholder="message link">
                <button class="mx-1 btn btn-primary my-2" type="submit">PUSH</button>
            </form>
        </div>
        @foreach ($notifications as $item)
        <div class="card m-2 col-lg-4 col-md-4 col-sm-12">
            <div class="card-body d-flex justify-content-center flex-column">
                <h6 class="card-subtitle mb-2 text-muted">{{ $item->id }}</h6>
                <p class="card-text">{{ $item->message }}</p>
                <p class="text-muted">{{ $item->created_at }}</p>
                @if ($item->has_action_link)
                <a href="{{ $item->action_link }}" class="mb-2">{{ $item->action_link }}</a>
                @endif
                <a href="/notifications/delete/{{ $item->id }}" class="card-link"><button class="btn btn-sm btn-danger">DELETE</button></a>
            </div>
        </div>
        @endforeach
    </div>
</div>
@endsection
