<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_house_assignments_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('house_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('house_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Using user_id instead of tenant_id
            $table->date('lease_start_date');
            $table->date('lease_end_date')->nullable();
            $table->decimal('rent_amount', 10, 2);
            $table->string('payment_frequency')->default('monthly');
            $table->decimal('security_deposit', 10, 2)->default(0);
            $table->text('terms')->nullable();
            $table->boolean('is_active')->default(true);
            $table->date('vacated_at')->nullable();
            $table->text('vacate_reason')->nullable();
            $table->timestamps();
            
            // Ensure we don't have multiple active assignments for the same house
            $table->unique(['house_id', 'is_active']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('house_assignments');
    }
};