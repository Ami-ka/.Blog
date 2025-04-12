<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class MyUser extends Authenticatable
{
    use Notifiable;
    protected $fillable = [
        'username', 
        'email', 
        'password'
    ];
    protected $hidden = [
        'password',
    ];
}
