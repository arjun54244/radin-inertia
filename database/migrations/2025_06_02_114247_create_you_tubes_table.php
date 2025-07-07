<?php

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
        Schema::create('you_tubes', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // e.g., 'video', 'channel', 'playlist'
            $table->string('title');
            $table->string('video_id'); // Just the YouTube video ID, e.g., dQw4w9WgXcQ
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('you_tubes');
    }
};
