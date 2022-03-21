@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="d-flex justify-content-center">
                <div class="card" style="max-width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title text-center">{{ $user->name }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted text-center">{{ $user->email }} | {{ $user->number }}
                        </h6>
                        @if ($user->is_verified)
                        <p class="text-center text-info">VERIFIED</p>
                        @endif
                        @if ($user->trashed())
                        <p class="text-center text-danger">BANNED</p>
                        @endif
                        <p class="card-text">
                        <div class="d-flex justify-content-center mb-2">
                            @can("demote")
                            <a href="/user/{{ $user->id }}/promote" class="card-link"><button
                                    class="btn btn-sm btn-warning">PROMOTE</button></a>
                            <a href="/user/{{ $user->id }}/demote" class="card-link"><button
                                    class="btn btn-sm btn-warning">DEMOTE</button></a>
                            @endcan
                        </div>
                        <table class="table table-bordered">
                            <tbody>
                                <tr>
                                    <td>ROLE</td>
                                    <td>{{ ($user->getRoleNames()->first() === null) ? "User" :
                                        $user->getRoleNames()->first() }}</td>
                                </tr>
                                <tr>
                                    <td>TOTAL SMS SENT</td>
                                    <td>{{ $user->messages->count() }}</td>
                                </tr>
                                <tr>
                                    <td>TOTAL BOMBING</td>
                                    <td>{{ $user->bombings->count() }}</td>
                                </tr>
                            </tbody>
                        </table>
                        </p>
                        <div class="d-flex justify-content-center">
                            @if (!$user->is_verified)
                            <a href="/verify/{{ $user->id }}" class="card-link"><button
                                    class="btn btn-sm btn-success">VERIFY</button></a>
                            @endif
                            @if(!$user->trashed())
                            <a href="/ban/{{ $user->id }}" class="card-link"><button
                                    class="btn btn-sm btn-danger">BAN</button></a>
                            @else
                            <a href="/unban/{{ $user->id }}" class="card-link"><button
                                    class="btn btn-sm btn-warning">UNBAN</button></a>
                            @endif
                        </div>
                    </div>
                    @can('user can edit')
                    <div class="d-flex justify-content-center">
                        <form method="POST" action="/user/{{ $user->id }}/update"
                            class="d-flex justify-content-center flex-column">
                            @csrf
                            <input type="text" class="form-control px-1 my-1" name="name" placeholder="Set new name"
                                value="{{ $user->name }}">
                            <input type="number" class="form-control px-1 my-1" name="number"
                                placeholder="Set new number" value="{{ $user->number }}">
                            <input type="email" class="form-control px-1 my-1" name="email" placeholder="Set new email"
                                value="{{ $user->email }}">
                            <button class="mt-2 btn btn-danger btn-sm" type="submit">CHANGE INFO</button>
                        </form>
                    </div>
                    <hr>
                    @endcan
                    @can('user can changePass')
                    <div class="d-flex justify-content-center">
                        <form method="POST" action="/user/{{ $user->id }}/newPass"
                            class="d-flex justify-content-center flex-column">
                            @csrf
                            <input type="text" class="form-control px-1" name="password" placeholder="Set new password">
                            <button class="my-2 btn btn-danger btn-sm" type="submit">CHANGE PASS</button>
                        </form>
                    </div>
                    @endcan
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
