<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_badges', function (Blueprint $table) {
            $table->uuid('product_id');
            $table->uuid('badge_id');

            $table->timestamps();

            $table->foreign('product_id')->references('id')->on('products')->cascadeOnDelete();

            $table->foreign('badge_id')->references('id')->on('badges')->cascadeOnDelete();

            $table->primary(['product_id', 'badge_id']);

            $table->index('badge_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_badges');
    }
};
