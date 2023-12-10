<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusesTableSeeder extends Seeder
{
    public function run()
    {
        // ステータスを追加
        $statuses = ['知識ゼロ', '少し知っている', '過去に学習経験あり'];

        foreach ($statuses as $status) {
            DB::table('statuses')->insert([
                'name' => $status,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
