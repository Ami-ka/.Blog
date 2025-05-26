<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Posts;
use App\Models\User;
use Illuminate\Http\Request;

class PostController extends Controller
{

   public function pIndex($index, Request $request)
{
    // Загружаем посты с предварительным подсчетом лайков и пользователями
    $posts = Posts::with('user') // предполагается, что у вас есть отношение user() в модели Posts
        ->withCount('like')
        ->orderBy("created_at", "desc")
        ->paginate(15, ["*"], $index);
    
    if($request->id != -1){
        // Получаем ID постов для оптимизации запроса лайков
        $postIds = $posts->pluck('id');
        
        // Получаем лайки пользователя для этих постов одним запросом
        $userLikes = Like::where('user_id', $request->id)
            ->whereIn('post_id', $postIds) // замените post_id на правильное название поля
            ->pluck('post_id')
            ->toArray();
        
        foreach ($posts as $post) {
            // Проверяем, есть ли ID поста в массиве лайков пользователя
            $post->is_liked = in_array($post->id, $userLikes);
            
            // Количество лайков уже загружено через withCount
            $post->likes_count = $post->like_count;
            
            // Имя пользователя уже загружено через with('user')
            $post->user_name = $post->user ? $post->user->name : 'Unknown User';
        }
    } else {
        foreach ($posts as $post) {
            $post->is_liked = false;
            $post->likes_count = $post->like_count;
            $post->user_name = $post->user ? $post->user->name : 'Unknown User';
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
    // Загружаем посты с предварительным подсчетом лайков и пользователями
    $posts = Posts::where("user_id", $id)
        ->with('user') // загружаем данные пользователя
        ->withCount('like') // подсчитываем лайки
        ->orderBy("created_at", "desc")
        ->get();
    
    if($posts->isEmpty()){
        return response()->json([
            "message" => "post not found",
        ], 404);
    }
    
    if($request->id != -1){
        // Получаем ID постов для оптимизации запроса лайков
        $postIds = $posts->pluck('id');
        
        // Получаем лайки пользователя для этих постов одним запросом
        $userLikes = Like::where('user_id', $request->id)
            ->whereIn('post_id', $postIds)
            ->pluck('post_id')
            ->toArray();
        
        foreach ($posts as $post) {
            // Проверяем, есть ли ID поста в массиве лайков пользователя
            $post->is_liked = in_array($post->id, $userLikes);
            // Количество лайков уже загружено через withCount
            $post->likes_count = $post->like_count;
            // Имя пользователя уже загружено через with('user')
            $post->user_name = $post->user ? $post->user->name : 'Unknown User';
        }
    } else {
        foreach ($posts as $post) {
            $post->is_liked = false;
            $post->likes_count = $post->like_count;
            $post->user_name = $post->user ? $post->user->name : 'Unknown User';
        }
    }
    
    return response()->json([
        "posts" => $posts,
    ]);
}
 public function index(Request $request)
{
    $user = auth()->user();
    
    // Загружаем посты с предварительным подсчетом лайков и данными пользователя
    $posts = $user->posts()
        ->with('user') // загружаем данные пользователя
        ->withCount('like') // подсчитываем лайки
        ->orderBy("created_at", "desc")
        ->get();
    
    // Получаем ID постов для оптимизации запроса лайков
    $postIds = $posts->pluck('id');
    
    // Получаем лайки пользователя для этих постов одним запросом
    $userLikes = Like::where('user_id', $user->id)
        ->whereIn('post_id', $postIds)
        ->pluck('post_id')
        ->toArray();
    
    foreach ($posts as $post) {
        // Проверяем, есть ли ID поста в массиве лайков пользователя
        $post->is_liked = in_array($post->id, $userLikes);
        // Количество лайков уже загружено через withCount
        $post->likes_count = $post->like_count;
        // Имя пользователя уже загружено через with('user')
        $post->user_name = $post->user ? $post->user->name : 'Unknown User';
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
