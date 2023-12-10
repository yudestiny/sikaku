<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusesTableSeeder extends Seeder
{
    public function run()
    {
        // ステータスを追加
        $statuses = ['知識ゼロ', '少し知っている', '半年程度の学習経験あり', '1年以上の学習経験あり', '同じカテゴリの資格取得経験あり'];

        foreach ($statuses as $status) {
            DB::table('statuses')->insert([
                'name' => $status,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
