<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class District extends Model
{
    // Disable timestamps
    public $timestamps = false;
    protected $fillable = ['name', 'number', 'code'];
}
