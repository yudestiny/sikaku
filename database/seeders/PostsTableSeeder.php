<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PostsTableSeeder extends Seeder
{
    public function run()
    {
        // 既存のデータをランダムに取得
        $qualifications = DB::table('qualifications')->pluck('id')->toArray();
        $users = DB::table('users')->pluck('id')->toArray();
        $status = DB::table('statuses')->pluck('id')->toArray();
        $services = DB::table('services')->pluck('id')->toArray();

        // ポストデータを追加
        $posts = [];

        for ($i = 0; $i < 20; $i++) {
            $posts[] = [
                'id' => Str::uuid(),
                'qualification_id' => $qualifications[array_rand($qualifications)],
                'user_id' => $users[array_rand($users)],
                'status_id' => $status[array_rand($status)],
                'service_id' => $services[array_rand($services)],
                'favorite_number' => rand(1, 20),
                'start_date' => now()->subDays(rand(1, 365))->format('Y-m-d'),
                'target' => $this->generateRandomTarget(),
                'description' => $this->generateRandomDescription(),
                'created_at' => now()->subDays(rand(1, 365))->format('Y-m-d H:i:s'),
                'updated_at' => now()->format('Y-m-d H:i:s'),
            ];
        }

        foreach ($posts as $post) {
            DB::table('posts')->insert($post);
        }
    }

    private function generateRandomTarget()
    {
        $targets = [
            '仕事で利用',
            'スキルアップ',
            '新しいキャリアパス',
            'プロジェクトの要件',
            '自己満足',
        ];

        return $targets[array_rand($targets)];
    }

    private function generateRandomDescription()
    {
        $descriptions = [
            '最も難しかったと思う点は理論の理解。',
            '実践的なスキルが必要な箇所が難しかった。',
            '模擬試験の難易度が高かった。',
            '学習時間の確保が難しかった。',
            '実務での適用が難しかった。',
        ];

        return $descriptions[array_rand($descriptions)];
    }
}
