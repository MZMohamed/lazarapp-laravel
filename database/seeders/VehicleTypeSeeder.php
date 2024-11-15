<?php

namespace Database\Seeders;

use App\Models\VehicleType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VehicleTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $vehicleTypes = [
            "Bucket Machine",
            "Pump",
            "Truck"
        ];

        foreach ($vehicleTypes as $key) {
            VehicleType::create(['name' => $key]);
        }
    }
}
