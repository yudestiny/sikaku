<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class StepsTableSeeder extends Seeder
{
    public function run()
    {
        // ポストデータをランダムに取得
        $posts = DB::table('posts')->pluck('id')->toArray();
        $services = DB::table('services')->pluck('id')->toArray();

        // ステップデータを追加
        $steps = [];

        foreach ($posts as $postId) {
            // 各ポストに対して1から5のステップをランダムに割り当てる
            $randomStepNumbers = $this->generateRandomStepNumbers();

            foreach ($randomStepNumbers as $stepNumber) {
                $description = "第{$stepNumber}ステップでの振り返り：";

                // 以下に具体的な反省や学びを追加
                $description .= $this->generateRandomReflection();

                $steps[] = [
                    'post_id' => $postId,
                    'service_id' => $services[array_rand($services)],
                    'step_number' => $stepNumber,
                    'period' => $this->generateRandomPeriod(),
                    'description' => $description,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        foreach ($steps as $step) {
            DB::table('steps')->insert($step);
        }
    }

    private function generateRandomPeriod()
    {
        $periods = [
            '1週間',
            '2週間',
            '1ヶ月',
            '2ヶ月',
            '3ヶ月',
        ];

        return $periods[array_rand($periods)];
    }

    private function generateRandomReflection()
    {
        $reflections = [
            '難しい箇所がありましたが、復習を重ねることで理解が深まりました。',
            '学習計画通り進めることができず、時間配分に課題を感じました。',
            '模擬試験での課題を克服するために追加の対策が必要でした。',
            '他の受験者の体験談を参考にしながら学習することが大切だと感じました。',
            '実務での応用に向けて、より実践的な学習が必要だと認識しました。',
        ];

        return $reflections[array_rand($reflections)];
    }

    private function generateRandomStepNumbers()
    {
        // 1から5までのランダムな順列を生成
        $stepNumbers = range(1, 5);
        shuffle($stepNumbers);

        return $stepNumbers;
    }
}
