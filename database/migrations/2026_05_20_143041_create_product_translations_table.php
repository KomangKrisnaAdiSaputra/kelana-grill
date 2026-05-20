<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_translations', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('product_id');
            $table->string('language', 5);

            $table->string('name');
            $table->string('slug');
            $table->text('description')->nullable();
            $table->string('featured_label')->nullable();

            $table->timestamps();

            $table->foreign('product_id')->references('id')->on('products')->cascadeOnDelete();

            $table->unique(['product_id', 'language']);
            $table->unique(['language', 'slug']);

            $table->index(['language', 'name']);

            // MySQL 8 support
            $table->fullText(['name', 'description']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_translations');
    }
};
