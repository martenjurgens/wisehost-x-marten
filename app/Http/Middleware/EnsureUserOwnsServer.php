<?php

namespace App\Http\Middleware;

use App\Models\Server;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserOwnsServer
{
    public function handle(Request $request, Closure $next): Response
    {
        $server = $request->route('server');


        if (!$server instanceof Server) {
            return response()->view('errors.404', [], 404);
        }

        if (Auth::id() !== $server->user_id) {
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
}
