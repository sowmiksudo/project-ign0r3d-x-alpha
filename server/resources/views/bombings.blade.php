@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="d-flex flex-row justify-content-between m-5">
                <div class="">
                    <form method="POST" action="/user/search">
                        @csrf
                        <div class="mb-2">
                            <label for="email" class="form-label">Search by Email</label>
                            <input type="hidden" name="searchBy" value="email">
                            <input type="email" name="email" class="form-control" id="email"
                                aria-describedby="emailHelp" placeholder="someone@gmail.com">
                        </div>
                        <button type="submit" class="btn btn-primary mx-auto">SEARCH</button>
                    </form>
                </div>
                <div class="">
                    <form method="POST" action="/user/search">
                        @csrf
                        <div class="mb-2">
                            <input type="hidden" name="searchBy" value="number">
                            <label for="number" class="form-label">Search by Number</label>
                            <input type="phone" name="number" class="form-control" id="number"
                                placeholder="01xxxxxxxxx">
                        </div>
                        <button type="submit" class="btn btn-primary mx-auto">SEARCH</button>
                    </form>
                </div>
            </div>

            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Number</th>
                        <th>Amount</th>
                        <th>SenderName</th>
                        <th>SenderEmail</th>
                        <th>SenderNumber</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($bombings as $bombing)
                    <tr>
                        <td>{{ $bombing->id }}</td>
                        <td>{{ $bombing->number }}</td>
                        <td>{{ $bombing->amount }}</td>
                        <td>{{ $bombing->user->name }}</td>
                        <td>{{ $bombing->user->email }}</td>
                        <td>{{ $bombing->user->number }}</td>
                        <td>{{ \Carbon\Carbon::parse($bombing->created_at)->isoFormat("LLLL") }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
            <div class="d-flex justify-content-center">
                {!! $bombings->links() !!}
            </div>
        </div>
    </div>
</div>
@endsection
