<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    {{ config('app.name', 'Laravel') }}
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    @if (Auth::check())
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                            <a class="nav-link {{ Route::is("dashboard") ? 'active' : '' }}" href="/dashboard">
                                Dashboard
                            </a>
                        </li>
                        @can('user verify')
                        <li class="nav-item">
                            <a class="nav-link {{ Route::is("users") ? 'active' : '' }}" href="/users">
                                Users
                            </a>
                        </li>
                        @endcan
                        @can('view bombing stat')
                        <li class="nav-item">
                            <a class="nav-link {{ Route::is("bombings") ? 'active' : '' }}" href="/history/bombings">
                                Bombings
                            </a>
                        </li>
                        @endcan
                        @can('view sms stat')
                        <li class="nav-item">
                            <a class="nav-link {{ Route::is("messages") ? 'active' : '' }}" href="/history/messages">
                                Messages
                            </a>
                        </li>
                        @endcan
                        @can('view sms stat')
                        <li class="nav-item">
                            <a class="nav-link {{ Route::is("feedbacks") ? 'active' : '' }}" href="/feedbacks">
                                Feedbacks
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link {{ Route::is("alerts") ? 'active' : '' }}" href="/alerts">
                                Alerts
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link {{ Route::is("banned") ? 'active' : '' }}" href="/banned">
                                Banned Words
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link {{ Route::is("notifications") ? 'active' : '' }}" href="/notifications">
                                Notifications
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link {{ Route::is("search") ? 'active' : '' }}" href="{{ route("search") }}">
                                Search
                            </a>
                        </li>
                        @endcan
                    </ul>
                    @endif

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ms-auto">
                        <!-- Authentication Links -->
                        @guest
                        @if (Route::has('login'))
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                        </li>
                        @endif
                        @else
                        <li class="nav-item dropdown">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                {{ Auth::user()->name }}
                            </a>

                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="{{ route('logout') }}"
                                    onclick="event.preventDefault();document.getElementById('logout-form').submit();">
                                    {{ __('Logout') }}
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                    @csrf
                                </form>
                            </div>
                        </li>
                        @endguest
                    </ul>
                </div>
            </div>
        </nav>

        <main class="py-4 container-sm">
            @auth
            <h3 class="text-center mt-4">SEARCH USER</h3>
            <hr>
            <div class="d-flex flex-row justify-content-between">
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
            <hr>
            @endauth
            @yield('content')
        </main>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jscroll/2.4.1/jquery.jscroll.min.js"></script>
    @yield("scripts")
</body>

</html>
