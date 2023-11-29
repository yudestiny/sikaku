<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        $names = ['田中太郎', '佐藤花子', '鈴木一郎', '高橋美和', '伊藤次郎', '斎藤雅子', '小林太郎', '渡辺花子', '斉藤太郎', '中村美和'];

        foreach ($names as $name) {
            $email = Str::lower(str_replace(' ', '', $name)) . '@example.com';
            $email = preg_replace('/[^a-zA-Z0-9@.]/', '', $email); // アルファベット、数字、@、.以外の文字を削除

            // 既存のユーザーのメールアドレスと比較して重複しないようにする
            do {
                $duplicate = DB::table('users')->where('email', $email)->exists();
                if ($duplicate) {
                    $email = Str::lower(str_replace(' ', '', $name)) . Str::random(5) . '@example.com';
                }
            } while ($duplicate);

            DB::table('users')->insert([
                'id' => Str::uuid(),
                'name' => $name,
                'email' => $email,
                'password' => Hash::make('password'),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
