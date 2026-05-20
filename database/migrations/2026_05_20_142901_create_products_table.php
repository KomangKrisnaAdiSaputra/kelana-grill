<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('type_id');

            $table->decimal('rate', 15, 2)->default(0);

            $table->boolean('is_featured')->default(false);
            $table->boolean('is_new')->default(true);
            $table->boolean('is_active')->default(true);

            $table->text('image')->nullable();

            $table->timestamps();

            $table->foreign('type_id')->references('id')->on('types')->restrictOnDelete();

            $table->index('type_id');
            $table->index('rate');
            $table->index(['is_active', 'is_featured']);
            $table->index(['is_active', 'is_new']);
            $table->index(['is_active', 'rate']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
