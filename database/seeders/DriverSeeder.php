<?php

namespace Database\Seeders;

use App\Models\Driver;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DriverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $names = [
            'Leon Vermeulen',
            'Thabane Motloi',
            'Tapiwa Sibanda',
            'Leonard Nyashanu',
            'Jerome Kinnear',
            'Sibongiseni Joko',
            'Lovemore Mandeya',
            'Trymore Chaita',
            'Adrian Nkonde',
            'Jerome Paulse',
            'Hoosain Jacobs',
            'Siyamthemba Khohlakala',
            'Chakanetsa Makanani',
            'Raylee Griewels',
            'Reagan Moses',
            'Casper Nyangaza',
            'Mark Elbrink',
            'Richard Du Preez',
            'Eugene Christians',
            'Zolton Cleophas',
            'Isiah Gombera',
            'Sombo Sebenzile',
            'David Baartman',
            'Xolani Ndyalivane',
            'Jaseline Du Plesis',
            'Goodman Lubabbalwa',
            'Jerome Kinnear',
            'Justin Wankisi',
            'Protected2',
        ];

        foreach ($names as $name) {
            Driver::create(['name' => $name]);
        }
    }
}
