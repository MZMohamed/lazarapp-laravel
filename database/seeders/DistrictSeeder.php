<?php

namespace Database\Seeders;

use App\Models\District;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DistrictSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $districts = [
            'Quetzal Trading',
            'District 8',
            'Test 1',
            'Test 2',
            'Test 3',
        ];

        foreach ($districts as $key) {
            District::create(['name' => $key]);
        }
    }
}
