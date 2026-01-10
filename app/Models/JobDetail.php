<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

class JobDetail extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $fillable = [
        'jobId',
        'streetName',
        'gullies',
        'connect',
        'manholes',
        'mains',
        'lengthDetail',
        'fullPercentage',
        'mapNumber',
    ];

    public function jobSite()
    {
        return $this->belongsTo(JobSite::class, 'jobId');
    }
    
}
