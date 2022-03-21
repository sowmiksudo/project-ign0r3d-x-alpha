<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (!$request->expectsJson()) {
            return redirect()->route("login");
        }
    }

    protected function unauthenticated($request, array $guards)
    {

        if (!$request->expectsJson()) {
            abort(redirect()->route("login"));
        } else
            abort(response()->json([
                'success' => false,
                'message' => 'You need to be authenticated.',
            ], 200));
    }
}
