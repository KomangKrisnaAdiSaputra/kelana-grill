<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('category_translations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('category_id')->constrained('categories')->cascadeOnUpdate()->cascadeOnDelete();

            $table->string('language', 10);

            $table->string('name');
            $table->string('slug');

            $table->timestamps();

            $table->unique(['category_id', 'language']);
            $table->unique(['language', 'slug']);

            $table->index(['language', 'name']);
            $table->index(['language', 'slug']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('category_translations');
    }
};
