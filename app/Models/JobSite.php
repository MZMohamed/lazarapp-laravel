<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class JobSite extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'jobNumber',
        'remarks',
        'timeOnSite',
        'timeOffSite',
        'hoursWorked',
        'driverApproved',
        'adminApproved',
        'agentApproved',
        'dumpingLocation',
        'driver_id',
        'district_id',
        'location_id',
        'operatorId1',
        'operatorId2',
        'agent_id',
    ];

    /**
     * Define relationships for the foreign keys.
     */

    // Relationship with Driver
    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }

    // Relationship with District
    public function district()
    {
        return $this->belongsTo(District::class);
    }

    // Relationship with Location
    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    // Relationship with first Operator
    public function operator1()
    {
        return $this->belongsTo(Operator::class, 'operatorId1');
    }

    // Relationship with second Operator
    public function operator2()
    {
        return $this->belongsTo(Operator::class, 'operatorId2');
    }

    // Relationship with Agent
    public function agent()
    {
        return $this->belongsTo(Agent::class);
    }

    public function vehicles()
    {
        return $this->belongsToMany(Vehicle::class, 'job_vehicles', 'job_id', 'vehicle_id');
    }

    public function details()
    {
        return $this->hasMany(JobDetail::class, 'jobId');
    }

    public function images()
    {
        return $this->hasMany(Image::class, 'jobId');
    }

    function dumping_location_sheet_numbers()
    {
        return $this->hasMany(DumpingLocationSheetNumber::class, 'jobId');
    }
}
