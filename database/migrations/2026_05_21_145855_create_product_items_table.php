<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_items', function (Blueprint $table) {
            $table->foreignUuid('product_id')->constrained('products')->cascadeOnUpdate()->cascadeOnDelete();

            $table->foreignUuid('item_product_id')->constrained('products')->cascadeOnUpdate()->restrictOnDelete();

            $table->integer('qty')->default(1);
            $table->string('unit')->nullable();

            $table->timestamps();

            $table->primary([
                'product_id',
                'item_product_id',
            ]);

            $table->index('item_product_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_items');
    }
};
