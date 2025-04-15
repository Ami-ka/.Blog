<?php

namespace App\Http\Controllers;

use App\Models\User;
use Hash;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request){
        $data= $request->validate([
            "name" => "required|string|max:255",
            "email"=> "required|email|unique:users",
            "password"=> "required|min:6"
        ]);

        $user = User::create([
            'name'=> $data['name'],
            'email'=> $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        return response()->json([
            'user' => $user,
            'token' => $user->createToken('token')->plainTextToken,
        ]);
    }
    public function login(Request $request){
        $data = $request->validate([
            'email'=> 'required|email',
            'password'=> 'required',
            ]);
        $user = User::where('email', $request->email)->first();

        if(! $user || ! Hash::check($data['password'], $user->password)){
            return response()->json(['message' => 'wrong email or password'],401);
        }
        return response()->json([
            'user'=> $user,
            'token'=> $user->createToken('token')->plainTextToken,

            ]);
    }
    public function me(Request $request){
        return response()->json($request ->user());
    }
    public function logout(Request $request){
        $request->user()->tokens->each(function ($token){
            $token->delete();
        });
        return response()->json(['message'=> 'sucessful logout']);
    }

}
