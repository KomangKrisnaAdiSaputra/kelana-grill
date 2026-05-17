<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Locale
{
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next): Response
  {
    if ($request->method() === 'GET') {
      $segment = $request->segment(1);

      $langs = array('en', 'id', 'tele-oye');
      if (!in_array($segment, $langs)) {
        $segments = $request->segments();
        $fallback = session('locale') ?: config('app.fallback_locale');
        session(['locale' => $fallback]);
        array_unshift($segments, $fallback);
        return redirect()->to(implode('/', $segments ?? array()));
      }

      session(['locale' => $segment]);
      app()->setLocale($segment);
    }

    return $next($request);
  }
}
