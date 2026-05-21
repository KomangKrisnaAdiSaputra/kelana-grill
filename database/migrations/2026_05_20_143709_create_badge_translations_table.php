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

            $table->foreignUuid('badge_id')
                ->constrained('badges')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->string('language', 10);

            $table->string('name');
            $table->string('slug');

            $table->timestamps();

            $table->unique(['badge_id', 'language']);
            $table->unique(['language', 'slug']);

            $table->index(['language', 'name']);
            $table->index(['language', 'slug']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('badge_translations');
    }
};
