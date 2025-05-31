<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        // Принудительно используем HTTPS для всех URL
        URL::forceScheme('https');
        
        // Дополнительно для Railway.app
        if (str_contains(config('app.url', ''), 'railway.app') || 
            str_contains(request()->getHost(), 'railway.app')) {
            URL::forceScheme('https');
        }
    }
}
