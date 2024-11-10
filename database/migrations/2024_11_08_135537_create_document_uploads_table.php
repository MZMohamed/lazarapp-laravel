<?php

use App\Models\JobSite;
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
        Schema::create('document_uploads', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(JobSite::class, 'jobId')->constrained()->onDelete('cascade'); // Adding a foreign key with cascade delete
            $table->string('key', 1000);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document_uploads');
    }
};
