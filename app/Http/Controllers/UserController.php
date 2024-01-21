<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function userProfile ($user_id) {
        $profile = User::where('id', $user_id)
            ->first();
        
            return $profile;
    }

    public function edit (Request $request) {
        $image = $request->file('image');
        $path = Storage::disk('s3')->putFile('profile', $image, 'public');
        $url = Storage::disk('s3')->url($path);

        $profile = User::find($request['id']);
        $profile->update([
            'email' => $request['email'],
            'image' => $url,
        ]);
        return response()->json(['message' => '編集に成功しました']);
    }
}
