<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Posts;
use Illuminate\Http\Request;

class PostController extends Controller
{

    public function pIndex($index, Request $request)
    {   
        $posts = Posts::orderBy("created_at", "desc")->paginate(15, ["*"], $index,);//to-do test it 
        if($request->id != -1){
            foreach ($posts as $post) {
                $post->is_liked = $post->like()->where('user_id', $request->id)->exists();
            }
        }

        return response()->json([
            "page" => $posts,
        ]);

    }

    public function all()
    {
        $posts = Posts::all();
        return response()->json([
            "posts" => $posts,
        ]);
    }

    public function post_by_user_id($id, Request $request){
        $posts = Posts::where("user_id", $id)->orderBy("created_at", "desc")->get();
        if(!$posts){
            return response()->json([
                "message" => "post not found",
            ], 404);
        }
        foreach ($posts as $post) {
            $post->is_liked = $post->like()->where('user_id', $request->id)->exists();
        }
        return response()->json([
            "posts" => $posts,
        ]);
    }

    public function update($id, Request $request){
        $user = auth()->user();

        $post = Posts::where("id", $id)->first();

        if($user->id != $post->user_id){
            return response()->json([
                "message" => "Unauthtorized",
            ], 403);
        }

        $validated= $request->validate([
            'heading' => 'required|string|max:255',
            'content' => 'required|string'
        ]);

       

        $post->update($validated);
        
        return response()->json([
            "message" => "updated sucessfully",
            "post" => $post,
        ]);

    }

    public function index(Request $request)
    {
        if ($request->user()) {
            $user = $request->user();
        }
        $user = auth()->user();
        $posts = $user->posts()->orderBy("created_at", "desc")->get();

        foreach ($posts as $post) {
            $post->is_liked = $post->like()->where('user_id', $user->id)->exists();
        }

        return response()->json([
            "posts" => $posts,
        ]);
    }
    public function show($id)
    {
        $post = Posts::where("id", $id)->first();
        if (!$post) {
            return response()->json(
                [
                    "massage" => "post not found",
                ],
                404
            );
        }
        return response()->json([
            "post" => $post,
        ]);
    }

    public function store(Request $request)
    {
        // echo $request;

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

        return response()->json(
            [
                "massage" => "post created sucessful",
                "post" => $posts,
            ],
            201
        );
    }


    public function likeIndex($id){
        $likeCount = Like::where("post_id", $id)->count();
        
        return response()->json([
            "likeCount" => $likeCount,
        ]);

    }
    public function like($id, Request $request)
    {
        $userId = auth()->id();
        $alreadyLiked = Like::where("user_id", $userId)->where("post_id", $id)->exists();

        if($alreadyLiked){
            return response()->json(['message'=>'Already Liked'], 409);
        }

        Like::create([
            "user_id" => $userId,
            "post_id" => $id, 
        ]);

        
        return response([
            'message' => 'like sucessfully',
        ], 201);
    }

    public function unlike($id)
    {
        $userId = auth()->id();
        
        $post = Like::where("user_id", $userId);
        if(!$post){
            return response()->json([
                "message" => "post not found",
            ], 404);
        }

        $like = Like::where("user_id", $userId)->where("post_id", $id)->first();
        if(!$like){
            return response()->json([
                "message" => "already unliked",
            ], 409 ); 
        }
       
        $like->delete();
        return response()->json([
            "message" => "unliked sucessfuly"
        ]);
    }
}
