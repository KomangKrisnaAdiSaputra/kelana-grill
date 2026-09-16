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
        Schema::create('product_seo_translations', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('product_id')->constrained('products')->cascadeOnUpdate()->cascadeOnDelete();

            $table->string('language', 10);

            $table->string('title')->nullable();
            $table->string('keyword')->nullable();
            $table->text('description')->nullable();

            $table->timestamps();

            $table->unique(['product_id', 'language']);

            $table->index(['language', 'title']);
            $table->index(['language', 'keyword']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_seo_translations');
    }
};
