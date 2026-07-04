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
        Schema::create('order_details', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('order_id')->constrained()->cascadeOnDelete();

            $table->uuid('product_id')->nullable();
            $table->uuid('product_variant_id')->nullable();

            $table->string('type')->nullable();

            $table->string('name');
            $table->text('description')->nullable();
            $table->string('variant_name')->nullable();
            $table->text('variant_description')->nullable();

            $table->boolean('marinade')->default(false);
            $table->integer('qty')->default(1);

            $table->double('rate');
            $table->double('sub_total');
            $table->double('total');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_details');
    }
};
