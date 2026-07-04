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
        Schema::create('order_detail_package_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('package_id')->constrained('order_detail_packages')->cascadeOnDelete();
            $table->uuid('product_id')->nullable();

            $table->string('name');
            $table->text('description')->nullable();

            $table->integer('qty')->default(1);

            $table->string('unit')->nullable();

            $table->boolean('marinade')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_detail_package_items');
    }
};
