<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function home ()
    {
        return Post::select('posts.id', 'posts.target', 'users.name as user_name', 'services.name as service_name', 'qualifications.name as qualification_name', 'posts.created_at', 'posts.description')->join('users', 'posts.user_id', '=', 'users.id')->join('services', 'posts.service_id', '=', 'services.id')->join('qualifications', 'posts.qualification_id', '=', 'qualifications.id')->limit(5)->get();
    }

    public function index (Request $request)
    {
        $query = Post::join('users', 'posts.user_id', '=', 'users.id')->join('qualifications', 'posts.qualification_id', '=', 'qualifications.id')->join('categories', 'qualifications.category_id', '=', 'categories.id')
        ->select('posts.id', 'posts.target', 'users.name as user_name', 'qualifications.name as qualification_name', 'posts.created_at', 'posts.description', 'categories.id as category_id');

        if (!is_null($request['category'])) {
            return $query->where('categories.id', '=', $request['category'])->paginate(9);
        }

        return $query->paginate(9);
    }
}
