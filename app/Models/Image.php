<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class Image extends Model
{
    public $timestamps = false;

    // Automatically append 'url' to JSON serialization
    protected $appends = ['url'];

    /**
     * Generate temporary URL for R2 image (30 minutes)
     */
    protected function url(): Attribute
    {
        return Attribute::make(
            get: function () {
                try {
                    if (empty($this->key)) {
                        Log::warning('Image has empty key', ['image_id' => $this->id]);
                        return null;
                    }

                    return Storage::disk('r2')->temporaryUrl(
                        $this->key,
                        now()->addMinutes(30)
                    );
                } catch (\Exception $e) {
                    Log::error('Failed to generate temporary URL for image', [
                        'image_id' => $this->id,
                        'key' => $this->key,
                        'error' => $e->getMessage()
                    ]);
                    return null;
                }
            }
        );
    }

    public function jobSite()
    {
        return $this->belongsTo(JobSite::class, 'jobId');
    }
}
