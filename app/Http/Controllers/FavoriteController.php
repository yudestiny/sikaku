<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FavoriteController extends Controller
{

    public function index (Request $request)
    {
        $favorites = Favorite::join('posts', 'favorites.post_id', '=', 'posts.id')
            ->join('services', 'posts.service_id', '=', 'services.id')
            ->join('statuses', 'posts.status_id', '=', 'statuses.id')
            ->leftJoin('qualifications', 'posts.qualification_id', '=', 'qualifications.id')->where('favorites.user_id', $request['user_id'])
            ->select('posts.id as post_id', 'qualifications.name as qualification_name', 'services.name as service_name', )
            ->get();
        return response()->json($favorites);
    }

    public function toggleFavorite (Request $request)
    {
        $user = Auth::user();
        $favoriteExisting = Favorite::where('user_id', $request['user_id'])->where('post_id', $request['post_id'])->first();

        if ($favoriteExisting) {
            $favoriteExisting->delete();

            return response()->json(['message' => 'removed']);
        }
        Favorite::create([
            'user_id' => $request['user_id'],
            'post_id' => $request['post_id'],
        ]);
        return response()->json(['message' => 'added']);
    }

    public function getFavoriteStatus (Request $request)
    {
        $favoriteStatus = Favorite::where('user_id', $request['user_id'])->where('post_id', $request['post_id'])->exists();

        return response()->json($favoriteStatus);
    }

    public function userRank (Request $request)
    {
        $favorites = Favorite::join('posts', 'favorites.post_id', '=', 'posts.id')
            ->join('users', 'posts.user_id', '=', 'users.id')
            ->select('users.id as favoriteUser', 'users.name', DB::raw('count(users.id) as count'),)
            ->orderBy('count','desc')
            ->groupBy('users.id', 'users.name')
            ->get();
        return response()->json($favorites);
    }
}
