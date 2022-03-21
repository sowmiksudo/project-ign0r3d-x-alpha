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
                        <th>Email</th>
                        <th>Number</th>
                        <th>Created</th>
                        <th>Role</th>
                        @can('user verify')
                        <th>VERIFY</th>
                        @endcan
                        @can("user ban")
                        <th>UN|BAN</th>
                        @endcan
                        <th>PROFILE</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($users as $user)
                    <tr>
                        <td>{{ $user->id }}</td>
                        <td>{{ $user->email }}</td>
                        <td>{{ $user->number }}</td>
                        <td>{{ \Carbon\Carbon::parse($user->created_at)->isoFormat("LLLL") }}</td>
                        <td>@foreach ($user->getRoleNames() as $role)
                            {{ $loop->first ? '' : ', ' }}
                            <span class="nice">{{ $role }}</span>
                            @endforeach
                        </td>
                        @can('user verify')
                        @if (!$user->is_verified)
                        <td><a href="/verify/{{ $user->id }}"><button class="btn btn-sm btn-primary">VERIFY</button></a>
                            @else
                        <td><button class="btn btn-sm btn-info">VERIFIED</button>
                        </td>
                        @endif
                        @endcan

                        @if (!$user->trashed())
                        <td><a href="/ban/{{ $user->id }}"><button class="btn btn-sm btn-primary">BAN</button></a></td>
                        @else
                        <td><a href="/unban/{{ $user->id }}"><button class="btn btn-sm btn-warning">UNBAN</button></a>
                        </td>
                        @endif


                        <td><a href="/user/{{ $user->id }}"><button class="btn btn-sm btn-primary">PROFILE</button></a>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
            <div class="d-flex justify-content-center">
                {!! $users->links() !!}
            </div>
        </div>
    </div>
</div>
@endsection
