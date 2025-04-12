<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MyUser;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator as ValidatorFacade;
class AuthController extends Controller
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
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "email" => "required|string|email|max:255",
            "password" => "required|string",
        ]);

        if ($validator->fails()) {
            return response()->json(["message" => $validator->errors()], 422);
        }

        $creditionals = $request->only("email","password");

        if(!Auth::attempt($creditionals)){
            return response()->json(["message"=> "Invalid creditionals"],401);
        }
        $user = $request->user();
        $request->session()->regenerate();
        return response()->json(["message"=> "lobin sucessfuly", "user" => $user],200);
    }
}