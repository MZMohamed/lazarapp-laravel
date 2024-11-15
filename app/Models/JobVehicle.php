<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobVehicle extends Model
{
    // Disable timestamps
    public $timestamps = false;

    protected $fillable = [
        'job_id',
        'vehicle_id'
    ];
}
