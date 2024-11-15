<?php

namespace Database\Seeders;

use App\Models\Agent;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AgentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $agents = [
            'TelcottPersent',
            'Quetzal',
            'TelcottPersent',
            'Quetzal',
            'TelcottPersent',
            'Quetzal'

	    ];

        foreach ($agents as $key) {
            Agent::create(['name' => $key]);
        }
    }
}
