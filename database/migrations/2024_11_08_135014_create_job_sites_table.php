<?php

use App\Models\Agent;
use App\Models\Driver;
use App\Models\District;
use App\Models\Location;
use App\Models\Operator;
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
        Schema::create('job_sites', function (Blueprint $table) {
            $table->id();
            $table->integer('jobNumber')->nullable();
            $table->string('remarks', 1000)->nullable();
            $table->dateTime('timeOnSite')->nullable();
            $table->dateTime('timeOffSite')->nullable();
            $table->integer('hoursWorked')->nullable();
            $table->boolean('driverApproved')->nullable();
            $table->boolean('adminApproved')->nullable();
            $table->boolean('agentApproved')->nullable();
            $table->string('dumpingLocation', 1000)->nullable();

            // Foreign keys
            $table->foreignIdFor(Driver::class)->nullable()->constrained();
            $table->foreignIdFor(District::class)->nullable()->constrained();
            $table->foreignIdFor(Location::class)->nullable()->constrained();
            $table->foreignIdFor(Operator::class, 'operatorId1')->nullable()->constrained();
            $table->foreignIdFor(Operator::class, 'operatorId2')->nullable()->constrained();
            $table->foreignIdFor(Agent::class)->nullable()->constrained();

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
        Schema::dropIfExists('job_sites');
    }
};
