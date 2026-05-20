<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('package_items', function (Blueprint $table) {
            $table->uuid('package_id');
            $table->uuid('product_id');

            $table->integer('qty')->default(1);
            $table->integer('sort_order')->default(0);

            $table->timestamps();

            $table->foreign('package_id')->references('id')->on('products')->cascadeOnDelete();

            $table->foreign('product_id')->references('id')->on('products')->cascadeOnDelete();

            $table->primary(['package_id', 'product_id']);

            $table->index('product_id');
            $table->index('sort_order');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('package_items');
    }
};
