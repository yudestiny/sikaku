<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($post_id)
    {
        $comments = Comment::join('users', 'comments.user_id', 'users.id')
        ->select('comments.id', 'comments.post_id', 'comments.user_id', 'users.name as user_name', 'users.image', 'comments.content', 'comments.created_at')
        ->where('comments.post_id' ,$post_id)
        ->get();
        return response()->json($comments);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $comment = Comment::create([
            'user_id' => $request['user_id'],
            'post_id' => $request['post_id'],
            'content' => $request['content']
        ]);

        return response()->json(['message' => 'コメントを保存しました']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
    }
}
