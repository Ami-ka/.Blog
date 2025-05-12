<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function me(Request $request)
    {
        $userData = $request->user();
        $userData->postsNumber = $request->user()->posts()->count();
        return response()->json(["userData" =>$userData, ]);
    }
    public function user_by_id($id)
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json(
                [
                    "message" => "user not found",
                ],
                404
            );
        }
        $postsNumber = Posts::where("user_id", $id)->count(); 
        return response()->json([
            "userName" => $user->name,
            "postsNumber" => $postsNumber,
        ]);
    }
}
