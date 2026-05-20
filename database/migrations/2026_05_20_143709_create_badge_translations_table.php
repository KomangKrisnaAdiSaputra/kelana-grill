<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('badge_translations', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('badge_id');
            $table->string('language', 5);

            $table->string('name');
            $table->string('slug');

            $table->timestamps();

            $table->foreign('badge_id')->references('id')->on('badges')->cascadeOnDelete();

            $table->unique(['badge_id', 'language']);
            $table->unique(['language', 'slug']);

            $table->index(['language', 'name']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('badge_translations');
    }
};
