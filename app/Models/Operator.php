<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Operator extends Model
{
    // Disable timestamps
    public $timestamps = false;
    protected $fillable = ['name'];
}
