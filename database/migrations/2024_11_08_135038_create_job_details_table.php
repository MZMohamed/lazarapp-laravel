<?php

use App\Models\JobSite;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('job_details', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(JobSite::class, 'jobId')->constrained()->onDelete('cascade'); // Adding a foreign key with cascade delete
            $table->string('streetName', 1000);
            $table->string('gullies', 100)->nullable();
            $table->string('connect', 100)->nullable();
            $table->string('manholes', 100)->nullable();
            $table->string('mains', 100)->nullable();
            $table->string('lengthDetail', 100)->nullable();
            $table->string('fullPercentage', 100)->nullable();
            $table->integer('mapNumber')->nullable();

            // Laravel Timestamps and Soft Deletes
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_details');
    }
};
