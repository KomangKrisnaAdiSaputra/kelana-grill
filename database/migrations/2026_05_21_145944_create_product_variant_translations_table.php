<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_variant_translations', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('product_variant_id')
                ->constrained('product_variants')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->string('language', 10);

            $table->string('name');
            $table->string('slug');
            $table->text('description')->nullable();

            $table->timestamps();

            $table->unique(['product_variant_id', 'language']);
            $table->unique(['product_variant_id', 'language', 'slug'], 'variant_translation_unique_slug');

            $table->index(['language', 'name']);
            $table->index(['language', 'slug']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_variant_translations');
    }
};
