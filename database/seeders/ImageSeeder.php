<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('images')->insert([
            // ['jobId' => 4, 'key' => '10851/images/IMG_20220520_131052.jpg'],
            // ['jobId' => 12, 'key' => '10136/images//IMG_20220525_095832.jpg'],
            // ['jobId' => 12, 'key' => '10136/images//IMG_20220525_092626.jpg'],
            // ['jobId' => 12, 'key' => '10136/images//IMG_20220525_141056.jpg'],
            // ['jobId' => 12, 'key' => '10136/images//IMG_20220525_095720.jpg'],
            // ['jobId' => 12, 'key' => '10136/images//IMG_20220525_095842.jpg'],
            // ['jobId' => 12, 'key' => '10136/images//IMG_20220525_092820.jpg'],
            // ['jobId' => 12, 'key' => '10136/images//IMG_20220525_095727.jpg'],
            // ['jobId' => 13, 'key' => '10137/images//IMG_20220525_095832.jpg'],
            // ['jobId' => 13, 'key' => '10137/images//IMG_20220525_092820.jpg'],
            // ['jobId' => 13, 'key' => '10137/images//IMG_20220525_095842.jpg'],
            // ['jobId' => 13, 'key' => '10137/images//IMG_20220525_095727.jpg'],
            // ['jobId' => 13, 'key' => '10137/images//IMG_20220525_092626.jpg'],
            // ['jobId' => 13, 'key' => '10137/images//IMG_20220525_095720.jpg'],
            // ['jobId' => 13, 'key' => '10137/images//IMG_20220525_141054.jpg'],
            ['jobId' => 42, 'key' => '56392/images/10 maple street.jpg'],
            ['jobId' => 42, 'key' => '56392/images/IMG_20220601_111814.jpg'],
            ['jobId' => 42, 'key' => '56392/images/10 maple street(2).jpg'],
            ['jobId' => 51, 'key' => '57733/images/20220602_113811.jpg'],
            ['jobId' => 51, 'key' => '57733/images/20220602_124812.jpg'],
            ['jobId' => 51, 'key' => '57733/images/20220602_114517.jpg'],
            ['jobId' => 51, 'key' => '57733/images/20220602_121400.jpg'],
            ['jobId' => 51, 'key' => '57733/images/20220602_121416.jpg'],
            ['jobId' => 51, 'key' => '57733/images/20220602_124825.jpg'],
            ['jobId' => 51, 'key' => '57733/images/20220602_114526.jpg'],
            ['jobId' => 54, 'key' => '57190/images/20220602_124228.jpg'],
            ['jobId' => 54, 'key' => '57190/images/20220602_122206.jpg'],
            ['jobId' => 54, 'key' => '57190/images/20220602_120845.jpg'],
            ['jobId' => 50, 'key' => '57731/images/20220602_114526.jpg'],
            ['jobId' => 50, 'key' => '57731/images/20220602_143103.jpg'],
            ['jobId' => 50, 'key' => '57731/images/20220602_121416.jpg'],
            ['jobId' => 50, 'key' => '57731/images/20220602_121400.jpg'],
            ['jobId' => 50, 'key' => '57731/images/20220602_124812.jpg'],
            ['jobId' => 50, 'key' => '57731/images/20220602_113811.jpg'],
            ['jobId' => 50, 'key' => '57731/images/20220602_124825.jpg'],
            ['jobId' => 50, 'key' => '57731/images/20220602_114517.jpg'],
        ]);
    }
}
