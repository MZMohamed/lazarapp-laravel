<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vehicle extends Model
{
    // Disable timestamps
    public $timestamps = false;

    protected $fillable = [
        'registration',
        'name',
        'vehicle_type_id'
    ];

    public function vehicleType(): BelongsTo
    {
        return $this->belongsTo(VehicleType::class, 'vehicle_type_id');
    }

    public function jobs()
    {
        return $this->belongsToMany(JobSite::class, 'job_vehicles', 'vehicle_id', 'job_id');
    }
}
