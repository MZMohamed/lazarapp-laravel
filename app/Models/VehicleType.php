<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VehicleType extends Model
{
    // Disable timestamps
    public $timestamps = false;
    protected $fillable = ['name'];

    public function vehicles()
    {
        return $this->hasMany(Vehicle::class);
    }
}
