<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        User::factory()->create([
            'name' => 'Super Administrator',
            'email' => 'zubair@apptus.co.za',
            'password' => 'ProtectedUser'
        ]);

        $this->call([
            AgentSeeder::class,
            DistrictSeeder::class,
            DriverSeeder::class,
            GroupSeeder::class,
            LocationSeeder::class,
            OperatorSeeder::class,
            VehicleTypeSeeder::class,

            VehicleSeeder::class,
        ]);

    }
}
