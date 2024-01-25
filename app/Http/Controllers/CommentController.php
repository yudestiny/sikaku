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
        $validatedData = $request->validate([
            'user_id' => 'required',
            'post_id' => 'required',
            'content' => 'required|string',
        ]);
        $comment = Comment::create([
            'user_id' => $validatedData['user_id'],
            'post_id' => $validatedData['post_id'],
            'content' => $validatedData['content']
        ]);

        $commentInfo = Comment::join('users', 'comments.user_id', 'users.id')
            ->select('comments.content', 'comments.created_at', 'users.image', 'comments.post_id', 'comments.user_id', 'users.name as user_name')
            ->where('comments.id', $comment->id)
            ->first();

        return response()->json($commentInfo);
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
    public function update(Request $request, $comment_id)
    {
        $validatedData = $request->validate([
            'content' => 'required|string',
        ]);
        $comment = Comment::find($comment_id);
        $comment->update([
            'content' => $validatedData['content'],
            'updated_at' => now()
        ]);

        return response()->json(['message' => '編集に成功しました']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($comment_id)
    {
        $comment = Comment::find($comment_id);
        $comment->delete();

        return response()->json(['message' => '正常に削除されました']);
    }
}
