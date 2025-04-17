<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $posts = $user->posts()->orderBy("created_at", "desc")->get();
        return response()->json([
            'posts' => $posts,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "heading" => "required|string|max:255",
            "content" => "required|string",
        ]);

        $user = auth()->user();
        $posts = $user->posts()->create([
            "heading" => $validated["heading"],
            "content" => $validated["content"],
            "likes" => 0,
        ]);

        return response()->json([
            'massage' => 'post created sucessful',
            'post' => $posts,
        ], 201);

    }
}
