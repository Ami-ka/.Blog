<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function me(Request $request)
    {
        return response()->json($request->user());
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
        return response()->json([
            "user_name" => $user->name,
        ]);
    }
}
