<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_properties_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('address');
            $table->integer('no_of_floors');
            $table->enum('lift_stairs', ['lift', 'stairs', 'both']);
            $table->string('electricity_account')->nullable();
            $table->string('water_charges_account')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Changed to user_id
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('properties');
    }
};