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
        Schema::create('order_detail_item_options', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('order_detail_package_item_id')->constrained()->cascadeOnDelete();

            $table->string('type');
            $table->string('name');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_detail_item_options');
    }
};
