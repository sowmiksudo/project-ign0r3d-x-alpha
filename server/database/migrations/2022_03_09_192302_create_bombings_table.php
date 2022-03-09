<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBombingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bombings', function (Blueprint $table) {
            $table->id();
            $table->string("number");
            $table->foreignId("user_id")->constrained();
            $table->string("total_api_available");
            $table->string("ip");
            $table->string("userAgent");
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
        Schema::dropIfExists('bombings');
    }
}
