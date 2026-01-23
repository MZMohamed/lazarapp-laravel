<?php

namespace Database\Seeders;

use App\Models\JobVehicle;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class JobVehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $jobVehicles = [
            ['job_id' => 46, 'vehicle_id' => 12],
            ['job_id' => 47, 'vehicle_id' => 12],
            ['job_id' => 50, 'vehicle_id' => 12],
            ['job_id' => 58, 'vehicle_id' => 12],
            ['job_id' => 61, 'vehicle_id' => 12],
            ['job_id' => 62, 'vehicle_id' => 12],
            ['job_id' => 66, 'vehicle_id' => 12],
            ['job_id' => 67, 'vehicle_id' => 12],
            ['job_id' => 68, 'vehicle_id' => 12],
            ['job_id' => 71, 'vehicle_id' => 12],
            ['job_id' => 77, 'vehicle_id' => 12],
            ['job_id' => 79, 'vehicle_id' => 12],
            ['job_id' => 81, 'vehicle_id' => 12],
            ['job_id' => 87, 'vehicle_id' => 12],
            ['job_id' => 90, 'vehicle_id' => 12],
            ['job_id' => 49, 'vehicle_id' => 29],
            ['job_id' => 53, 'vehicle_id' => 29],
            ['job_id' => 69, 'vehicle_id' => 29],
            ['job_id' => 45, 'vehicle_id' => 36],
            ['job_id' => 55, 'vehicle_id' => 36],
            ['job_id' => 59, 'vehicle_id' => 36],
            ['job_id' => 75, 'vehicle_id' => 36],
            ['job_id' => 76, 'vehicle_id' => 36],
            ['job_id' => 80, 'vehicle_id' => 36],
            ['job_id' => 83, 'vehicle_id' => 36],
            ['job_id' => 86, 'vehicle_id' => 36],
            ['job_id' => 88, 'vehicle_id' => 36],
            ['job_id' => 89, 'vehicle_id' => 36],
            ['job_id' => 91, 'vehicle_id' => 36],
            ['job_id' => 92, 'vehicle_id' => 36],
            ['job_id' => 93, 'vehicle_id' => 36],
            ['job_id' => 94, 'vehicle_id' => 36],
            ['job_id' => 95, 'vehicle_id' => 36],
            ['job_id' => 96, 'vehicle_id' => 36],
            ['job_id' => 97, 'vehicle_id' => 36],
            ['job_id' => 98, 'vehicle_id' => 36],
            ['job_id' => 99, 'vehicle_id' => 36],
            ['job_id' => 100, 'vehicle_id' => 36],
            ['job_id' => 101, 'vehicle_id' => 36],
            ['job_id' => 42, 'vehicle_id' => 43],
            ['job_id' => 48, 'vehicle_id' => 43],
            ['job_id' => 52, 'vehicle_id' => 43],
            ['job_id' => 51, 'vehicle_id' => 53],
            ['job_id' => 54, 'vehicle_id' => 53],
            ['job_id' => 56, 'vehicle_id' => 53],
            ['job_id' => 57, 'vehicle_id' => 53],
            ['job_id' => 60, 'vehicle_id' => 53],
            ['job_id' => 64, 'vehicle_id' => 53],
            ['job_id' => 65, 'vehicle_id' => 53],
            ['job_id' => 70, 'vehicle_id' => 53],
            ['job_id' => 72, 'vehicle_id' => 53],
            ['job_id' => 73, 'vehicle_id' => 53],
            ['job_id' => 74, 'vehicle_id' => 53],
            ['job_id' => 82, 'vehicle_id' => 53],
            ['job_id' => 85, 'vehicle_id' => 53],
            ['job_id' => 63, 'vehicle_id' => 55],
            ['job_id' => 49, 'vehicle_id' => 66],
            ['job_id' => 53, 'vehicle_id' => 66],
            ['job_id' => 69, 'vehicle_id' => 66],
            ['job_id' => 49, 'vehicle_id' => 66],
            ['job_id' => 53, 'vehicle_id' => 66],
            ['job_id' => 69, 'vehicle_id' => 66],
        ];

        foreach ($jobVehicles as $value) {
            JobVehicle::create($value);
        }


    }
}
