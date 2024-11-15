<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agent extends Model
{
    // Disable timestamps
    public $timestamps = false;
    protected $fillable = ['name'];
}
