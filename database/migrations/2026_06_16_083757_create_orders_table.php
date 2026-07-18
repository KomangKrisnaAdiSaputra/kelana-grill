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
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->string('booking_id')->unique();
            $table->string('warehouse_id')->unique();

            $table->string('type')->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();

            $table->string('phone')->nullable();
            $table->string('email')->nullable();

            $table->text('address')->nullable();

            $table->dateTime('pickup_date')->nullable();
            $table->dateTime('return_date')->nullable();


            $table->string('guarantee')->nullable();

            $table->string('payment_method')->nullable();

            $table->longText('note')->nullable();

            $table->double('sub_total')->default(0);
            $table->double('total')->default(0);

            $table->string('status')->default('UNPAID');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
