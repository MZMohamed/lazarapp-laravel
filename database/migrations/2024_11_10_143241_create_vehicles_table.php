<?php

use App\Models\VehicleType;
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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('registration', 50)->nullable(false); // VARCHAR(50) NOT NULL
            $table->string('name', 45)->nullable(); // VARCHAR(45), allows null
            $table->foreignIdFor(VehicleType::class)->constrained();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
