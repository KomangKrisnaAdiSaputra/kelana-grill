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
            $table->foreignUuid('type_id')->constrained('types')->cascadeOnUpdate()->restrictOnDelete();

            $table->double('rate')->default(0);

            $table->boolean('featured')->default(false);
            $table->boolean('new')->default(true);
            $table->boolean('active')->default(true);
            $table->boolean('marinade')->default(false);

            $table->text('image')->nullable();


            $table->timestamps();

            $table->index(['type_id', 'active']);
            $table->index(['featured', 'active']);
            $table->index(['new', 'active']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
