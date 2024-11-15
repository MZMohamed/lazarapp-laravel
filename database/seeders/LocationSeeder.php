<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = [

            ['name' => 'Houtbay', 'district_id' => 1],
            ['name' => 'heideveld', 'district_id' => 2],
            ['name' => 'hanoverpark', 'district_id' => 2],
            ['name' => 'hillstar', 'district_id' => 2],
            ['name' => 'Heidevald', 'district_id' => 2],
            ['name' => 'Hanover Park', 'district_id' => 2],
            ['name' => 'Houtbay', 'district_id' => 2],
            ['name' => 'Southfield', 'district_id' => 2],
            ['name' => 'Hillstar', 'district_id' => 2],
            ['name' => 'Fish hoek', 'district_id' => 2],
            ['name' => 'm5', 'district_id' => 2],
            ['name' => 'm4', 'district_id' => 2],
            ['name' => 'm3', 'district_id' => 2],
        ];

        foreach ($locations as $key) {
            Location::create($key);
        }


    }
}
