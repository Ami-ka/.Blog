<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    protected $fillable = ["user_id", "post_id"];

    public function user()
    {
        $this->belongsTo(User::class);
    }
    public function posts()
    {
        $this->belongsTo(Posts::class);
    }
}
