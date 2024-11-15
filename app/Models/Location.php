<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Location extends Model
{
    // Disable timestamps
    public $timestamps = false;
    protected $fillable = ['name'];


    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class);
    }

}
