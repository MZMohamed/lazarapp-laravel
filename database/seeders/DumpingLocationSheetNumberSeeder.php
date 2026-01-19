<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DumpingLocationSheetNumberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dumpingLocations = [
            // ['jobId' => 3, 'sheetNumber' => 'vhs123456'],
            // ['jobId' => 3, 'sheetNumber' => 'heideveld depo'],
            // ['jobId' => 6, 'sheetNumber' => 'heideveld depo'],
            // ['jobId' => 9, 'sheetNumber' => 'heideveld depo'],
            // ['jobId' => 11, 'sheetNumber' => 'heideveld depo'],
            // ['jobId' => 11, 'sheetNumber' => 'heideveld depo'],
            // ['jobId' => 17, 'sheetNumber' => 'heideveld depo'],
            // ['jobId' => 18, 'sheetNumber' => 'Visserhok'],
            // ['jobId' => 15, 'sheetNumber' => 'vh1234'],
            // ['jobId' => 44, 'sheetNumber' => '57731'],
            ['jobId' => 73, 'sheetNumber' => 'VH284221'],
            ['jobId' => 51, 'sheetNumber' => '57731'],
            ['jobId' => 85, 'sheetNumber' => 'VH288351'],
        ];

        DB::table('dumping_location_sheet_numbers')->insert($dumpingLocations);
    }
}
