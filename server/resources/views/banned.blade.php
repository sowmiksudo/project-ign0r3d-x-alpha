@extends('layouts.app')

@section('content')
<div class="container-sm">
    <div class="row justify-content-center">
        <div class="col-6">
            <div class="m-3">
                <form action="" method="POST" class="d-flex">
                    @csrf
                    <input type="text" class="form-control" name="word" placeholder="Add another word">
                    <button class="mx-1 btn btn-primary" type="submit">ADD</button>
                </form>
            </div>
            <ul class="list-group">
                @foreach ($words as $word)
                <li class="list-group-item d-flex justify-content-between">
                    {{ $word->word }}
                    <a href="/banned/delete/{{ $word->id }}"><button class="btn btn-primary btn-sm">DELETE</button></a>
                </li>
                @endforeach
            </ul>
        </div>
    </div>
</div>
@endsection
