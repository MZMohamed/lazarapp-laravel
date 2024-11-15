<?php

namespace Database\Seeders;

use App\Models\Vehicle;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $vehicles = [
            ['registration' => 'LZ002 - CF 89616', 'vehicle_type_id' => 2],
            ['registration' => 'LZ003 - CF 180 529', 'vehicle_type_id' => 2],
            ['registration' => 'LZ004 - CF 71475', 'vehicle_type_id' => 2],
            ['registration' => 'LZ006 - CF 51107', 'vehicle_type_id' => 2],
            ['registration' => 'LZ007 - CF 201 039', 'vehicle_type_id' => 2],
            ['registration' => 'LZ008 - CF 154 752', 'vehicle_type_id' => 2],
            ['registration' => 'LZ009 - CF 151 615', 'vehicle_type_id' => 2],
            ['registration' => 'LZ010 - CF 232 882', 'vehicle_type_id' => 2],
            ['registration' => 'LZ011 - CF 231 489', 'vehicle_type_id' => 2],
            ['registration' => 'LZ012 - CF 223 809', 'vehicle_type_id' => 2],
            ['registration' => 'LZ015 - CF 49035', 'vehicle_type_id' => 2],
            ['registration' => 'LZ016 - CF 35494', 'vehicle_type_id' => 2],
            ['registration' => 'LZ017 - CF 198 472', 'vehicle_type_id' => 2],
            ['registration' => 'LZ018 - CF 48332', 'vehicle_type_id' => 2],
            ['registration' => 'LZ019 - CF 49329', 'vehicle_type_id' => 2],
            ['registration' => 'LZ021 - CF 33027', 'vehicle_type_id' => 2],
            ['registration' => 'LZ022 - CF 32601', 'vehicle_type_id' => 2],
            ['registration' => 'LZ023 - CF 37194', 'vehicle_type_id' => 2],
            ['registration' => 'LZ025 - 198 448', 'vehicle_type_id' => 2],
            ['registration' => 'LZ026 - CF 33706', 'vehicle_type_id' => 2],
            ['registration' => 'LZ027 - CF 107 281', 'vehicle_type_id' => 2],
            ['registration' => 'LZ029 - CF 78412', 'vehicle_type_id' => 2],
            ['registration' => 'LZ035 - CF 205 744', 'vehicle_type_id' => 2],
            ['registration' => 'LZ037 - CF 257 320', 'vehicle_type_id' => 2],
            ['registration' => 'LZ038 - CF 261 737', 'vehicle_type_id' => 2],
            ['registration' => 'LZ040 - CF 222 453', 'vehicle_type_id' => 2],
            ['registration' => 'LZ041 - CF 240 618', 'vehicle_type_id' => 2],
            ['registration' => 'LZ042 - CF 246 598', 'vehicle_type_id' => 2],
            ['registration' => 'LZ044 - CF 158 512', 'vehicle_type_id' => 2],
            ['registration' => 'LZ047 - CF 261 827', 'vehicle_type_id' => 2],
            ['registration' => 'LZ048 - CF 177 094', 'vehicle_type_id' => 2],
            ['registration' => 'LZ049 - CF 119 041', 'vehicle_type_id' => 2],
            ['registration' => 'LZ050 - CF 119 656', 'vehicle_type_id' => 2],
            ['registration' => 'LZ051 - CF 119 460', 'vehicle_type_id' => 2],
            ['registration' => 'LZ053 - CF 77748', 'vehicle_type_id' => 2],
            ['registration' => 'LZ054 - CF 64702', 'vehicle_type_id' => 2],
            ['registration' => 'LZ055 - CF 66926', 'vehicle_type_id' => 2],
            ['registration' => 'LZ056 - CF 263 230', 'vehicle_type_id' => 2],
            ['registration' => 'LZ057 - CF 266 642', 'vehicle_type_id' => 2],
            ['registration' => 'LZ058 - CF 273 447 ', 'vehicle_type_id' => 2],
            ['registration' => 'LZ060 - CF 261 171', 'vehicle_type_id' => 2],
            ['registration' => 'LZ061 - CF 261 174', 'vehicle_type_id' => 2],
            ['registration' => 'LZ062 - CF 261 176', 'vehicle_type_id' => 2],
            ['registration' => 'LZ063 - CF 261 178', 'vehicle_type_id' => 2],
            ['registration' => 'LZ064 - CL 68474', 'vehicle_type_id' => 2],
            ['registration' => 'LZ065 - CF 273 445', 'vehicle_type_id' => 2],
            ['registration' => 'LZ066 - CF 277 481', 'vehicle_type_id' => 2],
            ['registration' => 'LZ067 - CF 273 738', 'vehicle_type_id' => 2],
            ['registration' => 'LZ068 - CF 284 024', 'vehicle_type_id' => 2],
            ['registration' => 'LZ069 - CF 281 980', 'vehicle_type_id' => 2],
            ['registration' => 'LZ070 - CF 288 047', 'vehicle_type_id' => 2],
            ['registration' => 'LZ071 - PUMP ON LORRIE', 'vehicle_type_id' => 2],
            ['registration' => 'LZ072 - CF 293 978', 'vehicle_type_id' => 2],
            ['registration' => 'LZ073 - CF 293 708', 'vehicle_type_id' => 2],
            ['registration' => 'LZ074 - CF 304 710', 'vehicle_type_id' => 2],
            ['registration' => 'LZ075 - CF 295 680', 'vehicle_type_id' => 2],
            ['registration' => 'LZ076 - BLUE TOILET #1', 'vehicle_type_id' => 2],
            ['registration' => 'LZ077 - BLUE TOILET #2', 'vehicle_type_id' => 2],
            ['registration' => 'LZ078 - GREY TOILET #1', 'vehicle_type_id' => 2],
            ['registration' => 'LZ079 - GREY TOILET #2', 'vehicle_type_id' => 2],
            ['registration' => 'LZ080 - GREY TOILET #3', 'vehicle_type_id' => 2],
            ['registration' => 'LZ081 - GREY TOILET #4', 'vehicle_type_id' => 2],
            ['registration' => 'LZ082 - GREY TOILET #5', 'vehicle_type_id' => 2],
            ['registration' => 'LZ083 - FZP462FS', 'vehicle_type_id' => 2],
            ['registration' => 'MHS - 001 - CA 28668', 'vehicle_type_id' => 2],
            ['registration' => 'MHS - 002 - CAA 370 340', 'vehicle_type_id' => 2],

        ];

        foreach ($vehicles as $vehicle) {
            Vehicle::create($vehicle);
        }
    }
}
