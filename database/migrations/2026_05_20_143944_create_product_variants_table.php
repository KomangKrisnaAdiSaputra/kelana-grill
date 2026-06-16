<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_variants', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('product_id')->constrained('products')->cascadeOnUpdate()->cascadeOnDelete();

            $table->double('rate')->default(0);

            $table->unsignedInteger('min_person')->nullable();
            $table->unsignedInteger('max_person')->nullable();

            $table->boolean('active')->default(true);
            $table->boolean('marinade')->default(false);

            $table->timestamps();

            $table->index(['product_id', 'active']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_variants');
    }
};
