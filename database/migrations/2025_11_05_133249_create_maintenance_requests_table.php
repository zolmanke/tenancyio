<?php
// database/migrations/2024_01_01_create_maintenance_requests_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('maintenance_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('house_assignment_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description');
            $table->enum('category', ['general', 'plumbing', 'electrical', 'structural', 'appliance', 'other']);
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
            $table->enum('status', ['pending', 'in_progress', 'completed', 'cancelled'])->default('pending');
            $table->text('notes')->nullable();
            $table->string('assigned_to')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
            
            // Optional: Add indexes for better performance
            $table->index('status');
            $table->index('priority');
            $table->index('category');
        });
    }

    public function down()
    {
        Schema::dropIfExists('maintenance_requests');
    }
};