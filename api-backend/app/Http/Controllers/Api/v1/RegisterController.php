<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Models\MyUser;
use Illuminate\Http\Request;
use Validator;

class RegisterController extends Controller
{
    public function register(Request $request)
    {


        $validator = Validator::make($request->all(), [
            "username" => "required|string|unique:my_users",
            "email" => "required|string|email|max:255|unique:my_users",
            "password" => "required|string|min:6",
        ]);

        if ($validator->fails()) {
            return response()->json(["message" => $validator->errors()], 422);
        }
        $user = MyUser::create([
            "username" => $request->username,
            "email" => $request->email,
            "password" => bcrypt($request->password),
        ]);
        return response()->json(["message" => "registrated sucessfully..."], 201);
    }
}
