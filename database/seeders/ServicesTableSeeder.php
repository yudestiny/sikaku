<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServicesTableSeeder extends Seeder
{
    public function run()
    {
        // サービスデータを追加
        $services = [
            ['name' => 'Udemy'],
            ['name' => 'Coursera'],
            ['name' => 'Books & Study Materials'],
            ['name' => 'Khan Academy'],
            ['name' => 'LinkedIn Learning'],
            ['name' => 'Codecademy'],
            ['name' => 'Rosetta Stone'],
            ['name' => 'Pluralsight'],
            ['name' => 'ExamPrep Company'],
            ['name' => 'Language Schools'],
        ];

        foreach ($services as $service) {
            DB::table('services')->insert([
                'name' => $service['name'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
