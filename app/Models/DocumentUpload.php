<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentUpload extends Model
{
    function job_site()
    {
        return $this->belongsTo(JobSite::class, 'job_site_id');
    }
}
