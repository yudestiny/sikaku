<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QualificationsTableSeeder extends Seeder
{
    public function run()
    {
        // 資格データを追加
        $qualifications = [
            ['name' => '基本情報技術者', 'category_id' => 1],
            ['name' => 'TOEIC', 'category_id' => 2],
            ['name' => 'Javaプログラマ', 'category_id' => 1],
            ['name' => 'IELTS', 'category_id' => 2],
            ['name' => '書道師範', 'category_id' => 3],
            ['name' => '応用情報技術者', 'category_id' => 1],
            ['name' => '日商簿記検定', 'category_id' => 3],
            ['name' => '英検準1級', 'category_id' => 2],
            ['name' => 'プロジェクトマネージャ', 'category_id' => 1],
            ['name' => 'TOEFL', 'category_id' => 2],
        ];

        foreach ($qualifications as $qualification) {
            DB::table('qualifications')->insert([
                'name' => $qualification['name'],
                'category_id' => $qualification['category_id'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
