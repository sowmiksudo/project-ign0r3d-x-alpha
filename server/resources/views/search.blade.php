@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <form action="" method="post" class="d-flex">
                @csrf
                <input type="text" class="form-control m-1" name="victim" placeholder="Victim (1810400400)">
                <button class="btn btn-success m-1" type="submit">Search</button>
            </form>
        </div>
    </div>
</div>
@endsection
