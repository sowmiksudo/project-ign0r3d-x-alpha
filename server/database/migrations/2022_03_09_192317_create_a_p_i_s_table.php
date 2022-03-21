<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAPISTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('a_p_i_s', function (Blueprint $table) {
            $table->id();
            $table->json("config");
            $table->string("name");
            $table->foreignId("user_id")->constrained();
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
        Schema::dropIfExists('a_p_i_s');
    }
}
