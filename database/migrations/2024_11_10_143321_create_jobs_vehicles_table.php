<?php

use App\Models\JobSite;
use App\Models\Vehicle;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('job_vehicles', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(JobSite::class, 'job_id')->constrained()->onDelete('cascade');
            $table->foreignIdFor(Vehicle::class)->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs_vehicles');
    }
};
