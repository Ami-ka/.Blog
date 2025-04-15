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
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "email" => "required|string|email|max:255",
            "password" => "required|string",
        ]);

        if ($validator->fails()) {
            return response()->json(["message" => $validator->errors()], 422);
        }

        $user = MyUser::where("email", $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(["message"=> "Invalid credentials"], 401);
        }
    
        Auth::login($user); 
    
        return response()->json([
            "message" => "Login successful",
            "user" => $user,
        ], 200);

    }
}