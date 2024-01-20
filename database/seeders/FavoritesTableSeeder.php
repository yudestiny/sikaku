<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FavoritesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        // 既存のデータをランダムに取得
        $users = DB::table('users')->pluck('id')->toArray();
        $posts = DB::table('posts')->pluck('id')->toArray();

        // ポストデータを追加
        $favorites = [];

        for ($i = 0; $i < 100; $i++) {
            $favorites[] = [
                'user_id' => $users[array_rand($users)],
                'post_id' => $posts[array_rand($posts)],
                'created_at' => now()->subDays(rand(1, 365))->format('Y-m-d H:i:s'),
                'updated_at' => now()->format('Y-m-d H:i:s'),
            ];
        }

        foreach ($favorites as $favorite) {
            DB::table('favorites')->insert($favorite);
        }
    }

}
