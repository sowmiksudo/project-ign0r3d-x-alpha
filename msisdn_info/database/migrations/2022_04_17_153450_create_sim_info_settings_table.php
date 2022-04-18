<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sim_info_settings', function (Blueprint $table) {
            $table->id();
            $table->boolean("is_accepting_deposits");
            $table->boolean("is_lr_open");
            $table->integer("cost_per_search");
            $table->string("bkash_number");
            $table->string("nagad_number");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sim_info_settings');
    }
};
