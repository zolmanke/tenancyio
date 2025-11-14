<?php
// database/migrations/xxxx_xx_xx_xxxxxx_add_termination_fields_to_house_assignments_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('house_assignments', function (Blueprint $table) {
            $table->foreignId('terminated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->text('termination_notes')->nullable();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::table('house_assignments', function (Blueprint $table) {
            $table->dropForeign(['terminated_by']);
            $table->dropColumn(['terminated_by', 'termination_notes', 'deleted_at']);
        });
    }
};